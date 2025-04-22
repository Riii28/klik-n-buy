"use client";

import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { SessionProvider } from "next-auth/react";

export default function ToastProvider({ children }: { children: ReactNode }) {
   return (
      <SessionProvider>
         {children}
         <Toaster />
      </SessionProvider>
   );
}
