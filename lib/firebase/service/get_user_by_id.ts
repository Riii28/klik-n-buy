import { adminDb } from "../admin";

export default async function getUserById(id: string) {
   try {
      const userRef = await adminDb.collection("users").doc(id).get();
      if (!userRef.exists) {
         throw new Error("User not found");
      }
      return { id: userRef.id, ...userRef.data() };
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Unknown error occurred");
   }
}
