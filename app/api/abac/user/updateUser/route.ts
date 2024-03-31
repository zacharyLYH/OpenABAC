import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { updateUserObject } from '@/abac/core-services/user/updateUser';

export async function PUT(request: Request) {
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
        const response = await updateUserObject(
            userId,
            res.jsonCol,
            res.applicationUserID,
        );
        return NextResponse.json(
            { data: response.data, success: response.success },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
