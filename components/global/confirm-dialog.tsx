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
      <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg p-6 w-96 max-w-md shadow-xl">
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            <p className="mb-6">{message}</p>
            <div className="flex justify-end space-x-2">
               <button
                  onClick={onCancel}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
               >
                  {cancelText}
               </button>
               <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
               >
                  {confirmText}
               </button>
            </div>
         </div>
      </div>
   );
}