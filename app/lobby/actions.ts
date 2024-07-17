'use server'

import { signIn } from '@/auth'
import { Guest } from '@/lib/types'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { ResultCode } from '@/lib/utils'

export async function getGuest(name: string) {
  const guest = await kv.hgetall<Guest>(`guest:${name}`)
  return guest
}

interface Result {
  type: string
  resultCode: ResultCode
}

export async function visit(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const name = formData.get('name')

    const parsedCredentials = z
      .object({
        name: z.string()
      })
      .safeParse({
        name
      })

    if (parsedCredentials.success) {
      // here, if sucessful, i just want to return a jwt token / ask to save it in local storage.
      await signIn('credentials', {
        name,
        redirect: false
      })

      return {
        type: 'success',
        resultCode: ResultCode.GuestEntered
      }
    } else {
      return {
        type: 'error',
        resultCode: ResultCode.InvalidCredentials
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            type: 'error',
            resultCode: ResultCode.InvalidCredentials
          }
        default:
          return {
            type: 'error',
            resultCode: ResultCode.UnknownError
          }
      }
    }
  }
}
