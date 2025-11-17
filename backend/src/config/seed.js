import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import pool from "./database.js";

const SALT_ROUNDS = Number.parseInt(process.env.SALT_ROUNDS ?? "10", 10);

const adminUser = {
  email: "admin@alkalinewater.com",
  full_name: "Ionora Admin",
  phone: "9999999999",
  is_admin: true,
  password: "AdminPass123!",
};

const customerUsers = [
  {
    email: "alice@example.com",
    full_name: "Alice Hydrate",
    phone: "9876543210",
    password: "Password123!",
  },
  {
    email: "bob@example.com",
    full_name: "Bob Purewater",
    phone: "9123456780",
    password: "Password123!",
  },
  {
    email: "carol@example.com",
    full_name: "Carol Ionized",
    phone: "9012345678",
    password: "Password123!",
  },
];

const productCatalog = [
  {
    name: "Ionora Elite 7-Plate Ionizer",
    category: "premium",
    price: 129999,
    discount_percentage: 15,
    stock_quantity: 20,
    specifications: {
      plates: 7,
      flow_rate_lpm: 2,
      ph_range: "4.0 - 11.5",
      orp: "-850mV",
      warranty_years: 5,
    },
    images: ["/images/products/elite-7.png"],
  },
  {
    name: "Ionora Lite 5-Plate Ionizer",
    category: "standard",
    price: 79999,
    discount_percentage: 10,
    stock_quantity: 35,
    specifications: {
      plates: 5,
      flow_rate_lpm: 1.5,
      ph_range: "4.5 - 10.5",
      orp: "-650mV",
      warranty_years: 3,
    },
    images: ["/images/products/lite-5.png"],
  },
  {
    name: "Ionora Compact Countertop Filter",
    category: "compact",
    price: 34999,
    discount_percentage: 5,
    stock_quantity: 50,
    specifications: {
      stages: 5,
      filter_life_litres: 4000,
      flow_rate_lpm: 1,
      warranty_years: 2,
    },
    images: ["/images/products/compact-countertop.png"],
  },
  {
    name: "Ionora Deluxe Under Sink System",
    category: "under-sink",
    price: 64999,
    discount_percentage: 12,
    stock_quantity: 25,
    specifications: {
      stages: 7,
      booster_pump: true,
      mineralizer: true,
      warranty_years: 4,
    },
    images: ["/images/products/deluxe-under-sink.png"],
  },
  {
    name: "Ionora Travel Alkaline Bottle",
    category: "portable",
    price: 5999,
    discount_percentage: 0,
    stock_quantity: 120,
    specifications: {
      capacity_ml: 750,
      filter_life_refills: 300,
      material: "BPA-free Tritan",
    },
    images: ["/images/products/travel-bottle.png"],
  },
  {
    name: "Ionora Commercial Ionizer Pro",
    category: "commercial",
    price: 189999,
    discount_percentage: 18,
    stock_quantity: 10,
    specifications: {
      plates: 11,
      flow_rate_lpm: 5,
      usage: "Hotels & Wellness Centers",
      warranty_years: 5,
    },
    images: ["/images/products/commercial-pro.png"],
  },
  {
    name: "Ionora Hydrogen Booster Pitcher",
    category: "premium",
    price: 25999,
    discount_percentage: 8,
    stock_quantity: 60,
    specifications: {
      hydrogen_ppb: 1200,
      capacity_litres: 2,
      recharge_time_minutes: 10,
    },
    images: ["/images/products/hydrogen-booster.png"],
  },
  {
    name: "Ionora Eco 4-Stage Filter",
    category: "standard",
    price: 19999,
    discount_percentage: 6,
    stock_quantity: 80,
    specifications: {
      stages: 4,
      filter_life_months: 12,
      flow_rate_lpm: 0.8,
    },
    images: ["/images/products/eco-4-stage.png"],
  },
  {
    name: "Ionora Sparkling Water Ionizer",
    category: "premium",
    price: 99999,
    discount_percentage: 14,
    stock_quantity: 18,
    specifications: {
      carbonation_levels: 3,
      flow_rate_lpm: 1.8,
      warranty_years: 3,
    },
    images: ["/images/products/sparkling.png"],
  },
  {
    name: "Ionora Ayurvedic Infuser Filter",
    category: "wellness",
    price: 45999,
    discount_percentage: 9,
    stock_quantity: 40,
    specifications: {
      ayurvedic_stones: ["Tulsi", "Moringa", "Shilajit"],
      flow_rate_lpm: 1.2,
      warranty_years: 3,
    },
    images: ["/images/products/ayurvedic-infuser.png"],
  },
  {
    name: "Ionora Kids Hydration Station",
    category: "family",
    price: 27999,
    discount_percentage: 5,
    stock_quantity: 55,
    specifications: {
      ph_range: "6.5 - 8.5",
      uv_sterilization: true,
      child_lock: true,
    },
    images: ["/images/products/kids-station.png"],
  },
  {
    name: "Ionora Elite Plus 9-Plate Ionizer",
    category: "premium",
    price: 149999,
    discount_percentage: 16,
    stock_quantity: 15,
    specifications: {
      plates: 9,
      flow_rate_lpm: 2.5,
      ph_range: "3.8 - 12.0",
      orp: "-900mV",
      warranty_years: 5,
    },
    images: ["/images/products/elite-plus-9.png"],
  },
  {
    name: "Ionora Farm Agricultural Filter",
    category: "agriculture",
    price: 219999,
    discount_percentage: 20,
    stock_quantity: 8,
    specifications: {
      coverage_acres: 5,
      flow_rate_lpm: 15,
      power_consumption_w: 1200,
    },
    images: ["/images/products/farm-filter.png"],
  },
  {
    name: "Ionora Spa Wellness Tower",
    category: "wellness",
    price: 89999,
    discount_percentage: 12,
    stock_quantity: 12,
    specifications: {
      aroma_diffuser: true,
      mist_modes: 3,
      flow_rate_lpm: 1.6,
    },
    images: ["/images/products/spa-wellness.png"],
  },
  {
    name: "Ionora Office Hydration Hub",
    category: "commercial",
    price: 129999,
    discount_percentage: 15,
    stock_quantity: 14,
    specifications: {
      users_supported: 100,
      hot_cold_dual: true,
      filter_life_litres: 10000,
    },
    images: ["/images/products/office-hub.png"],
  },
];

