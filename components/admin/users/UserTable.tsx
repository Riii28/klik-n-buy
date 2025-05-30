import getAllUsers from "@/lib/firebase/service/get_users";
import {
   Table,
   TableBody,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableCaption,
   TableRow,
} from "../../ui/table";
import { UserData } from "@/types/user";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function UserTable({
   className,
   totalUsers,
   page,
   LIMIT,
}: {
   className?: string;
   page?: string;
   LIMIT: number;
   totalUsers: number;
}) {
   try {
      const currentPage = parseInt(page ?? "1");
      const users: UserData[] = (await getAllUsers(
         currentPage,
         LIMIT
      )) as UserData[];

      if (!users || users.length === 0) {
         throw new Error("Tidak ada pengguna");
      }

      return (
         <div className={cn("w-full overflow-x-auto", className)}>
            <Table className="min-w-[800px]">
               <TableCaption className="text-muted-foreground text-sm mt-2">
                  Displaying {users.length} of {totalUsers} total customers
               </TableCaption>
               <TableHeader className="font-bold">
                  <TableRow>
                     <TableHead className="w-[100px]">No</TableHead>
                     <TableHead>Name</TableHead>
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
                              href={`/admin/customers/${user.id}`}
                           >
                              Detail
                           </Link>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
               <TableFooter>
                  <TableRow className="font-semibold">
                     <TableCell colSpan={4}>Total:</TableCell>
                     <TableCell>{totalUsers} customers</TableCell>
                  </TableRow>
               </TableFooter>
            </Table>
         </div>
      );
   } catch (err) {
      const message: string =
         err instanceof Error ? err.message : "Unknown error occured";
      return (
         <div className="text-destructive text-center mt-20">
            <h1 className="text-lg">Terjadi kesalahan saat mengambil data</h1>
            <p>{message}</p>
         </div>
      );
   }
}
