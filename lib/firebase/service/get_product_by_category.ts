import { adminDb } from "../admin";

export const getProductByCategory = async (category: string) => {
   try {
      const productSnap = await adminDb
         .collection("products")
         .where("category", "==", category)
         .limit(10)
         .get();

      if (productSnap.empty) {
         throw new Error(`No products available in the ${category} category.`);
      }

      const products = productSnap.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return products;
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Something went wrong. Please try again later.");
   }
};
