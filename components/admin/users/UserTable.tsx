export const dynamic = "force-dynamic";

import getAllUsers from "@/lib/firebase/service/get_all_users";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../../ui/table";
import { UserData } from "@/types/user";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { adminDb } from "@/lib/firebase/admin";
import Pagination from "./Pagination";

export default async function UserTable({
   className,
   page,
}: {
   className?: string;
   page?: string;
}) {
   try {
      const currentPage = parseInt(page ?? "1");
      const limit = 10;
      const users: UserData[] = await getAllUsers(currentPage, limit);
      if (!users || users.length === 0) {
         throw new Error("Tidak ada pengguna");
      }

      const totalUsersSnap = await adminDb.collection("users").count().get();
      const totalUsers = totalUsersSnap.data().count;
      const totalPages = Math.ceil(totalUsers / limit);
      return (
         <>
            <Table className={className}>
               <TableCaption>Daftar pengguna.</TableCaption>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[100px]">No</TableHead>
                     <TableHead>Nama</TableHead>
                     <TableHead>Email</TableHead>
                     <TableHead>Role</TableHead>
                     <TableHead>Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {users.map((user, i) => (
                     <TableRow key={user.id}>
                        <TableCell className="font-medium">{i + 1}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                           <Link
                              className="text-blue-800 underline"
                              href={`/admin/users/${user.id}`}
                           >
                              Detail
                           </Link>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            <div className="flex justify-center pt-4">
               <Pagination totalPages={totalPages} />
            </div>
         </>
      );
   } catch (err) {
      const message: string =
         err instanceof Error ? err.message : "Unknown error";
      return (
         <div className="text-destructive text-center mt-20">
            <h1 className="text-lg">Terjadi kesalahan saat mengambil data</h1>
            <p>{message}</p>
         </div>
      );
   }
}
