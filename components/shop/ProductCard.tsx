"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import fetcher from "@/helpers/fetcher";
import { Response } from "@/types/response";
import { signIn, useSession } from "next-auth/react";
import { generateID } from "@/helpers/generate_id";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatCurrency } from "@/helpers/format_currency";
import { Session } from "next-auth";

export default function ProductCard({
   product,
   session,
}: {
   product: Product;
   session: Session | null;
}) {
   const { refresh } = useRouter();

   const formatURL = (url: string) => url.toLowerCase().replace(/\s+/g, "-");

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
               quantity: 1,
               acction: "add",
            }),
         });

         if (!response.success) {
            toast.error(response.message || "Failed to add product to cart.");
            return;
         }

         refresh();
         toast.success(`"${product.name}" has been added to your cart.`);
      } catch (err) {
         if (err instanceof Error) {
            toast.error(err.message);
            return;
         }
         throw new Error("Something went wrong. Please try again later.");
      }
   };

   return (
      <div className="flex-shrink-0 w-[140px] sm:w-[150px] md:w-[160px] bg-light-400 rounded-md overflow-hidden text-[11px] snap-start">
         <Link
            href={`/shop/product/${formatURL(`${product.name} ${product.id}`)}`}
            className="block aspect-square overflow-hidden"
         >
            <Image
               className="w-full h-full object-cover"
               src={product.imageUrl}
               alt={product.name}
               width={100}
               height={100}
               priority
            />
         </Link>
         <div className="p-2.5">
            <h3 className="text-[11px] font-medium leading-snug line-clamp-2 min-h-[2.25rem]">
               {product.name}
            </h3>
            <p className="font-bold text-[12px] mt-1">
               {formatCurrency(product.price)}
            </p>
            <div className="flex justify-between items-center text-dark-300 mt-1 text-[10px]">
               <span>Sold {product.sold || 0}</span>
               <button
                  onClick={() => handleAddToCart(product.id)}
                  className="hover:text-dark-200 cursor-pointer"
               >
                  <FontAwesomeIcon size="lg" icon={faCartPlus} />
               </button>
            </div>
         </div>
      </div>
   );
}
