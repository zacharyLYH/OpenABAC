import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { updateUserObject } from '@/abac/core-services/user/updateUser';

export async function PUT(request: Request) {
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
        const userId = returnApplicationUserIdViaHeader();
        const response = await updateUserObject(
            userId,
            req.jsonCol,
            req.applicationUserID,
        );
        return NextResponse.json(
            { data: response.data, success: response.success },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
