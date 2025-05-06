"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { debounce } from "@/helpers/debounce";
import {
   ReactNode,
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import fetcher from "@/helpers/fetcher";
import { toast } from "sonner";
import { Response } from "@/types/response";

export default function SearchBar({
   className,
   endpoint,
   placeholder,
   renderResult,
}: {
   className?: string;
   endpoint: string;
   placeholder: string;
   renderResult: (data: any[]) => ReactNode;
}) {
   const [data, setData] = useState<unknown[] | null>(null);
   const [loading, setLoading] = useState(false);

   const inputRef = useRef<HTMLInputElement | null>(null);
   const router = useRouter();
   const pathname = usePathname();

   const handleSearch = useMemo(
      () =>
         debounce(async (query: string) => {
            try {
               setLoading(true);

               const params = new URLSearchParams(window.location.search);
               if (query) {
                  params.set("search", query);
                  const response: Response & { data: unknown[] } =
                     await fetcher(`${endpoint}/${query}`, { method: "GET" });

                  if (!response.success) {
                     toast.error(response.message);
                     return;
                  }

                  setData(response.data);
               } else {
                  params.delete("search");
                  setData(null);
               }

               router.replace(`${pathname}?${params.toString()}`);
            } catch (err) {
               const message =
                  err instanceof Error ? err.message : "Unknown error occurred";
               toast.error(message);
            } finally {
               setLoading(false);
            }
         }, 500),
      [endpoint, pathname, router]
   );

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const initialQuery = params.get("search") || "";
      if (initialQuery && inputRef.current) {
         inputRef.current.value = initialQuery;
         handleSearch(initialQuery);
      }
   }, [handleSearch]);

   return (
      <div className={cn("relative", className)}>
         <Input
            ref={inputRef}
            name="query"
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            className="w-full max-w-sm"
         />

         {loading ? (
            <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
         ) : data === null ? null : data.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
               Tidak ada hasil ditemukan.
            </p>
         ) : (
            
            renderResult(data)
         )}
      </div>
   );
}
