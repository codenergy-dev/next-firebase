import { getApp, getApps, initializeApp } from "firebase/app"
import { Auth, connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth"

const useEmulator = 
    typeof window !== 'undefined' &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST

const firebaseConfig = useEmulator ? {
    apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
    authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
} : {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const firebase =
    typeof window === 'undefined'
    ? undefined
    : getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

const auth =
    typeof window === 'undefined'
    ? {} as Auth
    : getAuth()

if (useEmulator) connectAuthEmulator(
    auth, 
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST!,
    { disableWarnings: true },
)

export { firebase, auth, GoogleAuthProvider }