import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export function returnApplicationUserIdViaHeader() {
    const headersList = headers();
    const userId = headersList.get('applicationUserId');
    return userId!;
}

export function catchStandardError(e: unknown) {
    let errorMessage: string;

    if (e instanceof Error) {
        errorMessage = e.message;
    } else if (typeof e === 'string') {
        errorMessage = e;
    } else {
        errorMessage = 'An unknown error occurred';
    }

    return NextResponse.json({ StandardError: errorMessage }, { status: 500 });
}
