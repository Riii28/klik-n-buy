import { adminDb } from "../admin";

export async function countTotalProducts() {
   const snapshot = await adminDb.collection("products").count().get();
   return snapshot.data().count;
}
