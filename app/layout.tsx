import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { siteConfig } from "@/components/site/catalog"
import { themeInitScript } from "@/components/site/theme-toggle"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const title = `${siteConfig.name} · ${siteConfig.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: { default: title, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Remotion",
    "Remotion components",
    "Remotion templates",
    "shadcn registry",
    "React video",
    "programmatic video",
    "motion graphics React",
  ],
  authors: [{ name: "Sumit Dey" }],
  creator: "Sumit Dey",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-svh`}>
        {children}
      </body>
    </html>
  )
}
