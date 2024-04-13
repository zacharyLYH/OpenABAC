import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { actionContextMapping } from '@/abac/core-services/edit/ActionContextMapping';

export async function PUT(request: Request) {
    try {
        const req = await request.json();
        const response = await actionContextMapping(
            req.actionName,
            req.contextNames,
        );
        return NextResponse.json(
            {
                actions: response.data,
                message: response.message,
                success: response.success,
            },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
