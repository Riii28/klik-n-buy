import { adminDb } from "../admin";

export const deleteCartItemById = async (cartId: string[]) => {
   try {
      const batch = adminDb.batch();

      cartId.forEach((id) => {
         const docRef = adminDb.collection("cart_items").doc(id);
         batch.delete(docRef);
      });

      await batch.commit();
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Something went wrong. Please try again later.");
   }
};
