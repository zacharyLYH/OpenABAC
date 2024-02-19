import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { authorizeActionNameGivenApplicationUserId } from '@/abac/core-services/authorize/[actionName]/route';

export async function GET(
    request: Request,
    { params }: { params: { actionName: string } },
) {
    const headersList = headers();
    const userId = headersList.get('header-applicationUserId');
    if (!userId) {
        return NextResponse.json(
            {
                message:
                    'The userId is missing from the headers - this is not supposed to happen. The MW should handle any errors already.',
            },
            { status: 500 },
        );
    }
    const response = await authorizeActionNameGivenApplicationUserId(
        userId,
        params.actionName,
    );
    if (response.authorized === false) {
        return NextResponse.json(
            { message: response.message },
            { status: response.statusCode },
        );
    }
    return NextResponse.json({ message: 'Success' }, { status: 200 });
}
