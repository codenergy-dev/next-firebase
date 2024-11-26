import { getAnalytics, isSupported } from "firebase/analytics"
import { useEffect } from "react"
import { firebase } from "../../firebase"

export function Analytics() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
      isSupported().then(isSupported => isSupported ? getAnalytics(firebase) : null)
    }
  }, [])
  return <></>
}