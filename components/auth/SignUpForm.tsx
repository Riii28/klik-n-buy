"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/zod/validation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import fetcher from "@/helpers/fetcher";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Response } from "@/types/response";
import { toast } from "sonner";

export default function SignUpForm() {
   const [loading, setLoading] = useState(false);
   const { push } = useRouter();

   const form = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         username: "",
         email: "",
         password: "",
      },
   });

   async function onSubmit(values: z.infer<typeof registerSchema>) {
      setLoading(true);
      try {
         const response: Response = await fetcher("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            timeout: 10000,
         });

         if (!response.success) {
            toast.error(response.message);
            return;
         }

         form.reset();
         toast(response.message);
         push("/auth/sign-in");
      } catch (err) {
         if (err instanceof Error) {
            toast.error(err.message);
         }
      } finally {
         setLoading(false);
      }
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 md:max-w-70 z-10"
         >
            <FormField
               control={form.control}
               name="username"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Username</FormLabel>
                     <FormControl>
                        <Input
                           autoComplete="off"
                           placeholder="Your username"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                           autoComplete="off"
                           placeholder="example@email.com"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <Input
                           autoComplete="new-password"
                           type="password"
                           placeholder="••••••"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <p className="text-sm">
               Sudah punya akun?{" "}
               <span
                  onClick={() => signIn()}
                  className="text-blue-800 cursor-pointer"
               >
                  masuk
               </span>
            </p>

            <Button type="submit" className="w-full" disabled={loading}>
               {loading ? "Processing..." : "Register"}
            </Button>
         </form>
      </Form>
   );
}
