import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const config = {
    matcher: '/api/abac/:function*',
};

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const allowedOrigins = ['http://localhost:3000'];

export function middleware(request: NextRequest) {
    const origin = request.headers.get('origin') ?? '';
    const isAllowedOrigin = allowedOrigins.includes(origin);

    const isPreflight = request.method === 'OPTIONS';

    const corsHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
    };

    if (isPreflight) {
        return NextResponse.json({}, { headers: corsHeaders });
    }

    if (!isAllowedOrigin) {
        return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
            },
        });
    }

    if (isAllowedOrigin) {
        const token = request.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return new Response(
                JSON.stringify({ error: 'Authorization token required' }),
                {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders,
                    },
                },
            );
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!); //TODO: add validation to the applicationUserId
            return NextResponse.next();
        } catch (error) {
            return new Response(
                JSON.stringify({ error: 'Invalid or expired token' }),
                {
                    status: 403,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders,
                    },
                },
            );
        }
    }
}
