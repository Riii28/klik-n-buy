'use client'

import { useState } from "react";
import { ConfirmOptions } from "@/types/confirm_option";

interface ConfirmState extends ConfirmOptions {
   isOpen: boolean;
   onConfirm: () => void;
   onCancel: () => void;
}

export const useConfirm = () => {
   const [confirmState, setConfirmState] = useState<ConfirmState>({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
      onCancel: () => {},
      confirmText: "Yes",
      cancelText: "Cancel",
   });

   const confirm = (options: ConfirmOptions): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
         setConfirmState({
            isOpen: true,
            ...options,
            confirmText: options.confirmText || "Yes",
            cancelText: options.cancelText || "Cancel",
            onConfirm: () => {
               setConfirmState((prev) => ({ ...prev, isOpen: false }));
               resolve(true);
               options.onConfirm?.();
            },
            onCancel: () => {
               setConfirmState((prev) => ({ ...prev, isOpen: false }));
               resolve(false);
               options.onCancel?.();
            },
         });
      });
   };

   return {
      confirmState,
      confirm,
   };
};
