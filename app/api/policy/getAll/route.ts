import { getAllPolicy } from '@/abac/helpers/policy/get-policy';
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await getAllPolicy();
    return NextResponse.json({ message: result }, { status: 200 });
}
