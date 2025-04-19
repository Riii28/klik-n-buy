import getAllUsers from "@/helpers/get_all_users";
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

export default async function UserTable() {
   try {
      const data: UserData[] = (await getAllUsers()) as UserData[];

      if (!data || data.length === 0) {
         throw new Error("Tidak ada pengguna");
      }

      return (
         <Table className="mt-6">
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
               {data.map((user, i) => (
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
