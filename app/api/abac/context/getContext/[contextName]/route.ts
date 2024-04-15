import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { getContextIncludingActions } from '@/abac/core-services/context/getContext';

export async function GET(
    req: Request,
    { params }: { params: { contextName: string } },
) {
    try {
        const response = await getContextIncludingActions(params.contextName);
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (e) {
        return catchStandardError(e);
    }
}
