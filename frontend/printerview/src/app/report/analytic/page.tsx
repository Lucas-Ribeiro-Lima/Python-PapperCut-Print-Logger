'use client'

import { AuthProvider } from '@/components/context/authProvider'
import ReportTable from '@/components/report/table'
import Main from '@/components/ui/Main'
import { NextUIProvider } from '@nextui-org/react'

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
