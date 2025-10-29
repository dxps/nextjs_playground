import * as z from 'zod'

export const LoginSchema = z.object({
	email: z.email({
		error: 'Invalid email address',
	}),
	password: z.string().min(4, 'Password is required'),
})

export const RegisterSchema = z.object({
	email: z.email({
		error: 'Invalid email address',
	}),
	password: z.string().min(4, 'Password must be at least 4 characters'),
	name: z
		.string()
		.min(4, 'Name is required and it must be at least 4 characters'),
})
