import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/App.css";
import { ReactNode } from "react";
import ToastProvider from "@/components/providers/ToastProvider";

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["100", "200", "300", "400"],
});

export const metadata: Metadata = {
   title: "KlikNBuy",
   description: "Sebuah toko online yang menyediakan berbagai keperluan",
   icons: {
      icon: "/vercel.svg",
   },
};

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en">
         <body
            className={`${poppins.className} antialiased container mx-auto px-4 md:px-0 text-dark-200 bg-light-200`}
         >
            <ToastProvider>{children}</ToastProvider>
         </body>
      </html>
   );
}
