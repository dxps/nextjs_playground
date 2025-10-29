import { PrismaClient } from '@/lib/generated/prisma'

// This is needed just for the hot reload mechanism that is used in development.
// Implicitly (or otherwise), a new instance of PrismaClient would have been created on every reload.
// And global is not affected by the hot reloads.

declare global {
	var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
