import { adminDb } from "../admin";

export async function getAllProducts(page: number = 1, limit: number = 0) {
   try {
      const offset = (page - 1) * limit;
      let query = adminDb
         .collection("products")
         .orderBy("createdAt")
         .limit(limit);

      if (offset > 0) {
         const snapshot = await adminDb
            .collection("products")
            .orderBy("createdAt")
            .limit(offset)
            .get();

         const lastDoc = snapshot.docs[snapshot.docs.length - 1];
         if (lastDoc) {
            query = query.startAfter(lastDoc);
         }
      }

      const snapshot = await query.get();
      
      const products = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));
      
      return products
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Unknown error occurred");
   }
}
