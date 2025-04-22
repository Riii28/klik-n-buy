"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton({ className }: { className?: string }) {
   return (
      <button className={`${className} cursor-pointer`} onClick={() => signOut()}>
         Sign out
      </button>
   );
}
