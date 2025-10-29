'use client'

import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { authSelector } from '@/features/auth/auth-slice'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
})

export default function Home() {
	const authState = useSelector(authSelector)

	return (
		<main className="flex flex-col items-center justify-center space-y-6 bg-slate-200 dark:bg-slate-800">
			<h1
				className={cn(
					'text-4xl font-semibold text-slate-800  dark:text-slate-100 drop-shadow-md',
					font.className
				)}
			>
				Welcome
				{authState.isLoggedIn ? ', ' : '!'}
			</h1>
			{authState.isLoggedIn && (
				<p>
					<Link href="/settings">{authState.user?.name}</Link>!
				</p>
			)}
			{authState.isLoading && <Skeleton className="h-6 w-64" />}
			{!authState.isLoading && !authState.isLoggedIn && (
				<LoginButton>
					<Button
						variant="secondary"
						size="lg"
						className="cursor-pointer drop-shadow-sm bg-white dark:bg-slate-600"
					>
						Sign in
					</Button>
				</LoginButton>
			)}
		</main>
	)
}
