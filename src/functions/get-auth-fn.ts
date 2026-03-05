import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { isAPIError } from 'better-auth/api'
import { auth } from '#/lib/auth/server'

export const getAuthFn = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    return session
  } catch (error) {
    if (isAPIError(error)) {
      // Backend/network failure — log and let router error boundary handle
      console.error('Session fetch failed:', error.message)
    }

    throw error
  }
})
