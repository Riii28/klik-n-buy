"use client";

import { useMemo } from "react";
import { formatCurrency } from "@/helpers/format_currency";
import { CartItem } from "@/types/cart-items";
import { Product } from "@/types/product";
import Image from "next/image";

type CartItemWithProduct = CartItem & {
   product: Product;
};

export default function CartItemRow({
   item,
   isSelected,
   onToggle,
}: {
   item: CartItemWithProduct;
   isSelected: boolean;
   onToggle: (id: string) => void;
}) {
   const itemTotal = useMemo(
      () => item.product.price * item.quantity,
      [item.product.price, item.quantity]
   );

   return (
      <div className="flex flex-row items-center border-t-1 border-t-light-300 py-4">
         <div className="flex-2 flex items-center gap-x-8">
            <input
               className="cursor-pointer"
               type="checkbox"
               checked={isSelected}
               onChange={() => onToggle(item.id)}
            />
            <div className="flex items-start gap-x-2">
               <Image
                  className="object-cover aspect-square"
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width={100}
                  height={100}
               />
               <h1 className="text-sm p-2 font-semibold">
                  {item.product.name}
               </h1>
            </div>
         </div>
         <p className="flex-1 text-center text-sm">
            {formatCurrency(item.product.price)}
         </p>
         <p className="flex-1 text-center text-sm">{item.quantity}</p>
         <p className="flex-1 text-center text-sm">
            {formatCurrency(itemTotal)}
         </p>
      </div>
   );
}
