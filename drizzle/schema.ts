import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * AliExpress Products Table
 * Stores synced products from AliExpress API
 */
export const aliexpressProducts = mysqlTable("aliexpress_products", {
  id: int("id").autoincrement().primaryKey(),
  aliexpressId: varchar("aliexpress_id", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  price: int("price").notNull(), // in cents
  originalPrice: int("original_price"),
  image: text("image"),
  category: varchar("category", { length: 255 }),
  rating: varchar("rating", { length: 10 }),
  reviews: int("reviews"),
  shipping: int("shipping"), // in cents
  shippingTime: varchar("shipping_time", { length: 100 }),
  inStock: int("in_stock").default(1),
  url: text("url"),
  supplierId: varchar("supplier_id", { length: 255 }),
  lastSynced: timestamp("last_synced").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type AliexpressProduct = typeof aliexpressProducts.$inferSelect;
export type InsertAliexpressProduct = typeof aliexpressProducts.$inferInsert;

/**
 * Orders Table
 * Stores customer orders from the store
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  orderId: varchar("order_id", { length: 255 }).notNull().unique(),
  userId: int("user_id"),
  email: varchar("email", { length: 320 }).notNull(),
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"]).default("pending").notNull(),
  totalAmount: int("total_amount").notNull(), // in cents
  shippingAddress: text("shipping_address"),
  shippingCity: varchar("shipping_city", { length: 255 }),
  shippingState: varchar("shipping_state", { length: 255 }),
  shippingZip: varchar("shipping_zip", { length: 20 }),
  shippingCountry: varchar("shipping_country", { length: 100 }),
  stripePaymentId: varchar("stripe_payment_id", { length: 255 }),
  aliexpressOrderId: varchar("aliexpress_order_id", { length: 255 }),
  trackingNumber: varchar("tracking_number", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order Items Table
 * Individual items in each order
 */
export const orderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("order_id").notNull(),
  productId: int("product_id").notNull(),
  aliexpressProductId: varchar("aliexpress_product_id", { length: 255 }),
  quantity: int("quantity").notNull(),
  price: int("price").notNull(), // in cents
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

// TODO: Add your additional tables here