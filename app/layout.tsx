import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/contexts"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "WEBNIQUE - Digital Agency",
  description: "Building brands, boosting businesses, and redefining possibilities",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter font-semibold">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
