import { getAllContext } from '@/abac/helpers/context/get-context';
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await getAllContext();
    return NextResponse.json({ message: result }, { status: 200 });
}
