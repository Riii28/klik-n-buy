"use client";

interface ConfirmDialogProps {
   title?: string;
   message: string;
   onConfirm: () => void;
   onCancel: () => void;
   confirmText: string | undefined;
   cancelText: string | undefined;
}

export default function ConfirmDialog({
   title,
   message,
   onConfirm,
   onCancel,
   confirmText,
   cancelText,
}: ConfirmDialogProps) {
   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
         <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            {title && <h2 className="text-lg sm:text-xl font-bold mb-2">{title}</h2>}
            <p className="mb-8 text-sm sm:text-base break-words">{message}</p>
            <div className="flex flex-col sm:flex-row justify-end gap-x-6 gap-y-4">
               <button
                  onClick={onCancel}
                  className="px-6 py-1.5 cursor-pointer bg-light-400 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
               >
                  {cancelText}
               </button>
               <button
                  onClick={onConfirm}
                  className="px-6 py-1.5 cursor-pointer bg-primary font-semibold text-white rounded-lg hover:bg-primary/80 transition-colors text-sm sm:text-base"
               >
                  {confirmText}
               </button>
            </div>
         </div>
      </div>
   );
}
