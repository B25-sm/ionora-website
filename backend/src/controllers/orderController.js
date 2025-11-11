import { query } from "../config/database.js";
import pool from "../config/database.js";
import { unlockInventory } from "../utils/orderHelper.js";

const parsePagination = (req, defaultLimit = 10) => {
  const page = Math.max(Number.parseInt(req.query.page ?? "1", 10), 1);
  const limit = Math.max(
    Math.min(Number.parseInt(req.query.limit ?? String(defaultLimit), 10), 50),
    1,
  );
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export const getOrders = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const { page, limit, offset } = parsePagination(req);
  const { status } = req.query;

  const params = [userId];
  let whereClause = "WHERE o.user_id = $1";

  if (status) {
    params.push(status);
    whereClause += ` AND o.status = $${params.length}`;
  }

  try {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM orders o
      ${whereClause}
    `;

    const { rows: countRows } = await query(countQuery, params);
    const total = Number.parseInt(countRows[0]?.total ?? "0", 10);

    const ordersQuery = `
      SELECT
        o.id,
        o.order_number,
        o.status,
        o.payment_status,
        o.total_amount,
        o.created_at,
        o.updated_at,
        (
          SELECT COUNT(*)
          FROM order_items oi
          WHERE oi.order_id = o.id
        ) AS items_count
      FROM orders o
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `;

    const ordersParams = [...params, limit, offset];
    const { rows: orders } = await query(ordersQuery, ordersParams);

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return res.status(200).json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getOrderById = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const { id } = req.params;

  try {
    const orderQuery = `
      SELECT
        o.id,
        o.order_number,
        o.status,
        o.payment_status,
        o.shipping_method,
        o.subtotal,
        o.tax_amount,
        o.shipping_charge,
        o.discount_amount,
        o.total_amount,
        o.created_at,
        o.updated_at,
        o.confirmed_at,
        o.shipped_at,
        o.delivered_at,
        o.razorpay_order_id,
        a.id AS address_id,
        a.address_type,
        a.full_address,
        a.city,
        a.state,
        a.pincode,
        a.country,
        a.is_default
      FROM orders o
      LEFT JOIN addresses a ON o.shipping_address_id = a.id
      WHERE o.id = $1 AND o.user_id = $2
    `;

    const { rows: orderRows } = await query(orderQuery, [id, userId]);
    const order = orderRows[0];

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const itemsQuery = `
      SELECT
        oi.id,
        oi.product_id,
        oi.quantity,
        oi.price_at_purchase,
        oi.subtotal,
        oi.created_at,
        p.name,
        p.description,
        p.final_price,
        p.images
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `;

    const { rows: items } = await query(itemsQuery, [order.id]);

    return res.status(200).json({
      order: {
        ...order,
        shipping_address: order.address_id
          ? {
              id: order.address_id,
              address_type: order.address_type,
              full_address: order.full_address,
              city: order.city,
              state: order.state,
              pincode: order.pincode,
              country: order.country,
              is_default: order.is_default,
            }
          : null,
        items,
      },
    });
  } catch (error) {
    console.error("Get order by id error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getOrderTracking = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const { id } = req.params;

  try {
    const { rows: orderRows } = await query(
      `
        SELECT id
        FROM orders
        WHERE id = $1 AND user_id = $2
      `,
      [id, userId],
    );

    if (!orderRows.length) {
      return res.status(404).json({ message: "Order not found." });
    }

    const { rows: trackingRows } = await query(
      `
        SELECT status, description, created_at
        FROM order_tracking
        WHERE order_id = $1
        ORDER BY created_at ASC
      `,
      [id],
    );

    return res.status(200).json({ tracking: trackingRows });
  } catch (error) {
    console.error("Get order tracking error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const cancelOrder = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const { id } = req.params;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderQuery = `
      SELECT id, status, payment_status, razorpay_order_id, coupon_code
      FROM orders
      WHERE id = $1 AND user_id = $2
      FOR UPDATE
    `;

    const { rows } = await client.query(orderQuery, [id, userId]);
    const order = rows[0];

    if (!order) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Order not found." });
    }

    if (!["pending", "confirmed"].includes(order.status)) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Order cannot be cancelled at this stage." });
    }

    await client.query(
      `
        UPDATE orders
        SET status = 'cancelled',
            payment_status = CASE
              WHEN payment_status = 'paid' THEN 'refunded'
              ELSE payment_status
            END,
            updated_at = NOW()
        WHERE id = $1
      `,
      [order.id],
    );

    await client.query(
      `
        INSERT INTO order_tracking (order_id, status, description)
        VALUES ($1, 'cancelled', 'Order cancelled by user')
      `,
      [order.id],
    );

    if (order.coupon_code) {
      await client.query(
        `
          UPDATE coupons
          SET usage_count = GREATEST(usage_count - 1, 0), updated_at = NOW()
          WHERE UPPER(code) = UPPER($1)
        `,
        [order.coupon_code],
      );
    }

    await unlockInventory(client, order.id);

    await client.query("COMMIT");

    if (order.payment_status === "paid") {
      console.log(`Initiating refund for order ${order.id} (Razorpay order ${order.razorpay_order_id}).`);
    }

    return res.status(200).json({ message: "Order cancelled successfully." });
  } catch (error) {
    console.error("Cancel order error:", error);
    await client.query("ROLLBACK");
    return res.status(500).json({ message: "Internal server error." });
  } finally {
    client.release();
  }
};

export default {
  getOrders,
  getOrderById,
  getOrderTracking,
  cancelOrder,
};

