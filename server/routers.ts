import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { fetchTrendingProducts, searchProducts, createAliExpressOrder } from "./aliexpress";
import { getAliexpressProducts, createOrder, createOrderItems } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Dropshipping routers
  dropshipping: router({
    getTrendingProducts: publicProcedure
      .input(z.object({ 
        category: z.string().optional(), 
        limit: z.number().default(100), 
        offset: z.number().default(0) 
      }))
      .query(async ({ input }) => {
        return await fetchTrendingProducts(input.category, input.limit, input.offset);
      }),
    
    searchProducts: publicProcedure
      .input(z.object({ 
        query: z.string(), 
        limit: z.number().default(50) 
      }))
      .query(async ({ input }) => {
        return await searchProducts(input.query, input.limit);
      }),
  }),

  // Orders routers
  orders: router({
    createOrder: protectedProcedure
      .input(z.object({
        email: z.string().email(),
        totalAmount: z.number(),
        shippingAddress: z.string(),
        shippingCity: z.string(),
        shippingState: z.string(),
        shippingZip: z.string(),
        shippingCountry: z.string(),
        items: z.array(z.object({
          aliexpressProductId: z.string(),
          quantity: z.number(),
          price: z.number(),
        })),
      }))
      .mutation(async ({ input, ctx }) => {
        const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const orderData = {
          orderId,
          userId: ctx.user?.id,
          email: input.email,
          totalAmount: input.totalAmount,
          shippingAddress: input.shippingAddress,
          shippingCity: input.shippingCity,
          shippingState: input.shippingState,
          shippingZip: input.shippingZip,
          shippingCountry: input.shippingCountry,
          status: 'pending' as const,
        };

        await createOrder(orderData);

        // Create order items
        const orderItemsData = input.items.map(item => ({
          orderId: 1,
          productId: 0,
          aliexpressProductId: item.aliexpressProductId,
          quantity: item.quantity,
          price: item.price,
        }));

        await createOrderItems(orderItemsData);

        // Create AliExpress order
        const aliExpressOrder = await createAliExpressOrder(
          {
            orderId,
            items: input.items.map(item => ({
              productId: item.aliexpressProductId,
              quantity: item.quantity,
            })),
            shippingAddress: {
              name: ctx.user?.name || 'Customer',
              address: input.shippingAddress,
              city: input.shippingCity,
              state: input.shippingState,
              zip: input.shippingZip,
              country: input.shippingCountry,
            },
          },
          input.email
        );

        return {
          orderId,
          aliExpressOrderId: aliExpressOrder.orderId,
          success: true,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
