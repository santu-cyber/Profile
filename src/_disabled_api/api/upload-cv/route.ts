import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getPortfolio, savePortfolio } from '@/lib/portfolio-data'
import { revalidatePath, revalidateTag } from 'next/cache'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const PUBLIC_URL_PREFIX = '/uploads'
const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_TYPES: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/x-pdf': 'pdf',
  'application/x-msword': 'doc',
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string } | undefined)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let formData: FormData
  try { formData = await req.formData() } catch { return NextResponse.json({ error: 'Invalid form data' }, { status: 400 }) }

  const file = formData.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file provided (expected field "file")' }, { status: 400 })

  const mime = file.type || ''
  const ext = ACCEPTED_TYPES[mime]
  if (!ext) return NextResponse.json({ error: `Invalid file type: ${mime || 'unknown'}. Allowed: PDF, DOC, DOCX.` }, { status: 400 })

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: `File too large (${(file.size / 1024 / 1024).toFixed(2)} MB). Maximum allowed: 10 MB.` }, { status: 400 })
  }

  if (!existsSync(UPLOAD_DIR)) {
    try { await mkdir(UPLOAD_DIR, { recursive: true }) }
    catch (err) { console.error('[upload-cv] Failed to create upload dir:', err); return NextResponse.json({ error: 'Server could not create upload directory' }, { status: 500 }) }
  }

  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 8)
  const filename = `cv-${timestamp}-${random}.${ext}`
  const filepath = path.join(UPLOAD_DIR, filename)
  const publicUrl = `${PUBLIC_URL_PREFIX}/${filename}`

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await writeFile(filepath, buffer)
  } catch (err) {
    console.error('[upload-cv] Failed to write file:', err)
    return NextResponse.json({ error: 'Failed to save uploaded file' }, { status: 500 })
  }

  try {
    const portfolio = await getPortfolio()
    portfolio.identity.cvUrl = publicUrl
    await savePortfolio(portfolio)
  } catch (err) {
    console.error('[upload-cv] DB update failed:', err)
    try { const { unlink } = await import('fs/promises'); await unlink(filepath) } catch {}
    return NextResponse.json({ error: 'File saved but portfolio update failed. Please try again.' }, { status: 500 })
  }

  revalidateTag('portfolio', 'max')
  revalidatePath('/', 'layout')

  return NextResponse.json({ ok: true, url: publicUrl, size: file.size, type: file.type, filename })
}
