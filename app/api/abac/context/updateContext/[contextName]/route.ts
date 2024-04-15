import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { updateContextObject } from '@/abac/core-services/context/updateContext';

export async function PUT(request: Request,
    { params }: { params: { contextName: string }}) {
    try {
        const req= await request.json();
        if (!req.context) {
            return NextResponse.json(
                {
                    data: 'This endpoint requires the context object to be passed in',
                    success: false,
                },
                { status: 400 },
            );
        }
        const response = await updateContextObject(params.contextName, req.context.contextName, req.context.contextDescription, req.context.operator, req.context.entity, req.context.textValue, req.context.timeValue1, req.context.timeValue2);
        return NextResponse.json(
            { success: response.success, message: response.message },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
