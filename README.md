This is a [Next.js](https://nextjs.org) template with [Firebase]().

## Getting Started

First, create the `.env.local` file to configure Firebase.

|Key|Package|Context|Notes|
|:--|:------|:------|:----|
FIREBASE_ADMIN_PRIVATE_KEY|firebase-admin|All
NEXT_PUBLIC_FIREBASE_API_KEY|firebase|All
NEXT_PUBLIC_FIREBASE_APP_ID|firebase|All
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN|firebase|All
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID|firebase|Analytics|Optional
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID|firebase|Messaging|Optional
NEXT_PUBLIC_FIREBASE_PROJECT_ID|firebase|All
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET|firebase|Storage|Optional

## Client-side

Import `firebase` modules from [`@/app/firebase`](/app/firebase.ts).

```js
import { auth, firebase } from "@/app/firebase"
```

### Analytics

Use the `Analytics` component from [`@/src/components/analytics`](/src/components/analytics/index.tsx) to enable Firebase Analytics.

> See an example in [`@/app/layout`](/app/layout.tsx).

### Authentication

Use the [useUser](/src/hooks/use-user.ts) hook to sign in, sign out and to get the current user.

### Google Sign-in

Use the [ButtonGoogleSignIn](/src/components/button-google-signin/index.tsx) to show the Google Sign-in button.


## Server-side

Import `firebase-admin` modules from [`@/app/api/firebase`](/app/api/firebase.ts).

```js
import { firebase } from "@/app/api/firebase"
```

### Authentication

#### Route Handlers

Use the function `verifyIdToken` from [`@/app/api/verify-id-token`](/app/api/verify-id-token.ts) to authenticate user requests.

```js
import { UnauthorizedException, verifyIdToken } from "@/app/api/verify-id-token";

export async function POST(request: Request) {
  try {
    const decodedIdToken = await verifyIdToken(request)
    ...
  } catch (e) {
    if (e instanceof UnauthorizedException) {
      return new Response(null, { status: 401 })
    }
    ...
  }
}
```

The `verifyIdToken` requires an `authorization` header in the request.

```json
{
    "authorization": "Bearer idToken"
}
```

> Replaces `idToken` with the user ID Token generated from Firebase. 

#### Server Components

Use the [`AuthState`](/src/components/auth-state/) component to set a cookie with the ID Token on authentication state changed.

> See an example in [`@/app/layout`](/app/layout.tsx).

Validate the ID Token cookie in a server component using the [`getDecodedIdToken`](/src/functions/get-decoded-id-token.ts) and [`getUid`](/src/functions/get-uid.ts) functions.

> `getDecodedIdToken` will return `null` if the user is not signed-in.

> `getUid` will return an empty string if the user is not signed-in.