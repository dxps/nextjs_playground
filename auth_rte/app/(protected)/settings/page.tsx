'use client'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { authSelector } from '@/features/auth/auth-slice'
// import { useSession } from '@/lib/auth-client'
import { useSelector } from 'react-redux'

const SettingsPage = () => {
	// const { data } = useSession()
	const authState = useSelector(authSelector)

	return (
		<CardWrapper
			headerLabel="Settings"
			className="sm:w-[600px] md:w-[800px] min-h-[230px] sm:text-xs text-sm w-full"
		>
			<div className="overflow-x-scroll">
				{authState.isLoading && <Skeleton className="h-6 w-64" />}
				{!authState.isLoading && !authState.isLoggedIn && (
					<p>You&apos;re not logged in.</p>
				)}
				{!authState.isLoading && authState.isLoggedIn && (
					<pre>{JSON.stringify(authState.user, null, 2)}</pre>
				)}
			</div>
		</CardWrapper>
	)
}

export default SettingsPage
