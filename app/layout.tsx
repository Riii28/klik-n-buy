import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/App.css";
import { ReactNode } from "react";
import Providers from "@/components/providers/AppProviders";

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
            className={`${poppins.className} antialiased text-dark-200 bg-light-200`}
         >
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
