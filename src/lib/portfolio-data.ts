import { unstable_cache } from 'next/cache'
import { db } from '@/lib/db'
import { portfolio as defaultPortfolio, type Portfolio } from '@/data/portfolio'

async function readPortfolioUncached(): Promise<Portfolio> {
  try {
    const row = await db.portfolio.findUnique({ where: { id: 1 } })
    if (row?.data) {
      return JSON.parse(row.data) as Portfolio
    }
  } catch (err) {
    console.warn('[portfolio-data] DB read failed, using static defaults:', err instanceof Error ? err.message : err)
  }
  return defaultPortfolio
}

export const getPortfolio = unstable_cache(
  readPortfolioUncached,
  ['portfolio-data'],
  { revalidate: 5, tags: ['portfolio'] }
)

export async function savePortfolio(next: Portfolio): Promise<{ updatedAt: Date }> {
  const json = JSON.stringify(next, null, 2)
  const record = await db.portfolio.upsert({
    where: { id: 1 },
    create: { id: 1, data: json },
    update: { data: json },
  })
  return { updatedAt: record.updatedAt }
}

export const defaultPortfolioData = defaultPortfolio
