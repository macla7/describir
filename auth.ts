import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { getStringFromBuffer } from './lib/utils'
import { getUser } from './app/login/actions'

import Apple from 'next-auth/providers/apple'
import Facebook from 'next-auth/providers/facebook'
import Google from 'next-auth/providers/google'
import Twitter from 'next-auth/providers/twitter'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET as string,
      wellKnown: 'https://appleid.apple.com/.well-known/openid-configuration',
      checks: ['pkce'],
      authorization: {
        url: 'https://appleid.apple.com/auth/authorize',
        params: {
          scope: 'name email',
          response_type: 'code',
          response_mode: 'form_post',
          state: crypto.randomUUID()
        }
      },
      token: {
        url: `https://appleid.apple.com/auth/token`
      },
      client: {
        token_endpoint_auth_method: 'client_secret_post'
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || null,
          email: profile.email || null,
          image: null
        }
      },
      profileConform(profile, query) {
        if (query.user) {
          const user = JSON.parse(query.user)
          if (user.name) {
            profile.name = Object.values(user.name).join(' ')
          }
        }
        return profile
      }
    }),
    Facebook,
    Google,
    Twitter,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)

          if (!user) return null

          const encoder = new TextEncoder()
          const saltedPassword = encoder.encode(password + user.salt)
          const hashedPasswordBuffer = await crypto.subtle.digest(
            'SHA-256',
            saltedPassword
          )
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

          if (hashedPassword === user.password) {
            return user
          } else {
            return null
          }
        }

        return null
      }
    })
  ]
})

// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });

//     FB.AppEvents.logPageView();

//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>
