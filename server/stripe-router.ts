/**
 * Stripe Payment Router
 * tRPC endpoints for payment processing
 */

import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from './_core/trpc';
import {
  createPaymentIntent,
  createCheckoutSession,
  getPaymentIntent,
  getOrCreateCustomer,
  createSubscription,
  cancelSubscription,
} from './stripe';
import {
  createStripePayment,
  getStripePaymentByIntentId,
  updateStripePaymentStatus,
  createStripeSubscription,
  getStripeSubscriptionById,
  updateStripeSubscriptionStatus,
} from './db';

export const stripeRouter = router({
  /**
   * Create a payment intent for one-time purchases
   */
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        email: z.string().email(),
        description: z.string().optional(),
        metadata: z.record(z.string(), z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const metadataRecord: Record<string, string> = {};
        if (input.metadata) {
          Object.entries(input.metadata).forEach(([k, v]) => {
            metadataRecord[k] = String(v);
          });
        }

        const paymentIntent = await createPaymentIntent({
          amount: input.amount,
          email: input.email,
          description: input.description,
          metadata: metadataRecord,
        } as Parameters<typeof createPaymentIntent>[0]);

        // Store in database
        await createStripePayment({
          stripePaymentIntentId: paymentIntent.id,
          email: input.email,
          amount: input.amount,
          status: 'pending',
          metadata: JSON.stringify(metadataRecord),
        });

        return {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        };
      } catch (error) {
        console.error('[Stripe Router] Error creating payment intent:', error);
        throw error;
      }
    }),

  /**
   * Create a checkout session for multi-item orders
   */
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            price: z.number().positive(),
            quantity: z.number().positive(),
            image: z.string().optional(),
          })
        ),
        email: z.string().email(),
        successUrl: z.string().url(),
        cancelUrl: z.string().url(),
        metadata: z.record(z.string(), z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const metadataRecord: Record<string, string> = {};
        if (input.metadata) {
          Object.entries(input.metadata).forEach(([k, v]) => {
            metadataRecord[k] = String(v);
          });
        }

        const session = await createCheckoutSession({
          items: input.items,
          email: input.email,
          successUrl: input.successUrl,
          cancelUrl: input.cancelUrl,
          metadata: metadataRecord,
        } as Parameters<typeof createCheckoutSession>[0]);

        return {
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        console.error('[Stripe Router] Error creating checkout session:', error);
        throw error;
      }
    }),

  /**
   * Get payment intent status
   */
  getPaymentIntent: publicProcedure
    .input(z.object({ paymentIntentId: z.string() }))
    .query(async ({ input }) => {
      try {
        const paymentIntent = await getPaymentIntent(input.paymentIntentId);
        const dbPayment = await getStripePaymentByIntentId(input.paymentIntentId);

        return {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          email: paymentIntent.receipt_email,
          dbStatus: dbPayment?.status,
        };
      } catch (error) {
        console.error('[Stripe Router] Error getting payment intent:', error);
        throw error;
      }
    }),

  /**
   * Confirm payment and create order
   */
  confirmPayment: publicProcedure
    .input(
      z.object({
        paymentIntentId: z.string(),
        orderId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const paymentIntent = await getPaymentIntent(input.paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
          throw new Error('Payment not completed');
        }

        // Update payment status in database
        await updateStripePaymentStatus(input.paymentIntentId, 'succeeded');

        return {
          success: true,
          orderId: input.orderId,
          paymentId: input.paymentIntentId,
        };
      } catch (error) {
        console.error('[Stripe Router] Error confirming payment:', error);
        throw error;
      }
    }),

  /**
   * Create a subscription
   */
  createSubscription: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        priceId: z.string(),
        metadata: z.record(z.string(), z.string()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const metadataRecord: Record<string, string> = {
          userId: ctx.user?.id?.toString() || '',
        };
        if (input.metadata) {
          Object.entries(input.metadata).forEach(([k, v]) => {
            metadataRecord[k] = String(v);
          });
        }

        // Get or create customer
        const customer = await getOrCreateCustomer(input.email, metadataRecord);

        // Create subscription
        const subscription = await createSubscription(
          customer.id,
          input.priceId,
          metadataRecord as Record<string, string> | undefined
        );

        // Store in database
        await createStripeSubscription({
          stripeSubscriptionId: subscription.id,
          userId: ctx.user?.id || 0,
          email: input.email,
          stripeCustomerId: customer.id,
          stripePriceId: input.priceId,
          status: 'active',
        });

        return {
          subscriptionId: subscription.id,
          status: subscription.status,
          customerId: customer.id,
        };
      } catch (error) {
        console.error('[Stripe Router] Error creating subscription:', error);
        throw error;
      }
    }),

  /**
   * Cancel a subscription
   */
  cancelSubscription: protectedProcedure
    .input(z.object({ subscriptionId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const subscription = await cancelSubscription(input.subscriptionId);

        // Update database
        await updateStripeSubscriptionStatus(input.subscriptionId, 'canceled');

        return {
          success: true,
          subscriptionId: subscription.id,
          status: subscription.status,
        };
      } catch (error) {
        console.error('[Stripe Router] Error canceling subscription:', error);
        throw error;
      }
    }),

  /**
   * Get subscription status
   */
  getSubscription: protectedProcedure
    .input(z.object({ subscriptionId: z.string() }))
    .query(async ({ input }) => {
      try {
        const dbSubscription = await getStripeSubscriptionById(input.subscriptionId);

        if (!dbSubscription) {
          throw new Error('Subscription not found');
        }

        return {
          id: dbSubscription.stripeSubscriptionId,
          status: dbSubscription.status,
          currentPeriodStart: dbSubscription.currentPeriodStart,
          currentPeriodEnd: dbSubscription.currentPeriodEnd,
        };
      } catch (error) {
        console.error('[Stripe Router] Error getting subscription:', error);
        throw error;
      }
    }),
});
