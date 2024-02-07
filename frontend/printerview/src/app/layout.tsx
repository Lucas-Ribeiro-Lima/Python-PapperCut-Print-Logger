import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PrinterView',
  description: 'App to visualizate Papper printer logger data',
}
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="dark h-screen bg-gradient-to-r from-gray-900 via-sky-950 to-slate-900">
        {children}
      </body>
    </html>
  )
}
