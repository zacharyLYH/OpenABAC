import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { getPolicyIncludingActions } from '@/abac/core-services/policy/getPolicy';

export async function GET(
    req: Request,
    { params }: { params: { policyName: string } },
) {
    try {
        const userId = returnApplicationUserIdViaHeader();
        const response = await getPolicyIncludingActions(
            params.policyName,
            userId,
        );
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (e) {
        return catchStandardError(e);
    }
}
