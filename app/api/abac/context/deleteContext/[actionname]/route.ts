import { NextResponse } from 'next/server';
import {
    catchStandardError,
} from '@/app/api/_utils';
import { deleteContextObject } from '@/abac/core-services/context/deleteContext';

export async function DELETE(
    req: Request,
    { params }: { params: { contextName: string } },
) {
    try {
        const response = await deleteContextObject(
            params.contextName,
        );
        return NextResponse.json(
            { success: response.success, message: response.message },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
