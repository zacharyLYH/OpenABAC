import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { createUserObject } from '@/abac/core-services/user/createUser';

export async function POST(request: Request) {
    try {
        const req = await request.json();
        if (!req.jsonCol || !req.applicationUserID) {
            return NextResponse.json(
                {
                    data: 'This endpoint requires jsonCol and applicationUserId',
                    success: false,
                },
                { status: 400 },
            );
        }
        const response = await createUserObject(
            req.applicationUserID,
            req.jsonCol,
        );
        return NextResponse.json(
            { data: response.data, success: response.success },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
