export interface OrderData {
   userId: string;
   totalAmount: number;
   status: string;
   shippingAddress: any;
   paymentMethod: string;
   paymentStatus: string;
   items: OrderItem[];
}
