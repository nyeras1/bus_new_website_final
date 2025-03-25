import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SRGEC Transport Portal',
  description: 'SRGECTransport Portal',
  generator: 'SRGEC Transport Portal',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
