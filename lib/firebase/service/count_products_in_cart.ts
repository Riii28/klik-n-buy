import { generateID } from "@/helpers/generate_id";
import { adminDb } from "../admin";

export async function countProductsInCart(username: string) {
   try {
      const cartId = generateID(username);
      const cart = await adminDb.collection("carts").doc(cartId).get();

      if (!cart.exists) {
         throw new Error("Your shopping cart couldn't be found.");
      }

      const cartItems = await adminDb
         .collection("cart_items")
         .where("cartId", "==", cart.id)
         .count()
         .get()

      return cartItems.data().count;
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Something went wrong. Please try again later.");
   }
}
