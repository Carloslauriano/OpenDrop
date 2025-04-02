import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

const title = {
  title: "OpenDrop",
  description: "Um revival moderno do Snapdrop para transferência de arquivos local",
}

export const metadata: Metadata = {
  ...title,
  openGraph: {
    ...title,
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000',
  },
  twitter: {
    ...title,
    card: "summary_large_image",
  },
  keywords: ['file', 'transfer', 'local', 'p2p', 'web', 'modern', 'snapdrop', 'opendrop'],
  creator: 'Carlos Henrique Lauriano',
  publisher: 'Carlos Henrique Lauriano'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

