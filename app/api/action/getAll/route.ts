import { getAllActions } from '@/lib/service/action/get-action';
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await getAllActions();
    return NextResponse.json({ message: result }, { status: 200 });
}
