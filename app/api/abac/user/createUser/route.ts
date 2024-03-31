import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { createUserObject } from '@/abac/core-services/user/createUser/route';

export async function POST(request: Request) {
    try {
        const res = await request.json();
        if (!res.jsonCol || !res.applicationUserID) {
            return NextResponse.json(
                {
                    data: 'This endpoint requires jsonCol and applicationUserId',
                    success: false,
                },
                { status: 400 },
            );
        }
        const userId = returnApplicationUserIdViaHeader();
        const response = await createUserObject(
            res.applicationUserID,
            res.jsonCol,
        );
        return NextResponse.json(
            { data: response.data, success: response.success },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
