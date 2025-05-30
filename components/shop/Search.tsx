"use client";

import { cn } from "@/lib/utils";
import SearchBar from "../global/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/types/product";
import Link from "next/link";

export default function Search({ className }: { className?: string }) {
   return (
      <SearchBar
         className={cn("w-72", className)}
         endpoint="/api/admin/products/search"
         placeholder="Browse popular products..."
         renderResult={(products: Product[], handleClear: () => void) => (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-8 py-6 bg-white border border-light-300 rounded-xl shadow-md">
               <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-xl">Search Results</h1>
                  <button
                     onClick={handleClear}
                     className="hover:text-dark-300 duration-200 cursor-pointer"
                  >
                     <FontAwesomeIcon icon={faClose} size="xl" />
                  </button>
               </div>

               <div className="mt-6 border-t border-light-300 max-h-[300px] overflow-y-auto">
                  {products.length > 0 ? (
                     products.map((product) => (
                        <Link
                           href={`/shop/product/${product.id}`}
                           key={product.id}
                           className="block py-2 border-b border-light-200 hover:bg-light-200 duration-200"
                        >
                           {product.name}
                        </Link>
                     ))
                  ) : (
                     <p className="text-dark-300 mt-4 text-sm text-center">
                        No products found.
                     </p>
                  )}
               </div>
            </div>
         )}
      />
   );
}
