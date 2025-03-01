import { cookies, headers } from "next/headers"
import { verifyIdToken } from "./verify-id-token"

export async function getUid(): Promise<string> {
  try {
    const host = (await headers()).get('host')!
    const idToken = (await cookies()).get('id_token')?.value
    const request = new Request(`https://${host}`, {headers: {'Authorization': `Bearer ${idToken}`}})
    const decodedIdToken = await verifyIdToken(request)
    return decodedIdToken.uid
  } catch (e) {
    console.error(e)
    return ''
  }
}