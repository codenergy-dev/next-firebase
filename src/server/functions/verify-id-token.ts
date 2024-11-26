import { DecodedIdToken } from "firebase-admin/auth"
import { firebase } from "../firebase-admin"

const auth = firebase.auth()

export async function verifyIdToken(request: Request): Promise<DecodedIdToken> {
  try {
    const authorization = request.headers.get('authorization')
    const idToken = authorization?.split('Bearer ')[1]
    const decodedIdToken = await auth.verifyIdToken(idToken!)
    const now = Math.floor(Date.now() / 1000)
    if (decodedIdToken.exp < now) throw new UnauthorizedException()
    return decodedIdToken
  } catch (_) {
    throw new UnauthorizedException()
  }
}

export class UnauthorizedException {
  public toString = () => 'Invalid credentials.';
}