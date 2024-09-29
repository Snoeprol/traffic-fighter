'use client'

import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
