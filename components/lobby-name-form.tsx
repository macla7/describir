'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { visit } from '@/app/lobby/actions'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { IconSpinner } from './ui/icons'
import { getMessageFromCode } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(visit, undefined)

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        toast.error(getMessageFromCode(result.resultCode))
      } else {
        toast.success(getMessageFromCode(result.resultCode))
        router.refresh()
      }
    }
  }, [result, router])

  return (
    <form
      action={dispatch}
      className="flex flex-col items-center gap-4 space-y-3"
    >
      <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md  md:w-96 dark:bg-zinc-950">
        <h1 className="mb-3 text-2xl font-bold">Your Name</h1>
        <div className="w-full">
          <div>
            {/* <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="name"
            >
              Name
            </label> */}
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="name"
                type="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
        </div>
        <GuestEntryButton />
      </div>

      {/* With the below link, could go to a signup for the proper user account if they want as well (still in the pre-joining game flow) */}
      {/* <Link
        href="/signup"
        className="flex flex-row gap-1 text-sm text-zinc-400"
      >
        No account yet? <div className="font-semibold underline">Sign up</div>
      </Link> */}
    </form>
  )
}

function GuestEntryButton() {
  const { pending } = useFormStatus()

  return (
    <Link href="/">
      <button
        className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-md bg-zinc-900 p-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        aria-disabled={pending}
      >
        {pending ? <IconSpinner /> : 'Join Waiting Room'}
      </button>
    </Link>

    // <button
    //   className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-md bg-zinc-900 p-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
    //   aria-disabled={pending}
    // >
    //   {pending ? <IconSpinner /> : 'Join game'}
    // </button>
  )
}
