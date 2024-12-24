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
      signIn().then(router.refresh)
    } else if (!auth.currentUser && hasSignedIn) {
      signOut().then(router.refresh)
    }
  }

  async function signIn() {
    const idToken = await auth.currentUser?.getIdToken()
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${idToken}` },
    })
  }

  async function signOut() {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Authorization': `${undefined}` },
    })
  }

  return <></>
}