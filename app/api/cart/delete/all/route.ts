import { authOptions } from "@/auth";
import { deleteCartItemById } from "@/lib/firebase/service/delete_cart_item_by_id";
import { deleteCartItemByProductId } from "@/lib/firebase/service/delete_cart_item_by_product_id";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
   try {
      const session = await getServerSession(authOptions);

      if (!session) {
         return NextResponse.json(
            {
               success: false,
               message: "Sign In required to perform this action.",
            },
            { status: 401 }
         );
      }

      const params = request.nextUrl.searchParams;
      const isByProductId = params.get("by");

      const { ids } = (await request.json()) as { ids: string[] };

      if (!ids || ids.length === 0) {
         return NextResponse.json(
            {
               success: false,
               message: "No item IDs provided for deletion.",
            },
            { status: 400 }
         );
      }

      if (isByProductId) {
         deleteCartItemByProductId(ids);
      } else {
         deleteCartItemById(ids);
      }

      return NextResponse.json(
         {
            success: true,
            message: "Selected cart items were successfully deleted.",
            data: {
               count: ids.length,
            },
         },
         { status: 200 }
      );
   } catch (err) {
      return NextResponse.json(
         {
            success: false,
            message: "Internal server error: Unable to process your request",
         },
         { status: 500 }
      );
   }
}
