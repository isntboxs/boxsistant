import { createAuthClient } from 'better-auth/react'
import { sentinelClient } from '@better-auth/infra/client'
import {
  adminClient,
  anonymousClient,
  inferAdditionalFields,
  multiSessionClient,
  usernameClient,
} from 'better-auth/client/plugins'

import type { auth } from '#/lib/auth/server'
import { env } from '#/env'

export const authClient = createAuthClient({
  baseURL: env.VITE_APP_URL,
  plugins: [
    sentinelClient(),
    adminClient(),
    anonymousClient(),
    multiSessionClient(),
    usernameClient(),
    inferAdditionalFields<typeof auth>(),
  ],
})

export const { signIn, signOut, signUp, useSession } = authClient
