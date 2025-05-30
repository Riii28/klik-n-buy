"use client";

import CheckoutItemRow from "./CheckoutItemRow";
import { useState } from "react";
import { formatCurrency } from "@/helpers/format_currency";
import { useCheckout } from "@/context/Checkout";
import fetcher from "@/helpers/fetcher";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Response } from "@/types/response";
import { Session } from "next-auth";
import { useConfirmation } from "@/context/Confirm";
import { signIn } from "next-auth/react";

interface Payload {
   name: string;
   productId: string;
   imageUrl: string;
   quantity: number;
   price: number;
}

export default function Checkout({
   userId,
   session,
}: {
   userId: string;
   session: Session | null;
}) {
   const { items, clearSession, isActive } = useCheckout();
   const [selectedPaymentMethod, setSelectedPaymentMethod] =
      useState<string>("");
   const { refresh } = useRouter();
   const confirm = useConfirmation();

   if (!isActive) {
      return (
         <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
            <div className="h-68 w-full flex justify-center items-center border-1 border-light-300 rounded-lg">
               <p className="text-sm text-center text-gray-500">
                  You don’t have an active checkout session.
               </p>
            </div>
         </section>
      );
   }

   const totalAmount =
      items?.reduce((total, item) => total + item.price * item.quantity, 0) ||
      0;

   const handleOrder = async () => {
      try {
         if (!session) {
            signIn();
            return;
         }

         if (!selectedPaymentMethod) {
            toast.info(
               "Please select a payment method before placing your order."
            );
            return;
         }

         const payload = {
            userId,
            totalAmount,
            status: "pending",
            paymentMethod: selectedPaymentMethod,
            paymentStatus: "paid",
            shippingAddress: "N/A",
            items,
         };

         const loadingId = toast.loading("Processing...");

         const responseOrder: Response = await fetcher("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
         });

         if (!responseOrder.success) {
            toast.dismiss(loadingId);
            toast.error(responseOrder.message);
            return;
         }

         const productIds = payload.items?.map((item) => item.productId);
         const responseCart: Response = await fetcher(
            "/api/cart/delete/all?by=productId",
            {
               method: "DELETE",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ ids: productIds }),
            }
         );

         toast.dismiss(loadingId);

         if (!responseCart.success) {
            toast.error(responseCart.message);
            return;
         }

         clearSession();
         refresh();
         toast.success(responseOrder.message);
      } catch (err) {
         if (err instanceof Error) {
            toast.error(err.message);
            return;
         }
         throw new Error("Something went wrong. Please try again later.");
      }
   };

   const handleCancelSession = async () => {
      try {
         const isConfirmed = await confirm({
            title: "Cancel Checkout?",
            message:
               "Are you sure you want to cancel your current checkout session? This action cannot be undone.",
         });

         if (isConfirmed) {
            clearSession();
            toast.success("Checkout session canceled.");
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
            <button
               onClick={handleCancelSession}
               className="text-destructive text-sm mb-6 cursor-pointer hover:text-destructive/80 duration-200"
            >
               Cancel Checkout Session
            </button>
            {items?.map((item: Payload) => (
               <CheckoutItemRow key={item.productId} item={item} />
            ))}
         </section>

         <section className="p-7 bg-white border border-light-300 rounded-xl mt-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-x-8">
               <div className="md:flex-2 w-full">
                  <h2 className="font-semibold text-xl">
                     Select a Payment Method
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                     {[
                        "COD",
                        "Bank Transfer",
                        "Virtual Account",
                        "Credit Card",
                        "E-Wallet",
                        "QRIS",
                     ].map((method) => (
                        <div
                           key={method}
                           onClick={() => setSelectedPaymentMethod(method)}
                           className={`border p-2 text-xs md:text-sm text-center cursor-pointer transition rounded-lg ${
                              selectedPaymentMethod === method
                                 ? "bg-primary text-light-200"
                                 : "bg-light-100 hover:bg-light-200"
                           }`}
                        >
                           {method}
                        </div>
                     ))}
                  </div>
               </div>

               <div className="md:flex-1 w-full">
                  <h1 className="font-semibold text-xl">Order Summary</h1>
                  <div className="mt-4 bg-light-400 rounded-lg p-4 text-sm relative min-h-[10rem]">
                     <div className="flex justify-between items-center mb-2">
                        <h1>Total:</h1>
                        <p className="font-semibold">
                           {formatCurrency(totalAmount)}
                        </p>
                     </div>
                     <div className="flex justify-between items-center mb-2">
                        <h1>Tax (incl.):</h1>
                        <p className="font-semibold">0</p>
                     </div>
                     <div className="flex justify-end mt-6">
                        <button
                           onClick={handleOrder}
                           className="bg-primary cursor-pointer text-light-200 py-2 px-6 md:px-12 rounded-xl font-semibold text-sm hover:bg-primary/90 transition"
                        >
                           Place Order
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
