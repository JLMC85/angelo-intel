import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, aliexpressProducts, orders, orderItems, stripePayments, stripeSubscriptions, InsertOrder, InsertOrderItem, InsertStripePayment, InsertStripeSubscription } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Dropshipping & Order Management Queries

export async function getAliexpressProducts(limit: number = 100, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(aliexpressProducts).limit(limit).offset(offset);
}

export async function getAliexpressProductById(productId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(aliexpressProducts).where(eq(aliexpressProducts.id, productId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const result = await db.insert(orders).values(order);
  return result;
}

export async function getOrderById(orderId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.orderId, orderId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateOrderStatus(orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded') {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(orders).set({ status }).where(eq(orders.orderId, orderId));
}

export async function createOrderItems(items: InsertOrderItem[]) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(orderItems).values(items);
}

export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

// Stripe Payment Queries

export async function createStripePayment(payment: InsertStripePayment) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(stripePayments).values(payment);
}

export async function getStripePaymentByIntentId(intentId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(stripePayments).where(eq(stripePayments.stripePaymentIntentId, intentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateStripePaymentStatus(intentId: string, status: 'pending' | 'succeeded' | 'failed' | 'canceled') {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(stripePayments).set({ status }).where(eq(stripePayments.stripePaymentIntentId, intentId));
}

// Stripe Subscription Queries

export async function createStripeSubscription(subscription: InsertStripeSubscription) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(stripeSubscriptions).values(subscription);
}

export async function getStripeSubscriptionById(subscriptionId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(stripeSubscriptions).where(eq(stripeSubscriptions.stripeSubscriptionId, subscriptionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateStripeSubscriptionStatus(subscriptionId: string, status: 'active' | 'paused' | 'canceled' | 'incomplete' | 'incomplete_expired') {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(stripeSubscriptions).set({ status }).where(eq(stripeSubscriptions.stripeSubscriptionId, subscriptionId));
}

// TODO: add feature queries here as your schema grows.
