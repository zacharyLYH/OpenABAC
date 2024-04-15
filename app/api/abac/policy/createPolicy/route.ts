import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { createPolicyObject } from '@/abac/core-services/policy/createPolicy';

export async function POST(request: Request) {
    try {
        const req = await request.json();
        if (!req.listOfPolicies) {
            return NextResponse.json(
                {
                    data: 'This endpoint requires listOfPolicies',
                    success: false,
                },
                { status: 400 },
            );
        }
        const response = await createPolicyObject(req.listOfPolicies);
        return NextResponse.json(
            { success: response.success, message: response.message },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
