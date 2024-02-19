import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
//https://nextjs.org/docs/app/building-your-application/routing/middleware#producing-a-response

/*
This middleware is only used in abac authorization requests. OpenABAC UI's authorization method uses NextAuth's built in authorizer. 

This middleware reads the cookies for "abac-access-token" then sets the "header:applicationUserId" header field for consumption in the api handler. 
*/

export const config = {
    matcher: '/api/abac/:function*',
};

export function middleware(request: NextRequest) {
    if (process.env.USING_INTERNAL_AUTH === 'false') {
        console.log('MIDDLEWARE IS WORKING');
        const response = NextResponse.next();
        response.headers.set('header-applicationUserId', 'sudo');
        return response;
    } else {
        let cookie = request.cookies.get('abac-access-token');
        return NextResponse.json(
            { success: false, message: 'authentication failed' },
            { status: 401 },
        );
    }
}
