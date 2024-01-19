'use client'

import { AuthProvider } from '@/components/context/authProvider'
import { NextUIProvider } from '@nextui-org/react'
import ReportTable from '@/components/report/table'
import Main from '@/components/ui/Main'

export default function Report() {
  return (
    <AuthProvider>
      <NextUIProvider>
        <Main>
          <ReportTable></ReportTable>
        </Main>
      </NextUIProvider>
    </AuthProvider>
  )
}
