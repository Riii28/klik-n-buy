import { createContext, useContext, ReactNode } from "react";
import ConfirmDialog from "@/components/global/ConfirmDialog";
import { ConfirmOptions } from "@/types/confirm_option";
import { useConfirm } from "@/hooks/use-confirm";

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
   const { confirm, confirmState } = useConfirm();

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

export const useConfirmation = (): ((
   options: ConfirmOptions
) => Promise<boolean>) => {
   const context = useContext(ConfirmContext);
   if (!context) {
      throw new Error("useConfirm must be used within a ConfirmProvider");
   }
   return context.confirm;
};
