import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { auth } from "../../firebase"

export function AuthState() {
  const router = useRouter()

  useEffect(() => {
    return auth.onAuthStateChanged(onAuthStateChanged)
  }, [])

  async function onAuthStateChanged() {
    const hasSignedIn = document.cookie
      .split('; ')
      .some(cookie => cookie.startsWith(`signed_in=`))

    if (auth.currentUser && !hasSignedIn) {
      const idToken = await auth.currentUser?.getIdToken()
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${idToken}` },
      })
      router.refresh()
    }
  }

  return <></>
}