"use client";

import { useConfirmation } from "@/context/Confirm";
import fetcher from "@/helpers/fetcher";
import { Response } from "@/types/response";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDetailSetting({ userID }: { userID: string }) {
   const confirm = useConfirmation();
   const [loading, setLoading] = useState(false);
   const { refresh } = useRouter();

   const handleDeleteUser = async (userID: string) => {
      try {
         const isConfirmed = await confirm({
            title: "Delete this user?",
            message: "This action cannot be undone. Are you sure?",
         });

         if (isConfirmed) {
            setLoading(true);
            const loadingId = toast.loading("Processing...");

            const response: Response = await fetcher(
               `/api/admin/users/delete/${userID}`,
               { method: "DELETE" }
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
   }

   return (
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
         <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <button
               type="button"
               className="flex w-full text-left disabled:opacity-50"
               onClick={() => handleDeleteUser(userID)}
               disabled={loading}
            >
               {loading ? "Deleting..." : "Delete"}
            </button>
         </li>
      </ul>
   );
}
