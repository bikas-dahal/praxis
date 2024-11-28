import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const DashboardPage = async () => {

    const session = await auth()

    if (!session?.user) {
        redirect('/login')
    }

  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}

export default DashboardPage
