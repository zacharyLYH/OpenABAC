import { getUserViaSearch } from '@/abac/helpers/user/get-user';
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await getUserViaSearch();
    return NextResponse.json({ message: result }, { status: 200 });
}
