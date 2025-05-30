"use client";

import AddProductForm from "@/components/admin/products/ProductForm";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Page() {
   const { back } = useRouter();

   return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
         <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-4 md:p-8 overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center pb-3">
               <h2 className="text-xl md:text-2xl font-semibold">
                  Add New Product
               </h2>
               <button
                  onClick={back}
                  aria-label="Close modal"
                  className="text-gray-600 hover:text-gray-800 transition"
               >
                  <FontAwesomeIcon icon={faClose} size="lg" />
               </button>
            </div>

            <div className="mt-6">
               <AddProductForm />
            </div>
         </div>
      </div>
   );
}
