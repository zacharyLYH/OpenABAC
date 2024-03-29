import { getAllUsers } from '@/abac/helpers/user/get-user';
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await getAllUsers();
    return NextResponse.json({ message: result }, { status: 200 });
}
