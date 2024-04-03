import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { getEntireUserObjProvidedApplicaionUserId } from '@/abac/core-services/user/getUser';
import { getPolicyIncludingActions } from '@/abac/core-services/policy/getPolicy';

export async function GET(
    req: Request,
    { params }: { params: { policyName: string } },
) {
    try {
        const response = await getPolicyIncludingActions(params.policyName);
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (e) {
        return catchStandardError(e);
    }
}
