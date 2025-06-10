import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/layouts/header"
import ReactQueryProvider from "@/lib/providers"

export const metadata: Metadata = {
  title: "Science & Technology",
  description: "Science & Technology repository app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
