import { env } from '@saas/env'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: string | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          const cookieStore = await serverCookies()
          token = cookieStore.get('token')?.value
        } else {
          // Cliente (browser)
          const cookies = document.cookie.split('; ')
          const tokenCookie = cookies.find((c) => c.startsWith('token='))
          token = tokenCookie?.split('=')[1]
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
