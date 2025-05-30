import { z } from "zod";

export const signInSchema = z.object({
   email: z
      .string()
      .email("Invalid email address")
      .min(5, "Email is too short")
      .max(100, "Email is too long"),
   password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z
   .object({
      username: z
         .string()
         .min(3, "Username must be at least 3 characters")
         .max(50, "Username must not exceed 50 characters")
         .regex(
            /^[a-zA-Z0-9\s]+$/,
            "Username can only contain letters, numbers, and spaces"
         )
         .refine((val) => val.trim().length >= 3, {
            message: "Username must contain at least 3 non-space characters",
         }),
      email: z
         .string()
         .email("Invalid email address")
         .min(5, "Email is too short")
         .max(100, "Email is too long"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
   });

export const productSchema = z.object({
   name: z.string().min(1, "Product name is required"),
   description: z.string().min(1, "Description is required"),
   price: z.string().regex(/^\d+$/, "Price must be a valid number"),
   imageUrl: z.string().url("Please enter a valid image URL"),
   category: z.string().min(1, "Category must be selected"),
   stock: z.string().regex(/^\d+$/, "Stock must be a valid number"),
});

export type LoginFormData = z.infer<typeof signInSchema>;
export type RegisterFormData = z.infer<typeof signUpSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
