'use server'

import { LoginSchema } from '@/schemas'
import z from 'zod'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { getUserByEmail } from '@/data/model/user'
import { auth } from '@/lib/auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
	// Simulating a delay, just to show the loading state in the LoginForm.
	await new Promise((resolve) => setTimeout(resolve, 1000))

	const validatedFields = LoginSchema.safeParse(values)
	if (!validatedFields.success) {
		return {
			success: false,
			error: 'Invalid credentials',
		}
	}
	const { email, password } = validatedFields.data
	const existingUser = await getUserByEmail(email)
	if (!existingUser || !existingUser.email) {
		return {
			success: false,
			error: 'Email does not exist!',
		}
	}

	await auth.api
		.signInEmail({
			body: {
				email,
				password,
				callbackURL: DEFAULT_LOGIN_REDIRECT,
				rememberMe: false,
			},
		})
		.then((result) => {
			console.log('>>> [login action] data:', result)
			return {
				success: true,
				user: result.user,
			}
		})
		.catch((err) => {
			console.log('>>> [login action] error:', err)
			return {
				success: false,
				error: err.message,
			}
		})
}
