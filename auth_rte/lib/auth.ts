import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@/lib/generated/prisma'
import { nextCookies } from 'better-auth/next-js'

const prisma = new PrismaClient()

export const auth = betterAuth({
	advanced: {
		cookiePrefix: 'cognify',
	},

	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),

	emailAndPassword: {
		enabled: true,
		minPasswordLength: 4,
		maxPasswordLength: 64,
	},

	plugins: [
		// This must be the last plugin added.
		nextCookies(),
	],

	socialProviders: {
		microsoft: {
			clientId: process.env.MICROSOFT_ENTRA_ID_CLIENT_ID as string,
			clientSecret: process.env
				.MICROSOFT_ENTRA_ID_CLIENT_SECRET as string,
			tenantId: process.env.MICROSOFT_ENTRA_ID_TENANT_ID as string,
			authority: 'https://login.microsoftonline.com',
			prompt: 'select_account',
		},
	},
})
