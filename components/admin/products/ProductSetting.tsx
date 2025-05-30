"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import fetcher from "@/helpers/fetcher";
import { useConfirmation } from "@/context/Confirm";
import { Response } from "@/types/response";
import { useRouter } from "next/navigation";

export default function ProductSetting() {
   const confirm = useConfirmation();
   const [loading, setLoading] = useState(false);
   const { refresh } = useRouter();

   const handleDeleteAllProducts = async () => {
      try {
         const isConfirmed = await confirm({
            title: "Delete All Products?",
            message:
               "This action will permanently delete all products. This cannot be undone. Are you sure?",
         });

         if (isConfirmed) {
            setLoading(true);
            const loadingId = toast.loading("Processing...");

            const response: Response = await fetcher(
               "/api/admin/products/delete/all",
               {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
               }
            );

            toast.dismiss(loadingId);

            if (!response.success) {
               toast.error(response.message);
               return;
            }

            toast.success(response.message);
            refresh();
         }
      } catch (err) {
         if (err instanceof Error) {
            toast.error(err.message);
            return;
         }
         throw new Error("Something went wrong. Please try again later.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
         <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <Link href={`/admin/products/add`} className="block w-full">
               Add Product
            </Link>
         </li>
         <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <button
               className="w-full text-left disabled:opacity-60"
               onClick={handleDeleteAllProducts}
               disabled={loading}
            >
               {loading ? "Deleting..." : "Delete All"}
            </button>
         </li>
      </ul>
   );
}
