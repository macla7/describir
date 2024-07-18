// types/next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      isGuest?: boolean
    } & DefaultSession['user']
  }

  interface JWT {
    id: string
    name: string
    email: string
    isGuest?: boolean
  }
}
