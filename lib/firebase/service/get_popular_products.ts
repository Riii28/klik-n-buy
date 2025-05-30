import { adminDb } from "../admin";

export const getPopularProducts = async (limit: number = 10) => {
   try {
      const orderItemsSnap = await adminDb.collection("order_items").get();

      const countMap: Record<string, number> = {};

      orderItemsSnap.forEach((doc) => {
         const data = doc.data();
         const productId = data.productId;
         const quantity = Number(data.quantity) || 0;

         if (productId) {
            countMap[productId] = (countMap[productId] || 0) + quantity;
         }
      });

      const sortedProductIds = Object.entries(countMap)
         .sort((a, b) => b[1] - a[1])
         .slice(0, limit)
         .map(([productId]) => productId);

      const productPromises = sortedProductIds.map(async (productId) => {
         const productDoc = await adminDb
            .collection("products")
            .doc(productId)
            .get();
         if (productDoc.exists) {
            return { id: productDoc.id, ...productDoc.data() };
         }
      });

      const popularProducts = (await Promise.all(productPromises)).filter(
         Boolean
      );

      if (!popularProducts.length) {
         throw new Error("No products available at the moment");

      }

      return popularProducts;
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Something went wrong. Please try again later.");
   }
};
