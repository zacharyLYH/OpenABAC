import { getActionViaSearch } from '@/abac/helpers/action/get-action';
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await getActionViaSearch();
    return NextResponse.json({ message: result }, { status: 200 });
}
