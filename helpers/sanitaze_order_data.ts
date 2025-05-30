export const sanitizeOrderData = (data: any): any => {
   if (data.totalAmount) {
      data.totalAmount = Number(data.totalAmount);
   }

   if (Array.isArray(data.items)) {
      data.items = data.items.map((item: any) => ({
         ...item,
         quantity: Number(item.quantity),
         price: Number(item.price),
      }));
   }

   return data;
};
