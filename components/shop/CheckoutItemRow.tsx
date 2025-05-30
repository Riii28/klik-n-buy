"use client";

import { useMemo } from "react";
import { formatCurrency } from "@/helpers/format_currency";
import Image from "next/image";

interface Payload {
   name: string;
   productId: string;
   imageUrl: string;
   quantity: number;
   price: number;
}

export default function CheckoutItemRow({ item }: { item: Payload }) {
   const itemTotal = useMemo(
      () => item.price * item.quantity,
      [item.price, item.quantity]
   );

   return (
      <div className="flex flex-row items-center border-t-1 border-t-light-300 py-4">
         <div className="flex-2 flex items-start gap-x-4">
            <Image
               className="object-cover aspect-square"
               src={item.imageUrl}
               alt={item.name}
               width={100}
               height={100}
            />
            <h1 className="text-sm p-2 font-semibold">{item.name}</h1>
         </div>
         <p className="flex-1 text-center text-sm">
            {formatCurrency(item.price)}
         </p>
         <p className="flex-1 text-center text-sm">{item.quantity}</p>
         <p className="flex-1 text-center text-sm">
            {formatCurrency(itemTotal)}
         </p>
      </div>
   );
}
