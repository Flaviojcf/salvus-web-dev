import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainDashboardSidebar } from './_components/main-sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Salvus frontend solution',
  description: 'Created by @Flaviojcf',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-cols-[16rem_1fr]">
          <MainDashboardSidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
