import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { createActionObject } from '@/abac/core-services/action/createAction';

export async function POST(request: Request) {
    try {
        const req= await request.json();
        if (!req.listOfActions) {
            return NextResponse.json(
                {
                    data: 'This endpoint requires listOfActions',
                    success: false,
                },
                { status: 400 },
            );
        }
        const response = await createActionObject(req.listOfActions);
        return NextResponse.json(
            { success: response.success, message: response.message },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
