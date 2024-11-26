import { AuthProvider, signInWithPopup, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => {
    return auth.onAuthStateChanged(onAuthStateChanged)
  }, [])

  function onAuthStateChanged() {
    setUser(auth.currentUser)
  }

  function signIn(provider: AuthProvider) {
    signInWithPopup(auth, provider)
  }

  function signOut() {
    auth.signOut()
  }

  return {user, signIn, signOut}
}