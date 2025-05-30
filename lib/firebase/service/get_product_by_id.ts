import { adminDb } from "../admin";

export const getProductById = async (productId: string) => {
   try {
      const product = await adminDb.collection("products").doc(productId).get();

      if (!product.exists) {
         throw new Error("The product you're looking for was not found.");
      }

      return { id: product.id, ...product.data() };
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Something went wrong. Please try again later.");
   }
};
