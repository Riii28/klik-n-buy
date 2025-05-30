"use client";

import SearchBar from "@/components/global/SearchBar";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function UserSearchWrapper() {
   return (
      <SearchBar
         endpoint="/api/admin/users/search"
         placeholder="Search user by email"
         renderResult={(users: UserData[], handleClear: () => void) => (
            <div className="absolute w-full z-10 bg-muted border rounded-lg shadow-md mt-4 overflow-x-auto scrollbar-hide">
               <div className="flex items-center justify-between p-4">
                  <h1 className="font-semibold text-xl">Search Results</h1>
                  <button
                     onClick={handleClear}
                     className="hover:text-dark-300 duration-200 cursor-pointer"
                  >
                     <FontAwesomeIcon icon={faClose} size="xl" />
                  </button>
               </div>

               <div className="min-w-[800px] md:min-w-full p-4 md:p-6">
                  <Table>
                     <TableHeader className="font-bold">
                        <TableRow>
                           <TableHead className="min-w-[60px]">No</TableHead>
                           <TableHead className="min-w-[150px]">Name</TableHead>
                           <TableHead className="min-w-[200px]">
                              Email
                           </TableHead>
                           <TableHead className="min-w-[100px]">Role</TableHead>
                           <TableHead className="min-w-[100px]">
                              Action
                           </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {users.slice(0, 10).map((user, i) => (
                           <TableRow key={user.id}>
                              <TableCell>{i + 1}</TableCell>
                              <TableCell>{user.username}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.role}</TableCell>
                              <TableCell>
                                 <Link
                                    className="text-blue-700 underline"
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
                     <p className="pt-4 text-center text-sm text-dark-300">
                        Showing 10 of {users.length} users
                     </p>
                  )}
               </div>
            </div>
         )}
      />
   );
}
