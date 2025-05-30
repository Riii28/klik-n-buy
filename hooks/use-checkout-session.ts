"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface CheckoutItem {
   name: string;
   productId: string;
   imageUrl: string;
   quantity: number;
   price: number;
}

const CHECKOUT_KEY = "checkout_items";
const EXPIRE_KEY = "checkout_expire";
const CHECKOUT_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export function useCheckoutSession() {
   const [items, setItems] = useState<CheckoutItem[] | null>(null);
   const [timeLeft, setTimeLeft] = useState<number>(0);
   const intervalRef = useRef<NodeJS.Timeout | null>(null);

   const clearSession = useCallback(() => {
      sessionStorage.removeItem(CHECKOUT_KEY);
      sessionStorage.removeItem(EXPIRE_KEY);

      setItems(null);
      setTimeLeft(0);

      // Clear timer
      if (intervalRef.current) {
         clearInterval(intervalRef.current);
         intervalRef.current = null;
      }
   }, []);

   const startSession = useCallback((newItems: CheckoutItem[]) => {
      const expireAt = Date.now() + CHECKOUT_TIMEOUT;

      sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(newItems));
      sessionStorage.setItem(EXPIRE_KEY, expireAt.toString());

      setItems(newItems);
      setTimeLeft(CHECKOUT_TIMEOUT);
   }, []);

   const updateItems = useCallback(
      (newItems: CheckoutItem[]) => {
         if (timeLeft > 0) {
            setItems(newItems);
            sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(newItems));
         }
      },
      [timeLeft]
   );

   // Initialize session on mount
   useEffect(() => {
      const storedItems = sessionStorage.getItem(CHECKOUT_KEY);
      const expireAt = Number(sessionStorage.getItem(EXPIRE_KEY));

      if (storedItems && expireAt) {
         const now = Date.now();
         if (now < expireAt) {
            // Session masih valid
            setItems(JSON.parse(storedItems));
            setTimeLeft(expireAt - now);
         } else {
            // Session expired, clear everything
            clearSession();
         }
      }
   }, [clearSession]);

   // Timer effect
   useEffect(() => {
      // Clear previous interval
      if (intervalRef.current) {
         clearInterval(intervalRef.current);
         intervalRef.current = null;
      }

      // Start new timer if timeLeft > 0
      if (timeLeft > 0) {
         intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
               const newTime = prev - 1000;
               if (newTime <= 0) {
                  clearSession();
                  return 0;
               }
               return newTime;
            });
         }, 1000);
      }

      // Cleanup on unmount
      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
         }
      };
   }, [timeLeft > 0, clearSession]);

   return {
      items,
      timeLeft,
      isActive: timeLeft > 0 && items !== null,
      startSession,
      clearSession,
      updateItems,
   };
}
