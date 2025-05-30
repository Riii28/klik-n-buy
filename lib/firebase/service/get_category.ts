import { adminDb } from "../admin";

export const getProductCategory = async () => {
   try {
      const snapshot = await adminDb.collection("categories").get();

      if (snapshot.empty) {
         throw new Error("No categories available at the moment");
      }

      const categories = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return categories;
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Something went wrong. Please try again later.");
   }
};