const sampleAddresses = (userIds) => [
  {
    user_id: userIds[0],
    address_type: "shipping",
    full_address: "221B Baker Street",
    city: "London",
    state: "Greater London",
    pincode: "NW16XE",
    country: "United Kingdom",
    is_default: true,
  },
  {
    user_id: userIds[1],
    address_type: "billing",
    full_address: "742 Evergreen Terrace",
    city: "Springfield",
    state: "Oregon",
    pincode: "97403",
    country: "USA",
    is_default: true,
  },
  {
    user_id: userIds[1],
    address_type: "shipping",
    full_address: "12 MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    country: "India",
    is_default: false,
  },
  {
    user_id: userIds[2],
    address_type: "shipping",
    full_address: "5 Marine Drive",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400020",
    country: "India",
    is_default: true,
  },
];

const hashPassword = async (password) => bcrypt.hash(password, SALT_ROUNDS);

const insertUser = async (client, user, { isAdmin = false } = {}) => {
  const passwordHash = await hashPassword(user.password);
  const userId = randomUUID();

  const insertQuery = `
    INSERT INTO users (id, email, password_hash, full_name, phone, is_admin, email_verified)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (email) DO UPDATE
      SET full_name = EXCLUDED.full_name,
          phone = EXCLUDED.phone,
          is_admin = EXCLUDED.is_admin,
          updated_at = NOW()
    RETURNING id
  `;

  const { rows } = await client.query(insertQuery, [
    userId,
    user.email,
    passwordHash,
    user.full_name,
    user.phone ?? null,
    isAdmin,
    true,
  ]);

  return rows[0].id;
};

const insertProduct = async (client, product) => {
  const insertQuery = `
    INSERT INTO products (
      id,
      name,
      description,
      price,
      discount_percentage,
      final_price,
      category,
      stock_quantity,
      images,
      specifications,
      is_active
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, TRUE)
    ON CONFLICT (name) DO UPDATE
      SET price = EXCLUDED.price,
          discount_percentage = EXCLUDED.discount_percentage,
          final_price = EXCLUDED.final_price,
          category = EXCLUDED.category,
          stock_quantity = EXCLUDED.stock_quantity,
          images = EXCLUDED.images,
          specifications = EXCLUDED.specifications,
          is_active = TRUE,
          updated_at = NOW()
    RETURNING id
  `;

  const finalPrice =
    product.price - product.price * (Number.parseFloat(product.discount_percentage ?? 0) / 100);

  const { rows } = await client.query(insertQuery, [
    randomUUID(),
    product.name,
    product.description ?? null,
    product.price,
    product.discount_percentage ?? 0,
    Number(finalPrice.toFixed(2)),
    product.category ?? null,
    product.stock_quantity ?? 0,
    product.images ?? [],
    JSON.stringify(product.specifications ?? {}),
  ]);

  return rows[0].id;
};

const insertAddress = async (client, address) => {
  const addressQuery = `
    INSERT INTO addresses (
      id,
      user_id,
      address_type,
      full_address,
      city,
      state,
      pincode,
      country,
      is_default
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (id) DO NOTHING
  `;

  await client.query(addressQuery, [
    randomUUID(),
    address.user_id,
    address.address_type ?? "shipping",
    address.full_address,
    address.city,
    address.state,
    address.pincode,
    address.country,
    address.is_default ?? false,
  ]);
};

export const run = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    console.log("Seeding admin user...");
    const adminId = await insertUser(client, adminUser, { isAdmin: true });

    console.log("Seeding test users...");
    const userIds = [];
    for (const user of customerUsers) {
      const id = await insertUser(client, user, { isAdmin: false });
      userIds.push(id);
    }

    if (!userIds.includes(adminId)) {
      userIds.unshift(adminId);
    }

    console.log("Seeding products...");
    for (const product of productCatalog) {
      await insertProduct(client, product);
    }

    console.log("Seeding addresses...");
    const addresses = sampleAddresses(userIds);
    for (const address of addresses) {
      await insertAddress(client, address);
    }

    await client.query("COMMIT");
    console.log("Database seeding completed successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database seeding failed:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  run()
    .catch((err) => {
      console.error("Seeding encountered an error:", err);
      process.exitCode = 1;
    })
    .finally(() => {
      process.exit();
    });
}









