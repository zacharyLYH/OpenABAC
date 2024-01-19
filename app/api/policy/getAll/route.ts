import { getAllPolicy } from '@/lib/service/policy/get-policy';
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await getAllPolicy();
    return NextResponse.json({ message: result }, { status: 200 });
}
