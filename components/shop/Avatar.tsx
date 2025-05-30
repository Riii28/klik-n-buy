"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function Avatar({ session }: { session: Session | null }) {
   const [showDropdown, setShowDropdown] = useState(false);

   return (
      <div
         className="relative"
         onMouseEnter={() => setShowDropdown(true)}
         onMouseLeave={() => setShowDropdown(false)}
      >
         <Link href="/profile">
            <Image
               src="/avatar.png"
               alt="Avatar"
               height={40}
               width={40}
               className="rounded-full cursor-pointer"
            />
         </Link>

         {showDropdown && (
            <div
               id="userDropdown"
               className="absolute right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-48"
            >
               <div className="px-4 py-3 text-sm">
                  <div className="truncate">
                     {session?.user.username || "Guest"}
                  </div>
                  <div className="font-medium truncate">
                     {session?.user.email || "guest@gmail.com"}
                  </div>
               </div>
               <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
               >
                  <li>
                     <Link
                        href="/admin"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                     >
                        Dashboard
                     </Link>
                  </li>
               </ul>
               <div className="py-1">
                  <button
                     onClick={() => (session ? signOut() : signIn())}
                     className="block w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  >
                     {session ? "Sign out" : "Sign in"}
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
