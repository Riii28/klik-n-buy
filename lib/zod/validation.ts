// lib/zod/validation.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .email("Email tidak valid")
    .min(5, "Email terlalu pendek")
    .max(100, "Email terlalu panjang"),
  password: z.string()
    .min(8, "Password minimal 8 karakter")
});

export const registerSchema = z.object({
  username: z.string()
    .min(3, "Username minimal 3 karakter")
    .max(50, "Username maksimal 50 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh berisi huruf, angka, dan underscore"),
  email: z.string()
    .email("Email tidak valid")
    .min(5, "Email terlalu pendek")
    .max(100, "Email terlalu panjang"),
  password: z.string()
    .min(8, "Password minimal 8 karakter"),
  // confirmPassword: z.string()
})
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Password dan konfirmasi tidak sama",
//   path: ["confirmPassword"],
// });

export const productSchema = z.object({
   name: z.string().min(1, "Nama produk wajib diisi"),
   description: z.string().min(1, "Deskripsi wajib diisi"),
   price: z.string().regex(/^\d+$/, "Harga harus berupa angka"),
   imageUrl: z.string().url("Masukkan URL gambar yang valid"),
   category: z.string().min(1, "Kategori wajib dipilih"),
   stock: z.string().regex(/^\d+$/, "Stok harus berupa angka"),
});
