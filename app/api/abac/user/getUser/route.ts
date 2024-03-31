import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { getEntireUserObjProvidedApplicaionUserId } from '@/abac/core-services/user/getUser/route';

export async function GET() {
    try {
        const userId = returnApplicationUserIdViaHeader();
        const response = await getEntireUserObjProvidedApplicaionUserId(userId);
        return NextResponse.json(
            { data: response.data, success: response.success },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
