import { OrderItem } from "@/types/order-item";
import { ProductData } from "@/types/product-data";
import { adminDb } from "../admin";

export const validateProductsAndStock = async (
   items: OrderItem[]
): Promise<{
   isValid: boolean;
   error?: string;
   productsData?: Map<string, ProductData>;
}> => {
   const productsData = new Map<string, ProductData>();

   try {
      const productPromises = items.map((item) => {
         return adminDb.collection("products").doc(item.productId).get();
      });

      const productDocs = await Promise.all(productPromises);

      for (let i = 0; i < items.length; i++) {
         const item = items[i];
         const productDoc = productDocs[i];

         if (!productDoc.exists) {
            return {
               isValid: false,
               error: `Product not found: ${item.productId}.`,
            };
         }

         const productData = productDoc.data() as ProductData;
         const currentStock = productData.stock || 0;

         if (currentStock < item.quantity) {
            return {
               isValid: false,
               error: `Insufficient stock for product '${productData.name}.'`,
            };
         }

         productsData.set(item.productId, productData);
      }

      return { isValid: true, productsData };
   } catch (error) {
      return {
         isValid: false,
         error: "Failed to validate product availability.",
      };
   }
};
