"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zod/validation";
import { z } from "zod";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
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
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInForm() {
   const [loading, setLoading] = useState(false);
   const { push } = useRouter();

   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   async function handleSignInWithGoogle() {
      setLoading(true);
      try {
         const response = await signIn("google", { callbackUrl: "/" });
         if (response?.error) {
            toast.error("Gagal masuk dengan Google.");
            return;
         }

         await fetch("/api/admin/users/revalidate", { method: "POST" }).catch(
            () => null
         );
      } catch {
         toast.error("Terjadi kesalahan saat masuk dengan Google.");
      } finally {
         setLoading(false);
      }
   }

   async function onSubmit(values: z.infer<typeof loginSchema>) {
      setLoading(true);
      try {
         const response = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
         });

         if (!response?.ok) {
            toast.error(
               response?.error ||
                  "Autentikasi gagal. Periksa email dan password."
            );
            return;
         }
         await fetch("/api/admin/users/revalidate", { method: "POST" }).catch(
            () => null
         );
         push("/");
      } catch {
         toast.error("Terjadi kesalahan saat masuk. Silakan coba lagi.");
      } finally {
         setLoading(false);
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

            <Button type="submit" className="w-full" disabled={loading}>
               {loading ? "Processing..." : "Submit"}
            </Button>

            <p className="text-sm">
               Belum punya akun?{" "}
               <Link className="text-blue-800" href="/auth/sign-up">
                  buat akun
               </Link>
            </p>

            <div className="text-center py-4 flex flex-col gap-y-4 border-t-1">
               <p className="text-sm">Atau masuk dengan</p>
               <Button
                  type="button"
                  onClick={handleSignInWithGoogle}
                  variant="outline"
                  disabled={loading}
               >
                  <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                  <span>Google</span>
               </Button>
            </div>
         </form>
      </Form>
   );
}
