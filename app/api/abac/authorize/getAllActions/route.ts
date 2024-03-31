import { NextResponse } from 'next/server';
import { getAllAllowedActionsProvidedApplicationUserId } from '@/abac/core-services/authorize/getAllActions/route';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';

export async function GET() {
    try {
        const userId = returnApplicationUserIdViaHeader();
        const response =
            await getAllAllowedActionsProvidedApplicationUserId(userId);
        return NextResponse.json(
            { actions: response.actions },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
