import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'home',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header />
        <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto'}}>
            {children}
        </div>
      </body>
    </html>
  )
}
