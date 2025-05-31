"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, signInSchema } from "@/lib/zod/validation";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Divider from "./Divider";
import Google from "./Google";

export default function SignIn() {
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const form = useForm<LoginFormData>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async (values: LoginFormData) => {
      try {
         setLoading(true)
         const loadingId = toast.loading('Processing...')

         const response = await signIn("credentials", {
            redirect: true,
            email: values.email,
            callbackUrl: '/shop',
            password: values.password,
         });

         toast.dismiss(loadingId)

         if (response?.error) {
            const message =
               response?.error ||
               "Authentication failed. Please check your email and password.";
            toast.error(message);
            return;
         }
      } catch (err) {
         if (err instanceof Error) {
            toast.error(err.message);
            return;
         }
         throw new Error("Something went wrong. Please try again later.");
      } finally {
         setLoading(false)
      }
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 md:gap-y-6 h-full"
         >
            <div className="space-y-4 md:space-y-6 flex-1">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              className="w-full bg-white h-10.5 px-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-10 cursor-pointer"
                              autoComplete="off"
                              placeholder="Enter your email address"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage className="text-xs" />
                     </FormItem>
                  )}
               />

               <div className="relative">
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 className="w-full bg-white cursor-pointer h-10.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-10"
                                 autoComplete="current-password"
                                 type={showPassword ? "text" : "password"}
                                 placeholder="Enter your password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage className="text-xs" />
                        </FormItem>
                     )}
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword((prev) => !prev)}
                     className="absolute cursor-pointer right-3 top-5.5 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                     aria-label={
                        showPassword ? "Hide password" : "Show password"
                     }
                  >
                     <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}/>
                  </button>
               </div>

               <button
                  disabled={loading}
                  type="submit"
                  className="w-full cursor-pointer px-3 py-2.5 text-sm bg-primary rounded-xl font-semibold text-light-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                  {loading ? "Signing in..." : "Sign In"}
               </button>

               <Divider title="Or continue with" />
               <Google loading={loading} setLoading={setLoading} />
            </div>

            <p className="text-xs text-dark-300">
               Don't have an account?{" "}
               <Link
                  href={"/auth/sign-up"}
                  type="button"
                  className="text-primary cursor-pointer hover:underline font-medium"
               >
                  Create an account
               </Link>
            </p>
         </form>
      </Form>
   );
}
