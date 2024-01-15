'use client'

import Main from '@/components/ui/Main'
import { NextUIProvider } from '@nextui-org/react'

export default function Home() {
  return (
    <NextUIProvider>
      <Main></Main>
    </NextUIProvider>
  )
}
