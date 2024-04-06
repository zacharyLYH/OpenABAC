import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { policyActionMapping } from '@/abac/core-services/edit/PolicyActionMapping';

export async function PUT(request: Request) {
    try {
        const req = await request.json();
        const userId = returnApplicationUserIdViaHeader();
        const response = await policyActionMapping(
            userId,
            req.policyName,
            req.actionNames,
        );
        return NextResponse.json(
            { actions: response.data, success: response.success },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
