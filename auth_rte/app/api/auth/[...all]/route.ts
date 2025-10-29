import { auth } from '@/lib/auth' // path to the auth file (such as '@/lib/auth')
import { toNextJsHandler } from 'better-auth/next-js'
export const { POST, GET } = toNextJsHandler(auth)
