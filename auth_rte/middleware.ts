import { NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import {
	apiAuthPrefix,
	authRoutes,
	DEFAULT_LOGIN_REDIRECT,
	publicRoutes,
} from './routes'

export async function middleware(req: NextRequest) {
	const { nextUrl } = req
	const sessionCookie = getSessionCookie(req, { cookiePrefix: 'cognify' })
	const isLoggedIn = !!sessionCookie
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)

	console.log(
		'>>> [Middleware] route:',
		nextUrl.pathname,
		' isLoggedIn:',
		isLoggedIn,
		'isApiAuthRoute:',
		isApiAuthRoute,
		'isPublicRoute:',
		isPublicRoute,
		'isAuthRoute:',
		isAuthRoute,
		'sessionCookie:',
		sessionCookie
	)

	if (isApiAuthRoute) {
		return
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL('/auth/login', nextUrl))
	}
}

export const config = {
	// (i) These paths will invoke the middleware (the `auth` function above).
	matcher: [
		// Skip the following:
		// 1) /.well-known (and subpaths).
		// 2) Next.js internals and all static files, unless found in search params.
		'/((?!\\.well-known(?:/|$)|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

		// Always run for API routes.
		'/(api|trpc)(.*)',
	],
}
