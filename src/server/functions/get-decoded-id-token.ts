import { cookies, headers } from "next/headers"
import { verifyIdToken } from "./verify-id-token"
import { DecodedIdToken } from "firebase-admin/auth"

export async function getDecodedIdToken(): Promise<DecodedIdToken | null> {
  try {
    const host = (await headers()).get('host')!
    const idToken = (await cookies()).get('id_token')?.value
    const request = new Request(`https://${host}`, {headers: {'Authorization': `Bearer ${idToken}`}})
    return await verifyIdToken(request)
  } catch (e) {
    console.error(e)
    return null
  }
}