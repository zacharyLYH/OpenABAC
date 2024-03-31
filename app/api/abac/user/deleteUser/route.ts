import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { deleteUserObject } from '@/abac/core-services/user/deleteUser';

export async function DELETE(request: Request) {
    try {
        const userId = returnApplicationUserIdViaHeader();
        const response = await deleteUserObject(userId);
        return NextResponse.json(
            { data: response.data, success: response.success },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
