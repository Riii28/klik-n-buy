"use client";

import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { SessionProvider } from "next-auth/react";
import { ConfirmProvider } from "@/context/Confirm";
import { CheckoutProvider } from "@/context/Checkout";

export default function AppProviders({ children }: { children: ReactNode }) {
   return (
      <SessionProvider>
         <CheckoutProvider>
            <ConfirmProvider>
               {children}
               <Toaster />
            </ConfirmProvider>
         </CheckoutProvider>
      </SessionProvider>
   );
}
