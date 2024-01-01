import { createUser } from '@/lib/service/create-user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    //TODO: ADD JWT
    const body = await request.json();
    const { jsonCol, applicationUserId } = body;
    await createUser({
        jsonCol: jsonCol,
        applicationUserId: applicationUserId,
    });
    return NextResponse.json({ message: 'Success!' }, { status: 200 });
}
