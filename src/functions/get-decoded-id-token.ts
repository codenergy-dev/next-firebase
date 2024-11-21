import { verifyIdToken } from "@/app/api/verify-id-token"
import { cookies, headers } from "next/headers"

export async function getDecodedIdToken() {
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