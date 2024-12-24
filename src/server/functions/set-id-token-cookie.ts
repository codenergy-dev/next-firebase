import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { UnauthorizedException, verifyIdToken } from "./verify-id-token";

export async function setIdTokenCookie(request: Request): Promise<Response> {
  try {
    const decodedIdToken = await verifyIdToken(request)
    const authorization = request.headers.get('authorization')
    const idToken = authorization?.split('Bearer ')[1]
    const response = new NextResponse()
    const now = Math.floor(Date.now() / 1000);
    (await cookies()).set('id_token', idToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production',
      sameSite: 'strict',
      maxAge: decodedIdToken.exp - now,
    });
    (await cookies()).set('signed_in', now.toString(), {
      secure: process.env.NODE_ENV == 'production',
      sameSite: 'strict',
      maxAge: decodedIdToken.exp - now,
    })
    return response
  } catch (e) {
    console.error(e);
    (await cookies()).delete('id_token');
    (await cookies()).delete('signed_in')
    if (e instanceof UnauthorizedException) {
      return new Response(null, { status: 401 })
    }
    return new Response(null, { status: 500 })
  }
}