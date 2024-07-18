import type { NextAuthConfig } from 'next-auth'
import DesIcon from './public/des-icon-48-round.png'

export const authConfig = {
  theme: { logo: DesIcon.src },
  secret: process.env.AUTH_SECRET,
  pages: {
    // signIn: '/login',
    newUser: '/signup'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      console.log('authorized callback being CALLED')
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL('/', nextUrl))
        }
      }

      return true
    },
    async jwt({ token, user }) {
      console.log('jwt callback being CALLED')
      if (user) {
        token = { ...token, id: user.id }
      }

      return token
    },
    async session({ session, token }) {
      console.log('session callback being CALLED')
      if (token) {
        const { id } = token as { id: string }
        const { user } = session

        session = { ...session, user: { ...user, id } }
      }

      return session
    }
  },
  providers: [],
  // below is from nextAuth example project:
  // https://github.com/nextauthjs/next-auth-example/blob/main/auth.ts
  debug: process.env.NODE_ENV !== 'production' ? true : false
} satisfies NextAuthConfig
