import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { dash } from '@better-auth/infra'
import {
  admin as adminPlugin,
  anonymous as anonymousPlugin,
  bearer as bearerPlugin,
  multiSession as multiSessionPlugin,
  openAPI as openAPIPlugin,
  username as usernamePlugin,
} from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { createAuthMiddleware } from 'better-auth/api'
import { z } from 'zod'
import { faker } from '@faker-js/faker'
import * as schema from '#/db/schemas'
import { db } from '#/db'
import { env } from '#/env'
import { generateNanoId } from '#/lib/nanoid'

export const auth = betterAuth({
  baseURL: env.SERVER_URL,
  advanced: {
    database: {
      generateId: 'uuid',
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['github', 'google'],
    },
    encryptOAuthTokens: true,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.userTable,
      session: schema.sessionTable,
      account: schema.accountTable,
      verification: schema.verificationTable,
    },
  }),
  emailAndPassword: { enabled: false },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Only modify body for sign-in paths
      if (!ctx.path.startsWith('/sign-in')) {
        return { context: ctx }
      }

      if (ctx.path === '/sign-in/anonymous') {
        return {
          context: {
            ...ctx,
            body: {
              ...(ctx.body ?? {}),
              type: 'guest' as schema.UserTypeEnum,
            },
          },
        }
      }

      return {
        context: {
          ...ctx,
          body: {
            ...(ctx.body ?? {}),
            type: 'registered' as schema.UserTypeEnum,
          },
        },
      }
    }),
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    dash(),
    adminPlugin(),
    anonymousPlugin({
      emailDomainName: '@boxsistant.app',
      generateName: () => faker.person.fullName(),
      generateRandomEmail: () => {
        const id = generateNanoId()
        return `guest-${id}@boxsistant.app`
      },
    }),
    bearerPlugin(),
    multiSessionPlugin(),
    openAPIPlugin(),
    usernamePlugin(),
    tanstackStartCookies(),
  ],
  secret: env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 24 * 3,
  },
  trustedOrigins: [env.BETTER_AUTH_URL],
  user: {
    additionalFields: {
      type: {
        type: ['guest', 'registered'] as schema.UserTypeEnum[],
        required: true,
        defaultValue: 'guest',
        input: false,
        validator: {
          input: z.enum(
            Object.values(schema.userTypeEnum) as [
              schema.UserTypeEnum,
              ...schema.UserTypeEnum[],
            ],
          ),
        },
      },
    },
  },
})
