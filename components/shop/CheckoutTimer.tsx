"use client";

import { useEffect } from "react";
import { useCheckout } from "@/context/Checkout";
import { toast } from "sonner";

export default function CheckoutTimer() {
   const { timeLeft, isActive } = useCheckout();

   const formatTime = (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
   };
   
   return (
      <div className="bg-orange-100 border border-orange-300 rounded-lg p-1">
         <div className="flex items-center gap-x-1 justify-between">
            <span className="text-xs text-orange-800">
               {isActive ? "Session expires in:" : "Session expired"}
            </span>
            <span className="text-xs font-bold text-orange-600">
               {isActive ? formatTime(timeLeft) : "--:--"}
            </span>
         </div>
      </div>
   );
}
