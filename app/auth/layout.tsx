import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-8 shadow-md rounded-md min-w-70 max-w-80 w-full">
         {children}
      </main>
   );
}
