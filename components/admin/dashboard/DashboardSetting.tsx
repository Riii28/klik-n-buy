"use client";

import Link from "next/link";

export default function DashboardSetting() {
   return (
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
         <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <button className="cursor-pointer flex w-full">
               <Link href={`/admin/products/add`}>Add Product</Link>
            </button>
         </li>
         <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <button className="cursor-pointer flex w-full">Delete All</button>
         </li>
      </ul>
   );
}
