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
import { RegisterSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { useState, useTransition } from 'react'
import { LoaderCircle } from 'lucide-react'
import { signUp } from '@/lib/auth-client'
import { getCallbackURL } from '@/lib/shared'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const params = useSearchParams()

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError(undefined)
		setSuccess(undefined)
		startTransition(async () => {
			const { name, email, password } = values
			await signUp.email({
				name,
				email,
				password,
				callbackURL: DEFAULT_LOGIN_REDIRECT,
				fetchOptions: {
					onError: (ctx) => {
						console.log(
							'>>> [RegisterForm] error:',
							ctx.error.message
						)
						setError(ctx.error.message)
					},
					onSuccess: async () => {
						console.log(
							'>>> [RegisterForm] Successfully signed up.'
						)
						router.push(getCallbackURL(params))
					},
				},
			})
		})
	}

	return (
		<CardWrapper
			headerLabel="Create an account"
			backButtonLabel="Already have an account?"
			backButtonHref="/auth/login"
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
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="John Doe"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						className="w-full cursor-pointer"
						disabled={isPending}
					>
						{isPending ? (
							<LoaderCircle className="animate-spin" />
						) : (
							'Register'
						)}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
