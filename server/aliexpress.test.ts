import { describe, it, expect } from 'vitest';
import { fetchTrendingProducts, searchProducts, createAliExpressOrder, getOrderTracking } from './aliexpress';

describe('AliExpress Integration', () => {
  describe('fetchTrendingProducts', () => {
    it('should fetch trending products', async () => {
      const products = await fetchTrendingProducts();
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should respect limit parameter', async () => {
      const products = await fetchTrendingProducts(undefined, 3);
      expect(products.length).toBeLessThanOrEqual(3);
    });

    it('should filter by category', async () => {
      const products = await fetchTrendingProducts('Electronics');
      expect(products.length).toBeGreaterThan(0);
      products.forEach(p => {
        expect(p.category?.toLowerCase()).toBe('electronics');
      });
    });

    it('should handle pagination with offset', async () => {
      const page1 = await fetchTrendingProducts(undefined, 2, 0);
      const page2 = await fetchTrendingProducts(undefined, 2, 2);
      expect(page1.length).toBeGreaterThan(0);
      expect(page2.length).toBeGreaterThan(0);
      expect(page1[0].id).not.toBe(page2[0].id);
    });

    it('should return products with required fields', async () => {
      const products = await fetchTrendingProducts(undefined, 1);
      const product = products[0];
      expect(product.id).toBeDefined();
      expect(product.title).toBeDefined();
      expect(product.price).toBeDefined();
      expect(typeof product.price).toBe('number');
    });
  });

  describe('searchProducts', () => {
    it('should search for products by query', async () => {
      const results = await searchProducts('Headphones');
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return matching products', async () => {
      const results = await searchProducts('Wireless');
      expect(results.length).toBeGreaterThan(0);
      results.forEach(p => {
        const matchesTitle = p.title.toLowerCase().includes('wireless');
        const matchesDesc = p.description?.toLowerCase().includes('wireless');
        expect(matchesTitle || matchesDesc).toBe(true);
      });
    });

    it('should respect limit parameter', async () => {
      const results = await searchProducts('Phone', 2);
      expect(results.length).toBeLessThanOrEqual(2);
    });

    it('should handle case-insensitive search', async () => {
      const results1 = await searchProducts('HEADPHONES');
      const results2 = await searchProducts('headphones');
      expect(results1.length).toBe(results2.length);
    });
  });

  describe('createAliExpressOrder', () => {
    it('should create an order successfully', async () => {
      const order = {
        orderId: 'test_order_1',
        items: [
          { productId: 'ae_1001', quantity: 1 },
        ],
        shippingAddress: {
          name: 'John Doe',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'US',
        },
      };

      const result = await createAliExpressOrder(order, 'test@example.com');
      expect(result.success).toBe(true);
      expect(result.orderId).toBeDefined();
      expect(typeof result.orderId).toBe('string');
    });

    it('should generate unique order IDs', async () => {
      const order = {
        orderId: 'test_order_2',
        items: [{ productId: 'ae_1001', quantity: 1 }],
        shippingAddress: {
          name: 'Jane Doe',
          address: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90001',
          country: 'US',
        },
      };

      const result1 = await createAliExpressOrder(order, 'test1@example.com');
      const result2 = await createAliExpressOrder(order, 'test2@example.com');
      expect(result1.orderId).not.toBe(result2.orderId);
    });
  });

  describe('getOrderTracking', () => {
    it('should return tracking information', async () => {
      const tracking = await getOrderTracking('AE_test_order_123');
      expect(tracking.status).toBeDefined();
      expect(tracking.trackingNumber).toBeDefined();
      expect(tracking.estimatedDelivery).toBeDefined();
    });

    it('should return valid status', async () => {
      const tracking = await getOrderTracking('AE_test_order_456');
      expect(['pending', 'processing', 'shipped', 'delivered']).toContain(tracking.status);
    });

    it('should return future estimated delivery date', async () => {
      const tracking = await getOrderTracking('AE_test_order_789');
      const estimatedDate = new Date(tracking.estimatedDelivery!);
      const now = new Date();
      expect(estimatedDate.getTime()).toBeGreaterThan(now.getTime());
    });
  });
});
