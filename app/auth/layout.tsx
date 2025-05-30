import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <main className="min-h-screen flex justify-center items-center">
         <div className="w-full max-w-4xl bg-white rounded-xl shadow-md flex flex-col lg:flex-row overflow-hidden">
            {children}
         </div>
      </main>
   );
}
