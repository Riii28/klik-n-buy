"use client";

import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { SessionProvider } from "next-auth/react";
import { ConfirmProvider } from "@/context/Confirm";

export default function AppProviders({ children }: { children: ReactNode }) {
   return (
      <SessionProvider>
         <ConfirmProvider>
            {children}
            <Toaster />
         </ConfirmProvider>
      </SessionProvider>
   );
}
