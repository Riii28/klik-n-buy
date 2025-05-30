"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

import { ProductFormData, productSchema } from "@/lib/zod/validation";
import { Response } from "@/types/response";
import fetcher from "@/helpers/fetcher";

const categories = ["Electronic", "Food & Drink", "Fashion"];

export default function AddProductForm() {
   const [loading, setLoading] = useState(false);
   const { back } = useRouter();

   const form = useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: "",
         description: "",
         price: "",
         imageUrl: "",
         category: "",
         stock: "",
      },
   });

   const onSubmit = async (values: ProductFormData) => {
      try {
         setLoading(true);
         const loadingId = toast.loading("Processing...");

         const response: Response = await fetcher("/api/admin/products/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            timeout: 10000,
         });

         toast.dismiss(loadingId);

         if (!response.success) {
            toast.error(response.message);
            return;
         }

         toast.success(response.message);
         back();
      } catch (err) {
         if (err instanceof Error) {
            toast.error(err.message);
            return;
         }
         throw new Error("Something went wrong. Please try again later.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full max-w-4xl mx-auto"
         >
            <div className="flex flex-col md:flex-row gap-4">
               <div className="flex-1 flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Product Name</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Enter product name"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder="Enter product description"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="price"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Price (IDR)</FormLabel>
                           <FormControl>
                              <Input
                                 min={0}
                                 type="number"
                                 placeholder="e.g., 100000"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <div className="flex-1 flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="imageUrl"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Image URL</FormLabel>
                           <FormControl>
                              <Input
                                 type="url"
                                 placeholder="https://example.com/image.jpg"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="category"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Category</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {categories.map((item) => (
                                    <SelectItem
                                       key={item}
                                       value={item.toLowerCase()}
                                    >
                                       {item}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="stock"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Stock Quantity</FormLabel>
                           <FormControl>
                              <Input
                                 min={1}
                                 type="number"
                                 placeholder="e.g., 10"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            </div>

            <Button type="submit" className="w-full mt-6" disabled={loading}>
               {loading ? "Adding Product..." : "Add Product"}
            </Button>
         </form>
      </Form>
   );
}
