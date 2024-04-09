import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { getActionIncludingPolicyAndContext } from '@/abac/core-services/action/getAction';

export async function GET(
    req: Request,
    { params }: { params: { actionName: string } },
) {
    try {
        const userId = returnApplicationUserIdViaHeader();
        const response = await getActionIncludingPolicyAndContext(
            params.actionName,
            userId,
        );
        return NextResponse.json(
            { data: response.data, message: response.message ?? '' },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
