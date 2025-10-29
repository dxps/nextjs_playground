'use server'

import { RegisterSchema } from '@/schemas'
import z from 'zod'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/model/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	// Simulating a delay, just to show the loading state in the LoginForm.
	await new Promise((resolve) => setTimeout(resolve, 1000))

	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) {
		return {
			error: 'Invalid credentials',
		}
	}

	const { email, password, name } = validatedFields.data
	const hashedPassword = await bcrypt.hash(password, 10)
	const existingUser = await getUserByEmail(email)
	if (existingUser) {
		return {
			error: 'Email already in use',
		}
	}

	const result = await db.user.create({
		data: {
			email,
			password: hashedPassword,
			name,
		},
	})
	console.log('>>> [Register] result:', result)

	// TODO: Send verification token email.

	return {
		success: 'Successfully registered',
	}
}
