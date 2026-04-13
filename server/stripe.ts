/**
 * Stripe Payment Service
 * Handles payment processing, checkout sessions, and webhooks
 */

import Stripe from 'stripe';
import { ENV } from './_core/env';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-03-25.dahlia',
});

interface CheckoutItem {
  name: string;
  description?: string;
  price: number; // in cents
  quantity: number;
  image?: string;
}

interface CreatePaymentIntentInput {
  amount: number; // in cents
  email: string;
  description?: string;
  metadata?: Record<string, string>;
}

interface CreateCheckoutSessionInput {
  items: CheckoutItem[];
  email: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

/**
 * Create a payment intent for one-time charges
 */
export async function createPaymentIntent(
  input: CreatePaymentIntentInput
): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: input.amount,
      currency: 'usd',
      receipt_email: input.email,
      description: input.description,
      metadata: input.metadata || {},
    });

    return paymentIntent;
  } catch (error) {
    console.error('[Stripe] Error creating payment intent:', error);
    throw error;
  }
}

/**
 * Create a checkout session for multi-item orders
 */
export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<Stripe.Checkout.Session> {
  try {
    const lineItems = input.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: input.email,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      metadata: input.metadata || {},
    });

    return session;
  } catch (error) {
    console.error('[Stripe] Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Retrieve a payment intent
 */
export async function getPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('[Stripe] Error retrieving payment intent:', error);
    throw error;
  }
}

/**
 * Retrieve a checkout session
 */
export async function getCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error('[Stripe] Error retrieving checkout session:', error);
    throw error;
  }
}

/**
 * Create a subscription
 */
export async function createSubscription(
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>
): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata: metadata || {},
    });

    return subscription;
  } catch (error) {
    console.error('[Stripe] Error creating subscription:', error);
    throw error;
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  try {
    return await stripe.subscriptions.cancel(subscriptionId);
  } catch (error) {
    console.error('[Stripe] Error canceling subscription:', error);
    throw error;
  }
}

/**
 * Create or retrieve a customer
 */
export async function getOrCreateCustomer(
  email: string,
  metadata?: Record<string, string>
): Promise<Stripe.Customer> {
  try {
    // Search for existing customer
    const customers = await stripe.customers.list({ email, limit: 1 });

    if (customers.data.length > 0) {
      return customers.data[0];
    }

    // Create new customer
    return await stripe.customers.create({
      email,
      metadata: metadata || {},
    });
  } catch (error) {
    console.error('[Stripe] Error getting or creating customer:', error);
    throw error;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('[Stripe] Webhook signature verification failed:', error);
    throw error;
  }
}

/**
 * Handle payment intent succeeded event
 */
export function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
): void {
  console.log('[Stripe] Payment succeeded:', {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    email: paymentIntent.receipt_email,
    metadata: paymentIntent.metadata,
  });
}

/**
 * Handle payment intent failed event
 */
export function handlePaymentIntentFailed(
  paymentIntent: Stripe.PaymentIntent
): void {
  console.log('[Stripe] Payment failed:', {
    id: paymentIntent.id,
    error: paymentIntent.last_payment_error,
    metadata: paymentIntent.metadata,
  });
}

/**
 * Handle checkout session completed event
 */
export function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
): void {
  console.log('[Stripe] Checkout session completed:', {
    id: session.id,
    email: session.customer_email,
    amount: session.amount_total,
    metadata: session.metadata,
  });
}
