"use client";

import { Banner } from "@/types/banner";
import { useEffect, useState } from "react";
import Image from "next/image";

interface BannerColumnProps {
   banners: Banner[];
   variant?: "square" | "video";
   interval?: number;
}

export default function BannerColumn({
   banners,
   variant = "square",
   interval = 10,
}: BannerColumnProps) {
   if (!banners.length) {
      return (
         <div className="flex justify-center items-center h-full w-full">
            <p className="text-sm text-dark-300 text-center">
               No banners available at the moment
            </p>
         </div>
      );
   }

   const [currentIndex, setCurrentIndex] = useState(0);

   const aspect = variant === "square" ? "aspect-square" : "aspect-video";

   useEffect(() => {
      if (banners.length <= 1) return;

      const timer = setInterval(() => {
         setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, interval * 1000);

      return () => clearInterval(timer);
   }, [banners.length, interval]);

   const currentBanner = banners
      .slice()
      .sort((a, b) => a.priority - b.priority)[currentIndex];

   return (
      <Image
         className={`rounded-lg object-cover border-1 w-full h-full ${aspect}`}
         key={currentBanner.id}
         src={currentBanner.imageUrl}
         alt={currentBanner.title}
         width={300}
         height={300}
      />
   );
}
