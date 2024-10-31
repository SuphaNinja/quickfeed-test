import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.headers.get("x-access-token")

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication token is missing" }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jose.jwtVerify(token, secret)

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId as string)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    console.error('Token verification failed:', error)
    return new NextResponse(
      JSON.stringify({ error: "Your session has expired or is invalid" }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}

export const config = {
 matcher: [
    '/api/user/me',
    '/api/protected/:path*',
    '/api/create-project',
    '/api/get-projectroom-by-id/:path*',
    '/api/add-user-to-projectroom/:path*',
    '/api/remove-user-from-projectroom/:path*'
  ],
}