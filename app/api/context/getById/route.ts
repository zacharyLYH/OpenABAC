import { getContextById } from '@/abac/helpers/context/get-context';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (id) {
        const result = await getContextById(id);
        return NextResponse.json({ message: result }, { status: 200 });
    } else {
        return NextResponse.json({ message: null }, { status: 204 });
    }
}
