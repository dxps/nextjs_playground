import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { ReadonlyURLSearchParams } from 'next/navigation'

const allowedCallbackSet: ReadonlySet<string> = new Set([
	'/dashboard',
	'/settings',
])

export const getCallbackURL = (
	queryParams: ReadonlyURLSearchParams
): string => {
	const callbackUrl = queryParams.get('callbackUrl')
	if (callbackUrl) {
		if (allowedCallbackSet.has(callbackUrl)) {
			return callbackUrl
		}
		return DEFAULT_LOGIN_REDIRECT
	}
	return DEFAULT_LOGIN_REDIRECT
}
