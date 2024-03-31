import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { authorizeActionNameGivenApplicationUserId } from '@/abac/core-services/authorize/[actionName]';

export async function GET(
    req: Request,
    { params }: { params: { actionName: string } },
) {
    try {
        const userId = returnApplicationUserIdViaHeader();
        const response = await authorizeActionNameGivenApplicationUserId(
            userId,
            params.actionName,
        );
        if (response.authorized === false) {
            return NextResponse.json(
                { message: response.message },
                { status: response.statusCode },
            );
        }
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (e) {
        return catchStandardError(e);
    }
}
