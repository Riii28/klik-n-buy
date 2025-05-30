"use client";

import React, { createContext, useContext } from "react";
import { useCheckoutSession } from "@/hooks/use-checkout-session";

const CheckoutSessionContext = createContext<
   ReturnType<typeof useCheckoutSession> | undefined
>(undefined);

export const CheckoutProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const value = useCheckoutSession();
   return (
      <CheckoutSessionContext.Provider value={value}>
         {children}
      </CheckoutSessionContext.Provider>
   );
};

export const useCheckout = () => {
   const context = useContext(CheckoutSessionContext);
   if (!context) {
      throw new Error(
         "useCheckout must be used within a CheckoutSessionProvider"
      );
   }
   return context;
};
