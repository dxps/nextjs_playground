import { db } from '@/lib/db'

export interface User {
	id: string
	email: string
	name: string
	image: string
	emailVerified: boolean
}

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } })

		return user
	} catch {
		return null
	}
}

export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id } })

		return user
	} catch {
		return null
	}
}
