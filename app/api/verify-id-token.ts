import { firebase } from "./firebase";

const auth = firebase.auth()

export async function verifyIdToken(request: Request) {
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