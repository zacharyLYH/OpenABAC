import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { getActionIncludingPolicyAndContext } from '@/abac/core-services/action/getAction';

export async function GET(
    req: Request,
    { params }: { params: { actionName: string } },
) {
    try {
        const response = await getActionIncludingPolicyAndContext(
            params.actionName,
        );
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (e) {
        return catchStandardError(e);
    }
}
