import { adminDb } from "../admin";

export async function countTotalUsers() {
   const snapshot = await adminDb.collection("users").count().get();
   return snapshot.data().count;
}
