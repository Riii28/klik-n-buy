"use client";

import { useConfirmation } from "@/context/Confirm";
import fetcher from "@/helpers/fetcher";
import { Response } from "@/types/response";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({
   productID,
}: {
   productID: string;
}) {
   const confirm = useConfirmation();
   const [loading, setLoading] = useState(false);
   const { refresh } = useRouter();

   const handleDeleteProduct = async (id: string) => {
      try {
         const isConfirmed = await confirm({
            title: "Are you sure?",
            message:
               "This action cannot be undone. The product will be permanently deleted.",
         });

         if (isConfirmed) {
            setLoading(true);
            const loadingId = toast.loading("Processing...");

            const response: Response = await fetcher(
               `/api/admin/products/delete/${id}`,
               {
                  method: "DELETE",
                  headers: { "Content-type": "application/json" },
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
      <button
         className="text-red-600 hover:underline disabled:opacity-50"
         onClick={() => handleDeleteProduct(productID)}
         disabled={loading}
      >
         {loading ? "Deleting..." : "Delete"}
      </button>
   );
}
