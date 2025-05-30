"use client";

import SearchBar from "@/components/global/SearchBar";
import { truncateText } from "@/helpers/truncate_text";
import { Product } from "@/types/product";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../../ui/table";
import { formatCurrency } from "@/helpers/format_currency";
import DeleteProductButton from "./DeleteProductButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function ProductSearchWrapper() {
   return (
      <SearchBar
         endpoint="/api/admin/products/search"
         placeholder="Search product by name"
         renderResult={(products: Product[], handleClear: () => void) => (
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
                     <TableHeader>
                        <TableRow>
                           <TableHead className="w-[60px]">No</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Description</TableHead>
                           <TableHead>Price</TableHead>
                           <TableHead>Stock</TableHead>
                           <TableHead>Category</TableHead>
                           <TableHead className="whitespace-nowrap">
                              Action
                           </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {products.map((product, i) => (
                           <TableRow key={product.id ?? i}>
                              <TableCell>{i + 1}</TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell title={product.description}>
                                 {truncateText(product.description, 30)}
                              </TableCell>
                              <TableCell>
                                 {formatCurrency(product.price)}
                              </TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>
                                 <DeleteProductButton productID={product.id} />
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>

                  {products.length > 10 && (
                     <p className="pt-4 text-center text-sm text-gray-500">
                        Showing top 10 of {products.length} results
                     </p>
                  )}
               </div>
            </div>
         )}
      />
   );
}
