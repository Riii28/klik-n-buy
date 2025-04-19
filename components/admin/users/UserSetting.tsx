"use client";

import fetcher from "@/helpers/fetcher";
import { Response } from "@/types/response";
import { toast } from "sonner";

export default function UserSetting() {
   async function handleDeleteAllUsers() {
      try {
         const response: Response = await fetcher(
            "/api/admin/users/delete/all",
            { method: "DELETE" }
         );

         if (!response.success) {
            throw new Error(response.message);
         }

         toast.success(response.message);
      } catch (err) {
         if (err instanceof Error) {
            toast.error(err.message);
            return;
         }
         throw new Error("Unknown error occured");
      }
   }

   return (
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
         <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <button
               className="cursor-pointer flex w-full"
               onClick={handleDeleteAllUsers}
            >
               Delete All Users
            </button>
         </li>
      </ul>
   );
}
