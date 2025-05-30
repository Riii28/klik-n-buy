import { adminDb } from "../admin";
import { CartItem } from "@/types/cart-items";
import { Product } from "@/types/product";

type CartItemWithProduct = CartItem & {
   product: Product;
};

const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
   const chunks: T[][] = [];
   for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
   }
   return chunks;
};

const fetchProductsBatched = async (
   productIds: string[]
): Promise<Product[]> => {
   if (productIds.length === 0) return [];

   const chunks = chunkArray(productIds, 10);

   const productSnapshots = await Promise.all(
      chunks.map((chunk) =>
         adminDb.collection("products").where("__name__", "in", chunk).get()
      )
   );

   return productSnapshots.flatMap(
      (snap) =>
         snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         })) as Product[]
   );
};

export const getCartItems = async (
   cartId: string
): Promise<CartItemWithProduct[]> => {
   try {
      const [cartSnap, cartItemsSnap] = await Promise.all([
         adminDb.collection("carts").doc(cartId).get(),
         adminDb.collection("cart_items").where("cartId", "==", cartId).get(),
      ]);

      if (!cartSnap.exists) {
         throw new Error("The cart you are looking for does not exist.");
      }

      if (cartItemsSnap.empty) {
         return [];
      }

      const cartItems: CartItem[] = cartItemsSnap.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      })) as CartItem[];

      const uniqueProductIds = [
         ...new Set(cartItems.map((item) => item.productId)),
      ];

      const products = await fetchProductsBatched(uniqueProductIds);

      const productMap = new Map(products.map((p) => [p.id, p]));

      const missingProducts = uniqueProductIds.filter(
         (id) => !productMap.has(id)
      );

      if (missingProducts.length > 0) {
         console.warn(`Missing products: ${missingProducts.join(", ")}`);
      }

      const enrichedCartItems: CartItemWithProduct[] = cartItems
         .map((item) => {
            const product = productMap.get(item.productId);
            if (!product) {
               console.warn(`Product not found for cart item: ${item.id}`);
               return null;
            }
            return {
               ...item,
               product,
            };
         })
         .filter((item): item is CartItemWithProduct => item !== null);

      return enrichedCartItems;
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Failed to fetch cart items with products.");
   }
};
