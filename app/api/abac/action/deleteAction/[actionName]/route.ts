import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { deleteActionObject } from '@/abac/core-services/action/deleteAction';

export async function DELETE(
    req: Request,
    { params }: { params: { actionName: string } },
) {
    try {
        const response = await deleteActionObject(params.actionName);
        return NextResponse.json(
            { success: response.success, message: response.message },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
