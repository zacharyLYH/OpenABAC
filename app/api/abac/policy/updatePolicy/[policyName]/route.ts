import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { updatePolicyObject } from '@/abac/core-services/policy/updatePolicy';

export async function PUT(
    req: Request,
    { params }: { params: { policyName: string } },
) {
    try {
        const body = await req.json();
        if (!body.policyName || !body.policyDescription || !body.allow) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing one or more required body objects.',
                },
                { status: 400 },
            );
        }
        const userId = returnApplicationUserIdViaHeader();
        const response = await updatePolicyObject(
            userId,
            params.policyName,
            body.policyName,
            body.policyDescription,
            body.allow,
        );
        return NextResponse.json(
            {
                data: response.data,
                message: response.message ?? '',
                success: response.success,
            },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
