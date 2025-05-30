"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterFormData, signUpSchema } from "@/lib/zod/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
import { useState } from "react";
import { toast } from "sonner";
import fetcher from "@/helpers/fetcher";
import { Response } from "@/types/response";

export default function SignUp() {
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const form = useForm<RegisterFormData>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         username: "",
         email: "",
         password: "",
         confirmPassword: "",
      },
   });

   const onSubmit = async (values: RegisterFormData) => {
      try {
         setLoading(false)
         const loadingId = toast.loading("Processing...");

         const response: Response = await fetcher("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
         });

         toast.dismiss(loadingId);

         if (!response.success) {
            toast.error(response.message);
            return;
         }

         form.reset();
         toast(response.message);
         signIn();
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
                  name="username"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              className="w-full bg-white h-10.5 px-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
                              autoComplete="off"
                              placeholder="Enter your username"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage className="text-xs" />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              className="w-full bg-white h-10.5 px-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
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
                                 autoComplete="off"
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
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute cursor-pointer right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                     aria-label={
                        showPassword ? "Hide password" : "Show password"
                     }
                  >
                     <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                     />
                  </button>
               </div>

               <div className="relative">
                  <FormField
                     control={form.control}
                     name="confirmPassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 className="w-full bg-white cursor-pointer h-10.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-10"
                                 autoComplete="new-password"
                                 type={
                                    showConfirmPassword ? "text" : "password"
                                 }
                                 placeholder="Confirm your password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage className="text-xs" />
                        </FormItem>
                     )}
                  />
                  <button
                     type="button"
                     onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                     }
                     className="absolute cursor-pointer right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                     aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                     }
                  >
                     <FontAwesomeIcon
                        icon={showConfirmPassword ? faEye : faEyeSlash}
                     />
                  </button>
               </div>

               <button
                  type="submit"
                  className="w-full cursor-pointer px-3 py-2.5 text-sm bg-primary rounded-xl font-semibold text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={loading}
               >
                  {loading ? "Loading..." : "Create Account"}
               </button>
            </div>

            <p className="text-xs text-dark-300">
               Already have an account?{" "}
               <button
                  onClick={() => signIn()}
                  type="button"
                  className="text-primary cursor-pointer hover:underline font-medium"
               >
                  Sign in
               </button>
            </p>
         </form>
      </Form>
   );
}
