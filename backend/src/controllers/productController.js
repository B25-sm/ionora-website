import { query } from "../config/database.js";

const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
};

const parsePagination = (req, defaultLimit = 20) => {
  const page = parsePositiveInt(req.query.page, 1);
  const limit = Math.min(parsePositiveInt(req.query.limit, defaultLimit), 100);

  return { page, limit, offset: (page - 1) * limit };
};

const buildSortClause = (sort) => {
  switch (sort) {
    case "price_asc":
      return "price ASC";
    case "price_desc":
      return "price DESC";
    case "latest":
    default:
      return "created_at DESC";
  }
};

export const getProducts = async (req, res) => {
  const { page, limit, offset } = parsePagination(req);
  const { sort = "latest", category, minPrice, maxPrice } = req.query;

  const sortClause = buildSortClause(sort);

  const filters = ["is_active = TRUE"];
  const params = [];
  let paramIndex = 1;

  if (category) {
    filters.push(`category = $${paramIndex++}`);
    params.push(category);
  }

  const minPriceValue = minPrice !== undefined ? Number.parseFloat(minPrice) : undefined;
  if (minPriceValue !== undefined && Number.isFinite(minPriceValue)) {
    filters.push(`final_price >= $${paramIndex++}`);
    params.push(minPriceValue);
  }

  const maxPriceValue = maxPrice !== undefined ? Number.parseFloat(maxPrice) : undefined;
  if (maxPriceValue !== undefined && Number.isFinite(maxPriceValue)) {
    filters.push(`final_price <= $${paramIndex++}`);
    params.push(maxPriceValue);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  try {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM products
      ${whereClause}
    `;

    const { rows: countRows } = await query(countQuery, params);
    const total = Number.parseInt(countRows[0]?.total ?? "0", 10);

    const productsQuery = `
      SELECT id, name, description, price, discount_percentage, final_price, category,
             stock_quantity, images, specifications, is_active, created_at, updated_at
      FROM products
      ${whereClause}
      ORDER BY ${sortClause}
      LIMIT $${paramIndex++}
      OFFSET $${paramIndex}
    `;

    const productsParams = [...params, limit, offset];

    const { rows: products } = await query(productsQuery, productsParams);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await query(
      `
        SELECT id, name, description, price, discount_percentage, final_price, category,
               stock_quantity, images, specifications, is_active, created_at, updated_at
        FROM products
        WHERE id = $1 AND is_active = TRUE
      `,
      [id],
    );

    const product = rows[0];

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error("Get product by id error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const searchProducts = async (req, res) => {
  const searchTerm = req.query.q?.trim();

  if (!searchTerm) {
    return res.status(400).json({ message: "Search query parameter 'q' is required." });
  }

  try {
    const { rows } = await query(
      `
        SELECT id,
               name,
               description,
               price,
               discount_percentage,
               final_price,
               category,
               stock_quantity,
               images,
               specifications,
               is_active,
               created_at,
               updated_at
        FROM products
        WHERE is_active = TRUE
          AND search_vector @@ plainto_tsquery('english', $1)
        ORDER BY ts_rank(search_vector, plainto_tsquery('english', $1)) DESC,
                 created_at DESC
        LIMIT 50
      `,
      [searchTerm],
    );

    return res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Search products error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const { page, limit, offset } = parsePagination(req);
  const sortClause = buildSortClause(req.query.sort ?? "latest");

  try {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM products
      WHERE category = $1 AND is_active = TRUE
    `;

    const { rows: countRows } = await query(countQuery, [category]);
    const total = Number.parseInt(countRows[0]?.total ?? "0", 10);

    const productsQuery = `
      SELECT id, name, description, price, discount_percentage, final_price, category,
             stock_quantity, images, specifications, is_active, created_at, updated_at
      FROM products
      WHERE category = $1 AND is_active = TRUE
      ORDER BY ${sortClause}
      LIMIT $2
      OFFSET $3
    `;

    const { rows: products } = await query(productsQuery, [category, limit, offset]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Get products by category error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default {
  getProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
};

