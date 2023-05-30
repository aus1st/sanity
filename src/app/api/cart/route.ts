import { cardTable, db } from "@/app/lib/drizzle";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await db.select().from(cardTable);
        return NextResponse.json({res});
    } catch (error) {
        console.log(error)
    }
   
}