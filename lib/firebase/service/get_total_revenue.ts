import { OrderItem } from "@/types/order-item";
import { adminDb } from "../admin";
import { OrderData } from "@/types/order-data";

export const getTotalRevenue = async () => {
   try {
      const ordersSnap = await adminDb
         .collection("orders")
         .where("paymentStatus", "==", "paid")
         .get();

      if (ordersSnap.empty) {
         return 0
      }

      const orders = ordersSnap.docs.map((doc) => ({ ...doc.data() }));

      const revenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

      return revenue;
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Something went wrong. Please try again later.");
   }
};
