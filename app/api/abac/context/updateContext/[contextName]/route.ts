import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { updateContextObject } from '@/abac/core-services/context/updateContext';

export async function PUT(request: Request,
    { params }: { params: { contextName: string }}) {
    try {
        const res = await request.json();
        if (!res.context) {
            return NextResponse.json(
                {
                    data: 'This endpoint requires the context object to be passed in',
                    success: false,
                },
                { status: 400 },
            );
        }
        const response = await updateContextObject(params.contextName, res.contextName, res.contextDescription, res.operator, res.entity, res.textValue, res.timeValue1, res.timeValue2);
        return NextResponse.json(
            { success: response.success, message: response.message },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
