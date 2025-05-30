"use client";

import { useConfirmation } from "@/context/Confirm";
import fetcher from "@/helpers/fetcher";
import { Response } from "@/types/response";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UserSetting() {
   const confirm = useConfirmation();
   const [loading, setLoading] = useState(false);
   const { refresh } = useRouter();

   const handleDeleteAllUsers = async () => {
      try {
         const isConfirmed = await confirm({
            title: "Delete All Users?",
            message:
               "This action is irreversible. All user data will be permanently deleted.",
         });

         if (isConfirmed) {
            setLoading(true);
            const loadingId = toast.loading("Processing...");

            const response: Response = await fetcher(
               "/api/admin/users/delete/all",
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
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
         <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <button
               className="cursor-pointer flex w-full"
               onClick={handleDeleteAllUsers}
               disabled={loading}
            >
               {loading ? "Deleting..." : "Delete All"}
            </button>
         </li>
      </ul>
   );
}
