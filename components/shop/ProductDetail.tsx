"use client";

import { formatCurrency } from "@/helpers/format_currency";
import { Product } from "@/types/product";
import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import fetcher from "@/helpers/fetcher";
import { generateID } from "@/helpers/generate_id";
import { toast } from "sonner";
import { Response } from "@/types/response";
import { useCheckout } from "@/context/Checkout";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";

export default function ProductDetail({
   product,
   session,
}: {
   product: Product;
   session: Session | null;
}) {
   const [quantity, setQuantity] = useState(1);
   const { push, refresh } = useRouter();
   const { startSession } = useCheckout();

   const handleAddQty = () => {
      if (quantity >= 100) return;
      setQuantity((prev) => prev + 1);
   };

   const handleReduceQty = () => {
      if (quantity === 1) return;
      setQuantity((prev) => prev - 1);
   };

   const handleAddToCart = async (productId: string) => {
      try {
         if (!session) {
            signIn();
            return;
         }

         const cartId = generateID(session?.user.username!);
         const response: Response = await fetcher("/api/cart", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
               productId,
               cartId,
               quantity,
               action: "add",
            }),
         });

         if (!response.success) {
            toast.error(response.message);
            return;
         }

         refresh();
         toast.success(`“${product.name}” has been added to your cart.`);
      } catch (err) {
         if (err instanceof Error) {
            toast.error(err.message);
            return;
         }
         throw new Error("Something went wrong. Please try again later.");
      }
   };

   const handleCheckout = (
      productId: string,
      price: number,
      imageUrl: string,
      name: string
   ) => {
      if (!session) {
         signIn();
         return;
      }

      const username = session!.user.username!;
      const userId = session!.user.id;

      startSession([{ productId, quantity, price, imageUrl, name }]);
      push(`/shop/checkout/${username.toLowerCase()}-${userId}`);
   };

   return (
      <div className="flex flex-col md:flex-row gap-6 md:gap-x-12">
         <div className="w-full md:w-[45%] flex-1">
            <Image
               className="w-full h-auto object-cover aspect-square rounded-xl"
               src={product.imageUrl}
               alt={product.name}
               width={500}
               height={500}
               priority
            />
         </div>

         <div className="flex-2 p-4 md:p-6 bg-light-400 rounded-xl">
            <h1 className="text-xl md:text-2xl font-semibold">
               {product.name}
            </h1>

            <div className="mt-6">
               <h2 className="text-sm font-semibold mb-2">Variants</h2>
               <div className="flex gap-2 flex-wrap">
                  {product.variants && product.variants.length > 0 ? (
                     product.variants.map((variant) => (
                        <span
                           key={variant}
                           className="px-3 py-1 bg-white border border-light-300 rounded-lg text-sm cursor-pointer hover:bg-light-300"
                        >
                           {variant}
                        </span>
                     ))
                  ) : (
                     <span className="text-sm text-dark-300">
                        No variants available.
                     </span>
                  )}
               </div>
            </div>

            <p className="text-2xl md:text-3xl font-bold mt-6">
               {formatCurrency(product.price)}
            </p>

            {/* Quantity */}
            <div className="mt-4 flex flex-row gap-x-28 items-center">
               <p className="block text-sm text-dark-300">
                  Quantity: {quantity}
               </p>
               <div className="flex items-center gap-x-4">
                  <button
                     onClick={handleReduceQty}
                     className="px-3 py-1 bg-white border border-light-300 rounded-lg text-sm cursor-pointer hover:bg-light-300"
                  >
                     <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <button
                     onClick={handleAddQty}
                     className="px-3 py-1 bg-white border border-light-300 rounded-lg text-sm cursor-pointer hover:bg-light-300"
                  >
                     <FontAwesomeIcon icon={faPlus} />
                  </button>
               </div>
            </div>
            <p className="block text-sm text-dark-300">
               Stock: {product.stock}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
               <button
                  onClick={() => handleAddToCart(product.id)}
                  className="flex items-center justify-center cursor-pointer gap-2 bg-white py-2 px-4 rounded-xl font-semibold text-sm hover:bg-light-300 transition"
               >
                  <FontAwesomeIcon icon={faCartPlus} />
                  <span>Add To Cart</span>
               </button>
               <button
                  onClick={() =>
                     handleCheckout(
                        product.id,
                        product.price,
                        product.imageUrl,
                        product.name
                     )
                  }
                  className="bg-primary text-light-200 py-2 px-4 cursor-pointer rounded-xl font-semibold text-sm hover:bg-primary/90 transition"
               >
                  Checkout
               </button>
            </div>
         </div>
      </div>
   );
}
