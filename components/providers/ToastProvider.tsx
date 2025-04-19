"use client";

import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";

export default function ToastProvider({ children }: { children: ReactNode }) {
   return (
      <>
         {children}
         <Toaster />
      </>
   );
}
