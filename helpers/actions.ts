// // app/actions.js
// 'use server';

// import { z } from "zod";
// import { redirect } from "next/navigation";
// import { toast } from "sonner";

// // Schema yang sama seperti yang Anda gunakan sebelumnya
// const registerSchema = z.object({
//   username: z.string().min(3, "Username minimal 3 karakter"),
//   email: z.string().email("Email tidak valid"),
//   password: z.string().min(6, "Password minimal 6 karakter")
// });

// export async function registerUser(prevState, formData) {
//   // Validasi data
//   const rawData = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password')
//   };
  
//   try {
//     // Validasi
//     const validData = registerSchema.parse(rawData);
    
//     // Logika yang sebelumnya ada di API route
//     // contoh: await prisma.user.create({ data: validData })
    
//     // Simulasi proses database
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     // Cek apakah email sudah terdaftar (contoh logic)
//     if (validData.email === "test@example.com") {
//       return { 
//         success: false, 
//         message: "Email sudah terdaftar" 
//       };
//     }
    
//     return {
//       success: true,
//       message: "Registrasi berhasil!"
//     };
    
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       // Extract validation errors
//       const fieldErrors = {};
//       error.errors.forEach(err => {
//         const path = err.path[0];
//         fieldErrors[path] = err.message;
//       });
      
//       return { 
//         success: false, 
//         message: "Validasi gagal", 
//         errors: fieldErrors 
//       };
//     }
    
//     return {
//       success: false,
//       message: error.message || "Terjadi kesalahan saat pendaftaran"
//     };
//   }
// }