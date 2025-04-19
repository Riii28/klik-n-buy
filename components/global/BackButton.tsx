"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function BackButton() {
   const router = useRouter();

   return <button className="" onClick={() => router.back()}>Back</button>;
}
