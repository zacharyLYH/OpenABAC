import { db } from '@/lib/database';
import { Query } from '@/lib/interface';
import { NextResponse } from 'next/server';

interface QueryResult {
    TEST: number; // Adjust the type based on your actual query result
}

export async function GET() {
    if (process.env.USE_PRODUCTION_DB === 'true') {
        const query: Query = {
            sql: `SELECT 1 AS TEST`,
            params: [],
        };
        const result = await db.query<QueryResult[]>(query);
        return NextResponse.json({ message: result[0].TEST }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Not using DB' }, { status: 200 });
    }
}
