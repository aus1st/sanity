import { cartTable, db } from "@/app/lib/drizzle";
import { ICart } from "@/app/lib/product";
import { eq } from "drizzle-orm";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuid} from 'uuid';

// get data from db by providing user_id saved in cookie

export async function GET(requet: NextRequest) {
  const req = new URL(requet.url);
  if (req.searchParams.has("user_id")) {
    try {
      const res = await db
        .select()
        .from(cartTable)
        .where(eq(cartTable.user_id, req.searchParams.get('user_id') as string));
      return NextResponse.json({ res });
    } catch (error) {
      return NextResponse.json({ Error: "something went wrong" });
    }
  } else {
    return NextResponse.json({ message: "User is ID is missing" });
  }
}


export async function POST(requet: NextRequest) {
    
  const req = await requet.json();
  const {product_id,quantity,price}:ICart = req;
console.log(req)
//set userID
if(!cookies().get('user_id')?.value) {

    cookies().set("user_id",uuid().toString())
} else {

const user_id  = cookies().get('user_id')?.value;


  if (user_id || product_id) {
    try {
      const res = await db.insert(cartTable).values({
        user_id: user_id,
        product_id: product_id,
        quantity: quantity,
        price: price
      }).returning();
    
      return NextResponse.json({ res });
    } catch (error) {
      return NextResponse.json({ Error: "something went wrong" });
    }
  } else {
    return NextResponse.json({ message: "Required fields are missing" });
  }
}
}