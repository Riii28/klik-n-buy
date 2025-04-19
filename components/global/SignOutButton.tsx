"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignOutButton({ className }: { className?: string }) {
   return (
      <Button className={className} onClick={() => signOut()}>
         Sign out
      </Button>
   );
}
