"use client";

import { useState, useMemo, useCallback } from "react";
import { CartItem } from "@/types/cart-items";
import { Product } from "@/types/product";
import { formatCurrency } from "@/helpers/format_currency";
import CartItemRow from "./CartItemRow";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCheckout } from "@/context/Checkout";
import fetcher from "@/helpers/fetcher";
import { toast } from "sonner";
import { Response } from "@/types/response";
import { useConfirmation } from "@/context/Confirm";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";

type CartItemWithProduct = CartItem & {
   product: Product;
};

interface Payload {
   name: string;
   productId: string;
   imageUrl: string;
   quantity: number;
   price: number;
}

export default function Cart({
   cartItems,
   session,
}: {
   cartItems: CartItemWithProduct[];
   session: Session | null;
}) {
   const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
   const { startSession } = useCheckout();
   const { push, refresh } = useRouter();
   const confirm = useConfirmation();

   const handleCheckboxChange = useCallback((id: string) => {
      setSelectedItems((prev) => {
         const newSet = new Set(prev);
         if (newSet.has(id)) {
            newSet.delete(id);
         } else {
            newSet.add(id);
         }
         return newSet;
      });
   }, []);

   const toggleSelectAll = () => {
      if (selectedItems.size === cartItems.length) {
         setSelectedItems(new Set());
      } else {
         setSelectedItems(new Set(cartItems.map((item) => item.id)));
      }
   };

   const selectedProducts = useMemo(() => {
      return cartItems.filter((item) => selectedItems.has(item.id));
   }, [cartItems, selectedItems]);

   const totalPrice = useMemo(() => {
      return selectedProducts.reduce(
         (total, item) => total + item.product.price * item.quantity,
         0
      );
   }, [selectedProducts]);

   const selectedCount = selectedItems.size;

   const handleCheckout = () => {
      if (!session || !session.user.username) {
         signIn();
         return;
      }

      if (!selectedProducts.length) {
         toast.info("Please select items to delete.");
         return;
      }

      const payload: Payload[] = selectedProducts.map((item) => ({
         name: item.product.name,
         productId: item.product.id,
         imageUrl: item.product.imageUrl,
         quantity: item.quantity,
         price: item.product.price,
      }));

      const username = session.user.username;
      const userId = session.user.id;

      startSession(payload);
      push(`/shop/checkout/${username.toLowerCase()}-${userId}`);
   };

   const handleDeleteItems = async () => {
      try {
         if (!session) {
            signIn();
            return;
         }

         if (!selectedItems.size) {
            toast.info("Please select items to delete.");
            return;
         }

         const isConfirmed = await confirm({
            title: "Remove items from cart",
            message: "Are you sure you want to remove the selected items?",
         });

         if (isConfirmed) {
            const response: Response = await fetcher("/api/cart/delete/all", {
               method: "DELETE",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ ids: Array.from(selectedItems) }),
            });

            if (!response.success) {
               toast.error(response.message);
               return;
            }

            toast.success(response.message);
            setSelectedItems(new Set());
            refresh();
         }
      } catch (err) {
         if (err instanceof Error) {
            toast.error(err.message);
            return;
         }
         throw new Error("Something went wrong. Please try again later.");
      }
   };

   return (
      <>
         <section className="p-7 bg-white border border-light-300 rounded-xl">
            {cartItems.length ? (
               <div className="flex justify-between items-center mb-6">
                  <button
                     className="text-sm text-primary hover:text-primary/80 cursor-pointer duration-200"
                     onClick={toggleSelectAll}
                     title={
                        selectedItems.size === cartItems.length
                           ? "Unselect all items"
                           : "Select all items"
                     }
                  >
                     {selectedItems.size === cartItems.length
                        ? "Unselect All"
                        : "Select All"}
                  </button>
                  <div className="flex items-center gap-x-6">
                     <p className="text-sm text-dark-300">
                        {selectedCount}/{cartItems.length} Selected
                     </p>
                     <button
                        onClick={handleDeleteItems}
                        className="text-dark-300 hover:text-dark-200 duration-200 cursor-pointer"
                        title="Delete selected items"
                     >
                        <FontAwesomeIcon icon={faTrash} />
                     </button>
                  </div>
               </div>
            ) : (
               <div className="h-68 w-full flex justify-center items-center border-1 border-light-300 rounded-lg">
                  <p className="text-sm text-dark-300 text-center">
                     No products in your cart
                  </p>
               </div>
            )}
            {cartItems.map((item) => (
               <CartItemRow
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.has(item.id)}
                  onToggle={handleCheckboxChange}
               />
            ))}
         </section>

         <section className="p-7 bg-white border border-light-300 rounded-xl">
            <div className="flex justify-between items-center">
               <p className="text-sm">{selectedCount} Item Selected</p>
               <div className="flex items-center gap-x-6">
                  <p className="text-sm font-semibold">
                     Total: {formatCurrency(totalPrice)}
                  </p>
                  <button
                     onClick={handleCheckout}
                     className="bg-primary text-light-200 py-2 px-4 cursor-pointer rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                     disabled={selectedCount === 0}
                     title={selectedCount === 0 ? "Select items first" : ""}
                  >
                     Checkout
                  </button>
               </div>
            </div>
         </section>
      </>
   );
}
