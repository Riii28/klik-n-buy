"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { productSchema } from "@/lib/zod/validation";
import { Response } from "@/types/response";
import fetcher from "@/helpers/fetcher";

export default function AddProductForm() {
   const [loading, setLoading] = useState(false);
   const { push } = useRouter();

   const form = useForm<z.infer<typeof productSchema>>({
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

   async function onSubmit(values: z.infer<typeof productSchema>) {
      setLoading(true);
      try {
         const response: Response = await fetcher("/api/admin/products/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            timeout: 10000,
         });

         if (!response.success) {
            toast.error(response.message)
            return
         }

         toast.success(response.message);
         push("/admin/products");
      } catch (err) {
         toast.error("Gagal menambahkan produk. Silakan coba lagi.");
      } finally {
         setLoading(false);
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex gap-4">
               <div className="flex-1">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Nama Produk</FormLabel>
                           <FormControl>
                              <Input placeholder="Nama produk" {...field} />
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
                           <FormLabel>Deskripsi</FormLabel>
                           <FormControl>
                              <Textarea
                                 className="h-24 resize-none w-40"
                                 placeholder="Deskripsi produk"
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
                           <FormLabel>Harga</FormLabel>
                           <FormControl>
                              <Input
                                 min={0}
                                 type="number"
                                 placeholder="100000"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <div className="flex-1">
                  <FormField
                     control={form.control}
                     name="imageUrl"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>URL Gambar</FormLabel>
                           <FormControl>
                              <Input
                                 type="url"
                                 placeholder="https://..."
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
                           <FormLabel>Kategori</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="elektronik">
                                    Elektronik
                                 </SelectItem>
                                 <SelectItem value="fashion">
                                    Fashion
                                 </SelectItem>
                                 <SelectItem value="makanan">
                                    Makanan
                                 </SelectItem>
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
                           <FormLabel>Stok</FormLabel>
                           <FormControl>
                              <Input
                                 min={1}
                                 type="number"
                                 placeholder="10"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
               {loading ? "Menambahkan..." : "Tambah Produk"}
            </Button>
         </form>
      </Form>
   );
}
