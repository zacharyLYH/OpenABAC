import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const config = {
    matcher: '/api/abac/:function*',
};

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const allowedOrigins = ['https://allowed-origin.com'];

export async function middleware(request: NextRequest) {
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
            const decoded = await verifyJwt(token, process.env.JWT_SECRET!); //TODO: add validation to the applicationUserId
            if (
                typeof decoded === 'object' &&
                decoded !== null &&
                'applicationUserId' in decoded
            ) {
                const updatedRequest = new NextRequest(request, {
                    headers: {
                        ...request.headers,
                        applicationUserId: decoded.applicationUserId,
                    },
                });
                return NextResponse.next(updatedRequest);
            } else {
                /*
                There will be 'applicationUserId' in the JWT for this endpoint. But the fact that verifyJWT() worked, means that the request came from an authorized source, so in the event we see some priviledged endpoints, we can just forward.
                */
                if (request.nextUrl.pathname === '/api/abac/user/createUser') {
                    return NextResponse.next();
                }
                return new Response(
                    JSON.stringify({ error: 'Invalid token structure' }),
                    {
                        status: 403,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders,
                        },
                    },
                );
            }
        } catch (error) {
            console.log(error);
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

// Function to base64-url decode (replaces '-' with '+', '_' with '/', and pads with '=')
function base64urlDecode(str: string) {
    str += Array(5 - (str.length % 4)).join('=');
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    return atob(str);
}

// Function to verify JWT and return the payload
async function verifyJwt(token: string, secret: string): Promise<any> {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    const data = `${headerB64}.${payloadB64}`;

    // Decode the input and the signature
    const textEncoder = new TextEncoder();
    const dataUint8Array = textEncoder.encode(data);
    const decodedSignature = Uint8Array.from(atob(signatureB64), c =>
        c.charCodeAt(0),
    );

    // Import the secret key for HMAC
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        textEncoder.encode(secret),
        { name: 'HMAC', hash: { name: 'SHA-256' } },
        false,
        ['verify'],
    );

    // Verify the signature
    const isValid = await crypto.subtle.verify(
        'HMAC',
        cryptoKey,
        decodedSignature,
        dataUint8Array,
    );

    if (isValid) {
        // Decode and return the payload as a JSON object
        const decodedPayload = base64urlDecode(payloadB64);
        return JSON.parse(decodedPayload);
    } else {
        throw new Error('Invalid token');
    }
}
