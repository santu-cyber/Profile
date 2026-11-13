'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Wraps the app in next-themes (for the dark/light toggle).
 *
 * SessionProvider is removed — the static GitHub Pages deployment has no
 * auth server, so there's no admin login. To edit content, modify
 * src/data/portfolio.ts directly in your GitHub repo.
 *
 * If you ever deploy to a dynamic host (Vercel, etc.) and want the admin
 * panel back, restore SessionProvider from the worklog history.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
