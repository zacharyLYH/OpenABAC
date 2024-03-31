import { NextResponse } from 'next/server';
import {
    catchStandardError,
    returnApplicationUserIdViaHeader,
} from '@/app/api/_utils';
import { getAllAllowedActionsProvidedApplicationUserId } from '@/abac/core-services/authorize/getAllActions';

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
