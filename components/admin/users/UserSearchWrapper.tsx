"use client";

import SearchBar from "@/components/global/search-bar";
import { UserData } from "@/types/user";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../../ui/table";
import Link from "next/link";

export default function UserSearchWrapper() {
   return (
      <SearchBar
         endpoint="/api/admin/users/search"
         placeholder="Search user by email"
         renderResult={(users: UserData[]) => (
            <div className="absolute w-full shadow-md z-10 bg-muted p-4 mt-4 rounded-lg md:p-6 border-1">
               <Table>
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
                     {users.slice(0, 10).map((user, i) => (
                        <TableRow key={user.id}>
                           <TableCell className="font-medium">
                              {i + 1}
                           </TableCell>
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
               {users.length > 10 && (
                  <p className="p-4 text-center text-dark-300 text-sm">
                     10 of {users.length} users shown
                  </p>
               )}
            </div>
         )}
      />
   );
}
