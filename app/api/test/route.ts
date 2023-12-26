import { db } from "@/lib/database"
import { NextResponse } from "next/server";

interface QueryResult {
    TEST: number; // Adjust the type based on your actual query result
}

export async function GET() {
    const result = await db.query<QueryResult[]>("SELECT 1 + 1 AS TEST");
    return NextResponse.json({ message: result[0].TEST }, { status: 200 });
}