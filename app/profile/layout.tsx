import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-0 mt-6">
         {children}
      </main>
   );
}
