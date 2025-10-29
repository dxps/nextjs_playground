'use client'

import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import MobileNav from './navbar-mobile'
import { signOut, useSession } from '@/lib/auth-client'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
	setIsLoading,
	setIsLoggedIn,
	setUser,
} from '@/features/auth/auth-slice'
import { User } from '@/data/model/user'

export const globalSections = [{ id: 1, name: 'Home', href: '/' }]

export function Navbar() {
	const { data, isPending } = useSession()
	const isLoggedIn = data?.user
	const router = useRouter()
	const dispatch = useDispatch()

	const handleLogout = async () => {
		const res = await signOut()
		if (!res.error) {
			router.push('/')
		}
	}

	useEffect(() => {
		if (!isPending) {
			if (data?.session) {
				const user: User = {
					id: data.user.id,
					email: data.user.email,
					name: data.user.name,
					image: data.user.image || '',
					emailVerified: false,
				}
				dispatch(setUser(user))
				dispatch(setIsLoggedIn(true))
				dispatch(setIsLoading(false))
			}
		}
	}, [isPending, dispatch, data])

	return (
		<div
			className="container mx-auto flex h-10 items-center justify-between"
			suppressHydrationWarning={true}
		>
			<div>
				<div className="flex items-center gap-6 sm:px-0 px-6">
					{/* <Link
						className="text-lg font-bold hidden md:block"
						href="/"
					>
						cognify
					</Link> */}
					<nav className="hidden md:flex items-center gap-6">
						{globalSections.map((category) => (
							<Link
								key={category.id}
								href={category.href}
								className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
							>
								{category.name}
							</Link>
						))}
					</nav>
					<MobileNav />
				</div>
			</div>

			{/* <div className="block w-full mx-4 md:mx-8"></div> */}

			<div className="flex items-center gap-0 pr-0">
				<ModeToggle />
				{isLoggedIn && (
					<>
						{/* <p className="text-sm font-medium text-muted-foreground w-12">
							{data.user.name}
						</p> */}
						<Button
							variant="ghost"
							size="sm"
							onClick={handleLogout}
							className="cursor-pointer w-18"
						>
							Logout
						</Button>
					</>
				)}
				{isPending && <Skeleton className="h-5 w-18" />}
			</div>
		</div>
	)
}
