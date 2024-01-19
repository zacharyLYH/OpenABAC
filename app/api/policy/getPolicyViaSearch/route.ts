import { getPolicyViaSearch } from '@/lib/service/policy/get-policy';
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await getPolicyViaSearch();
    return NextResponse.json({ message: result }, { status: 200 });
}
