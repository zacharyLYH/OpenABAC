import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { updateActionObject } from '@/abac/core-services/action/updateAction';

export async function PUT(
    request: Request,
    { params }: { params: { actionName: string } },
) {
    try {
        const req = await request.json();
        if (!req.actionName || !req.actionDescription) {
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
            req.actionName,
            req.actionDescription,
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
