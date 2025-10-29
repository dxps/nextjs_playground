import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import StoreProvider from './store-provider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'cognify',
	description: 'A system that helps you to connect and link things.',
	icons: {
		icon: [
			{
				type: 'image/svg+xml',
				url: '/logo.svg',
			},
			{
				type: 'image/png',
				url: '/logo.png',
			},
			{
				type: 'image/x-icon',
				url: '/favicon.ico',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<StoreProvider>
			<html
				lang="en"
				// TODO: Added this just to get rid of the warning regarding browser extensions
				// (such as Proton Pass) that are interfering with the hydration.
				suppressHydrationWarning
			>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<>
							<header>
								<Navbar />
							</header>
						</>
					</ThemeProvider>
					<div className="h-[calc(100vh-5.2rem)] flex items-center justify-center bg-slate-200 dark:bg-slate-800">
						{children}
					</div>
					<footer className="py-3">
						<div className="container mx-auto text-xs text-muted-foreground text-center">
							&copy; {new Date().getFullYear()} cognify
						</div>
					</footer>
				</body>
			</html>
		</StoreProvider>
	)
}
