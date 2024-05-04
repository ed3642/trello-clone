'use client'

import { UserButton, useAuth, useUser } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"

const ProtectedPage = () => {
  const { user } = useUser()
  const { userId } = useAuth()


  return (
    <div>
      <UserButton 
      afterSignOutUrl='/' />
    </div>
  )
}

export default ProtectedPage