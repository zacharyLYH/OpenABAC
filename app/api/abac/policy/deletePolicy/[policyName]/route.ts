import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { deletePolicyObject } from '@/abac/core-services/policy/deletePolicy';

export async function DELETE(
    req: Request,
    { params }: { params: { policyName: string } },
) {
    try {
        const applicationUserId = returnApplicationUserIdViaHeader();
        const response = await deletePolicyObject(
            params.policyName,
            applicationUserId,
        );
        return NextResponse.json(
            { success: response.success, message: response.message  },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
