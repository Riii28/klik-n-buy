export const validateOrderData = (
   data: any
): { isValid: boolean; error?: string } => {
   const requiredFields = [
      "userId",
      "totalAmount",
      "status",
      "shippingAddress",
      "paymentMethod",
      "paymentStatus",
      "items",
   ];

   for (const field of requiredFields) {
      if (!data[field]) {
         return { isValid: false, error: `Missing required field: ${field}.` };
      }
   }

   if (!Array.isArray(data.items) || data.items.length === 0) {
      return { isValid: false, error: "Items must be a non-empty array." };
   }

   for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const itemRequiredFields = ["productId", "name", "quantity", "price"];

      for (const field of itemRequiredFields) {
         if (
            item[field] === undefined ||
            item[field] === null ||
            item[field] === ""
         ) {
            return {
               isValid: false,
               error: `Missing required field '${field}' in item ${i + 1}.`,
            };
         }
      }

      if (
         isNaN(item.quantity) ||
         item.quantity <= 0 ||
         !Number.isInteger(item.quantity)
      ) {
         return {
            isValid: false,
            error: `Invalid quantity for item ${
               i + 1
            }. Must be a positive integer.`,
         };
      }

      if (isNaN(item.price) || item.price < 0) {
         return {
            isValid: false,
            error: `Invalid price for item ${
               i + 1
            }. Must be a valid positive number.`,
         };
      }
   }

   if (isNaN(data.totalAmount) || data.totalAmount <= 0) {
      return {
         isValid: false,
         error: "Invalid total amount. Must be a positive number.",
      };
   }

   return { isValid: true };
};
