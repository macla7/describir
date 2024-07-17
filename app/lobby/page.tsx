import { auth } from '@/auth'
import LobbyNameForm from '@/components/lobby-name-form'
import LobbyHome from '@/components/lobby-home'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      {/* <LobbyHome /> */}
      <LobbyNameForm />
    </main>
  )
}
