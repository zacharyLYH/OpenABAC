import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { updateActionObject } from '@/abac/core-services/action/updateAction';

export async function PUT(
    req: Request,
    { params }: { params: { actionName: string } },
) {
    try {
        const res = await req.json();
        if (!res.actionName || !res.actionDescription) {
            return NextResponse.json(
                {
                    dmessage:
                        'Must provide actionName and actionDescription to update to.',
                },
                { status: 400 },
            );
        }
        const response = await updateActionObject(
            params.actionName,
            res.actionName,
            res.actionDescription,
        );
        return NextResponse.json(
            {
                success: response.success,
                data: response.data,
                message: response.message,
            },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
