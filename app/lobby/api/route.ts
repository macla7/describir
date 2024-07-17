// whole file is from ChatGPT
// Let's maybe just not use this one for the moment...

// pages/api/auth/[...nextauth].ts
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { JWT } from 'next-auth/jwt'
// import { User } from 'next-auth'

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },
//       authorize: async (
//         credentials: Record<string, string> | undefined,
//         req: any
//       ): Promise<User | null> => {
//         const user = { id: 1, name: 'User', email: 'user@example.com' } // Mock user

//         if (user) {
//           return Promise.resolve(user) // Ensure returning a promise
//         } else {
//           return Promise.resolve(null)
//         }
//       }
//     }),
//     CredentialsProvider({
//       name: 'Guest',
//       credentials: {
//         name: { label: 'Name', type: 'text' }
//       },
//       authorize: async (
//         credentials: Record<string, string> | undefined,
//         req: any
//       ): Promise<User | null> => {
//         const user = {
//           id: new Date().getTime(),
//           name: credentials?.name || 'Guest',
//           isGuest: true
//         }

//         if (user) {
//           return Promise.resolve(user) // Ensure returning a promise
//         } else {
//           return Promise.resolve(null)
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: User }) {
//       if (user) {
//         token.id = user.id
//         token.name = user.name
//         token.isGuest = (user as any).isGuest || false
//       }
//       return token
//     },
//     async session({ session, token }: { session: any; token: JWT }) {
//       session.user.id = token.id
//       session.user.name = token.name
//       session.user.isGuest = token.isGuest
//       return session
//     }
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET,
//     encryption: true
//   },
//   pages: {
//     signIn: '/auth/signin',
//     signOut: '/auth/signout'
//   }
// })
