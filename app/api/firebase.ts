import * as admin from "firebase-admin";
import { cert, getApp, getApps } from "firebase-admin/app";

const useEmulator =
    process.env.FIREBASE_AUTH_EMULATOR_HOST &&
    process.env.FIRESTORE_EMULATOR_HOST

const privateKey = useEmulator 
    ? undefined 
    : JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY!)

const firebaseConfig = useEmulator ? {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
} as admin.AppOptions : {
    credential: cert({
        projectId: privateKey.project_id,
        clientEmail: privateKey.client_email,
        privateKey: privateKey.private_key,
    }),
}

export const firebase = (getApps().length > 0 ? getApp() : admin.initializeApp(firebaseConfig)) as admin.app.App