'use client'

import * as React from 'react'
import type { Portfolio } from '@/data/portfolio'

const PortfolioContext = React.createContext<Portfolio | null>(null)

export function PortfolioProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: Portfolio
}) {
  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio(): Portfolio {
  const ctx = React.useContext(PortfolioContext)
  if (!ctx) {
    throw new Error(
      'usePortfolio must be used inside <PortfolioProvider>. Wrap your section tree with <PortfolioProvider value={...}>.'
    )
  }
  return ctx
}
