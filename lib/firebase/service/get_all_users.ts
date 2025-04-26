import { adminDb } from "@/lib/firebase/admin";

export default async function getAllUsers(page = 1, limit = 10) {
   try {
      const offset = (page - 1) * limit;
      let query = adminDb.collection("users").orderBy("createdAt").limit(limit);

      if (offset > 0) {
         const snapshot = await adminDb
            .collection("users")
            .orderBy("createdAt")
            .limit(offset)
            .get();

         const lastDoc = snapshot.docs[snapshot.docs.length - 1];
         if (lastDoc) {
            query = query.startAfter(lastDoc);
         }
      }
      
      const snapshot = await query.get();

      const users = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return users;
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Unknown error occurred");
   }
}
