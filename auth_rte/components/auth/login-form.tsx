'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardWrapper } from './card-wrapper'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { useState, useTransition } from 'react'
import { LoaderCircle } from 'lucide-react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from '@/lib/auth-client'

export const LoginForm = () => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(async () => {
			const { email, password } = values
			try {
				const result = await signIn.email({
					email,
					password,
					callbackURL: DEFAULT_LOGIN_REDIRECT,
				})
				console.log('[Login] result:', result)
				if (result.error) {
					setError(result.error.message)
				}
			} catch (error) {
				console.log('[Login] error:', error)
				setError(error as string)
			}
		})
	}

	return (
		<CardWrapper
			headerLabel="Welcome back!"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="john.doe@example.com"
											type="email"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											disabled={isPending}
											autoComplete="off"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
					>
						{isPending ? (
							<LoaderCircle className="animate-spin" />
						) : (
							'Login'
						)}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
