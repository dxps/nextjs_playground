'use client'

import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import { TiVendorMicrosoft } from 'react-icons/ti'
import { signIn } from '@/lib/auth-client'

const Social = () => {
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button
				variant="outline"
				size="lg"
				className="w-1/2 cursor-pointer"
				onClick={() => {}}
			>
				<FcGoogle className="h-5 w-5" />
			</Button>
			<Button
				variant="outline"
				size="lg"
				className="w-1/2 cursor-pointer"
				onClick={async () => {
					const res = await signIn.social({
						provider: 'microsoft',
						callbackURL: '/settings', // The URL to redirect to after the sign in.
					})
					console.log('>>> [Social :: Login w/ Microsoft]', res)
				}}
			>
				<TiVendorMicrosoft className="h-5 w-5" />
			</Button>
		</div>
	)
}

export default Social
