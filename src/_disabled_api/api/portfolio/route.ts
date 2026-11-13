import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getPortfolio, savePortfolio, defaultPortfolioData } from '@/lib/portfolio-data'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Portfolio } from '@/data/portfolio'

export async function GET() {
  try {
    const data = await getPortfolio()
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read portfolio', detail: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string } | undefined)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

export async function PUT(req: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Expected a portfolio object' }, { status: 400 })
  }

  const next = body as Portfolio
  const requiredKeys: (keyof Portfolio)[] = ['identity', 'nav', 'socials', 'heroStats', 'about']
  for (const key of requiredKeys) {
    if (!(key in next)) return NextResponse.json({ error: `Missing required field: ${String(key)}` }, { status: 400 })
  }

  try {
    const { updatedAt } = await savePortfolio(next)
    revalidateTag('portfolio', 'max')
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true, updatedAt: updatedAt.toISOString() })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save portfolio', detail: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  const url = new URL(req.url)
  const action = url.searchParams.get('action')

  if (action === 'reset') {
    try {
      const { updatedAt } = await savePortfolio(defaultPortfolioData)
      revalidateTag('portfolio', 'max')
      revalidatePath('/', 'layout')
      return NextResponse.json({ ok: true, updatedAt: updatedAt.toISOString(), reset: true })
    } catch (err) {
      return NextResponse.json({ error: 'Failed to reset portfolio', detail: err instanceof Error ? err.message : String(err) }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
