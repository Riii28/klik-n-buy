"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { debounce } from "@/helpers/debounce";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import fetcher from "@/helpers/fetcher";
import { toast } from "sonner";
import { Response } from "@/types/response";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({
   className,
   endpoint,
   placeholder,
   renderResult,
}: {
   className?: string;
   endpoint: string;
   placeholder: string;
   renderResult: (data: any[], handleClear: () => void) => ReactNode;
}) {
   const [data, setData] = useState<unknown[] | null>(null);
   const [query, setQuery] = useState<string>("");

   const inputRef = useRef<HTMLInputElement | null>(null);
   const router = useRouter();
   const pathname = usePathname();

   const handleSearch = useCallback(
      debounce(async (searchQuery: string) => {
         if (!searchQuery) {
            setData(null);
            setQuery("");
            const params = new URLSearchParams(window.location.search);
            params.delete("search");
            router.replace(`${pathname}?${params.toString()}`);
            return;
         }

         const loadingId = toast.loading("Searching...");
         setQuery(searchQuery);
         const params = new URLSearchParams(window.location.search);
         params.set("search", searchQuery);
         router.replace(`${pathname}?${params.toString()}`);

         try {
            const response: Response & { data: unknown[] } = await fetcher(
               `${endpoint}/${searchQuery}`,
               {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
               }
            );

            toast.dismiss(loadingId);

            if (!response.success) {
               toast.error(
                  response.message || "Search failed. Please try again."
               );
               setData([]);
            } else {
               setData(response.data);
               if (response.data.length === 0) {
                  toast.info(`No results found for "${searchQuery}"`);
               } else {
                  toast.success(`Found ${response.data.length} results`);
               }
            }
         } catch (err) {
            toast.dismiss(loadingId);
            const message =
               err instanceof Error
                  ? err.message
                  : "Search failed. Please try again.";
            toast.error(message);
            setData([]);
         }
      }, 500),
      [endpoint, pathname, router]
   );

   const handleClear = useCallback(() => {
      setData(null);
      setQuery("");
      if (inputRef.current) {
         inputRef.current.value = "";
      }

      const params = new URLSearchParams(window.location.search);
      params.delete("search");
      router.replace(`${pathname}?${params.toString()}`);
      toast.info("Search cleared");
   }, [pathname, router]);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const initialQuery = params.get("search") || "";

      if (initialQuery && inputRef.current) {
         inputRef.current.value = initialQuery;
         setQuery(initialQuery);
         handleSearch(initialQuery);
      }
   }, [handleSearch]);

   return (
      <div className={cn("relative", className)}>
         <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
         />
         <Input
            ref={inputRef}
            name="query"
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            autoCapitalize="on"
            className="w-full max-w-sm pl-10 rounded-2xl"
            aria-label="Search"
         />
         {data === null
            ? null
            : data.length === 0
            ? null
            : renderResult(data, handleClear)}
      </div>
   );
}
