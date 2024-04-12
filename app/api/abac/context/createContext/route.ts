import { NextResponse } from 'next/server';
import { catchStandardError } from '@/app/api/_utils';
import { createContextObject } from '@/abac/core-services/context/createContext';

export async function POST(request: Request) {
    try {
        const res = await request.json();
        if (!res.listOfContexts) {
            return NextResponse.json(
                {
                    data: 'This endpoint requires listOfContexts',
                    success: false,
                },
                { status: 400 },
            );
        }
        const response = await createContextObject(res.listOfContexts);
        return NextResponse.json(
            { success: response.success, data: response.data, message: response.message },
            { status: 200 },
        );
    } catch (e) {
        return catchStandardError(e);
    }
}
