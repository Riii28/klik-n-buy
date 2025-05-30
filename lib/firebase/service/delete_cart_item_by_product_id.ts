import { adminDb } from "../admin";

export const deleteCartItemByProductId = async (productId: string[]) => {
   try {
      if (!Array.isArray(productId)) {
         throw new Error("");
      }

      const batch = adminDb.batch();

      for (const id of productId) {
         const cartItemSnap = await adminDb
            .collection("cart_items")
            .where("productId", "==", id)
            .get();

         if (cartItemSnap.empty) {
            throw new Error("");
         }

         cartItemSnap.forEach((doc) => {
            batch.delete(doc.ref);
         });
      }

      await batch.commit();
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Something went wrong. Please try again later.");
   }
};
