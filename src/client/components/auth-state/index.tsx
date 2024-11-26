import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { auth } from "../../firebase"

export function AuthState() {
  const router = useRouter()

  useEffect(() => {
    return auth.onAuthStateChanged(onAuthStateChanged)
  }, [])

  async function onAuthStateChanged() {
    const oldAuthState = localStorage.getItem('auth-state')
    const newAuthState = auth.currentUser ? 'signed-in' : 'signed-out'
    localStorage.setItem('auth-state', newAuthState)

    if (oldAuthState != newAuthState) {
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