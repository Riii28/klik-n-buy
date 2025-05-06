import React, { useState, createContext, useContext, ReactNode } from "react";
import ConfirmDialog from "@/components/global/confirm-dialog";

interface ConfirmOptions {
   title?: string;
   message: string;
   onConfirm?: () => void;
   onCancel?: () => void;
   confirmText?: string;
   cancelText?: string;
}

interface ConfirmState extends ConfirmOptions {
   isOpen: boolean;
   onConfirm: () => void;
   onCancel: () => void;
}

interface ConfirmContextType {
   confirm: (options: ConfirmOptions) => Promise<boolean>;
}

interface ConfirmProviderProps {
   children: ReactNode;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const ConfirmProvider: React.FC<ConfirmProviderProps> = ({
   children,
}) => {
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
               if (options.onConfirm) options.onConfirm();
            },
            onCancel: () => {
               setConfirmState((prev) => ({ ...prev, isOpen: false }));
               resolve(false);
               if (options.onCancel) options.onCancel();
            },
         });
      });
   };

   return (
      <ConfirmContext.Provider value={{ confirm }}>
         {children}
         {confirmState.isOpen && (
            <ConfirmDialog
               title={confirmState.title}
               message={confirmState.message}
               onConfirm={confirmState.onConfirm}
               onCancel={confirmState.onCancel}
               confirmText={confirmState.confirmText}
               cancelText={confirmState.cancelText}
            />
         )}
      </ConfirmContext.Provider>
   );
};

export const useConfirm = (): ((
   options: ConfirmOptions
) => Promise<boolean>) => {
   const context = useContext(ConfirmContext);
   if (!context) {
      throw new Error("useConfirm harus digunakan di dalam ConfirmProvider");
   }
   return context.confirm;
};
