import { adminDb } from "../admin";

export const countPendingOrders = async () => {
   try {
      const countSnap = await adminDb
         .collection("orders")
         .where("status", "==", "pending")
         .count()
         .get();

      return countSnap.data().count;
   } catch (err) {}
};
