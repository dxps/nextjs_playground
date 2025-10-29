'use client'

import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card'
import { Header } from './header'
import Social from './social'
import BackButton from './back-button'

interface CardWrapperProps {
	children: React.ReactNode
	headerLabel?: string
	backButtonLabel?: string
	backButtonHref?: string
	showSocial?: boolean
	className?: string
}
/**
 * Create a CardWrapper component.
 * Its default width is set to 400px, and its height is set to auto.
 */
export const CardWrapper = ({
	children,
	headerLabel = '',
	backButtonLabel = '',
	backButtonHref = '',
	showSocial,
	className = 'w-[400px]',
}: CardWrapperProps) => {
	return (
		<Card className={className}>
			{headerLabel && (
				<CardHeader>
					<Header label={headerLabel} />
				</CardHeader>
			)}
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			{backButtonLabel && (
				<CardFooter>
					<BackButton href={backButtonHref} label={backButtonLabel} />
				</CardFooter>
			)}
		</Card>
	)
}
