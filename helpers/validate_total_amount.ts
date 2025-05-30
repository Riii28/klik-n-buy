import { OrderItem } from "@/types/order-item";

export const validateTotalAmount = (
   items: OrderItem[],
   expectedTotal: number
): boolean => {
   const calculatedTotal = items.reduce((total, item) => {
      return total + item.price * item.quantity;
   }, 0);

   return Math.abs(calculatedTotal - expectedTotal) < 0.01;
};
