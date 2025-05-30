import { getBanners } from "@/lib/firebase/service/get_banners";
import { Banner } from "@/types/banner";
import BannerColumn from "./BannerColumn";

export default async function Banners() {
   try {
      const banners: Banner[] = (await getBanners()) as Banner[];

      const grouped: Record<"left" | "middle" | "right", Banner[]> = {
         left: [],
         middle: [],
         right: [],
      };

      for (const banner of banners) {
         if (grouped[banner.position]) {
            grouped[banner.position].push(banner);
         }
      }

      return (
         <div className="flex flex-col md:flex-row gap-3.5 h-auto md:h-64">
            <div className="flex-1">
               <BannerColumn banners={grouped.left} variant="square" />
            </div>
            <div className="flex-[2]">
               <BannerColumn banners={grouped.middle} variant="video" />
            </div>
            <div className="flex-1">
               <BannerColumn banners={grouped.right} variant="square" />
            </div>
         </div>
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <div className="h-64 w-full flex justify-center items-center border-1 border-light-400 rounded-lg">
            <p className="text-sm text-center text-dark-300">{message}</p>
         </div>
      );
   }
}
