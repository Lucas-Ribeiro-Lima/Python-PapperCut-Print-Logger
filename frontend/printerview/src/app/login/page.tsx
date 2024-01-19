'use client'

import { AuthProvider } from '@/components/context/authProvider'
import LoginLayout from '@/components/ui/Login'
import { NextUIProvider } from '@nextui-org/react'

export default function Login() {
  return (
    <AuthProvider>
      <NextUIProvider>
        <LoginLayout></LoginLayout>
      </NextUIProvider>
    </AuthProvider>
  )
}
