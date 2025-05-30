import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/App.css";
import { ReactNode } from "react";
import Providers from "@/components/providers/AppProviders";

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
   title: "KlikNBuy | Online Shopping Made Easy",
   description:
      "KlikNBuy is your one-stop online store for a wide range of daily essentials, electronics, fashion, and more.",
   icons: {
      icon: "/favicon.svg",
   },
   keywords: [
      "online shopping",
      "KlikNBuy",
      "e-commerce",
      "fashion",
      "electronics",
      "grocery",
   ],
   openGraph: {
      title: "KlikNBuy",
      description: "Your one-stop online store for everything you need.",
      url: process.env.NEXT_PUBLIC_BASE_URL,
      siteName: "KlikNBuy",
      images: [
         {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "KlikNBuy - Online Store",
         },
      ],
      type: "website",
   },
   twitter: {
      card: "summary_large_image",
      title: "KlikNBuy",
      description: "Your one-stop online store for everything you need.",
      images: ["/og-image.png"],
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
