'use client'

import * as React from 'react'
import {
  Share2, Link as LinkIcon, Linkedin, Twitter, MessageCircle, QrCode, Check,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { usePortfolio } from '@/components/portfolio/portfolio-context'

export function ShareButton() {
  const portfolio = usePortfolio()
  const [copied, setCopied] = React.useState(false)
  // SSR-safe mount guard: prevents hydration mismatch from the
  // `if (canUseNativeShare)` branch (navigator is undefined on server,
  // defined on client → would render different components on each side).
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://preview-chat-1189ebaf-3a8f-4c5d-8711-0e3789291638.space-z.ai/'
  const shareText = `Check out ${portfolio.identity.name}'s portfolio — ${portfolio.identity.title}`

  const canUseNativeShare =
    mounted &&
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function'

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: `${portfolio.identity.name} — ${portfolio.identity.title}`,
        text: shareText,
        url: shareUrl,
      })
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') {
        console.warn('Native share failed:', err)
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({ title: 'Link copied!', description: shareUrl })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = shareUrl
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        toast({ title: 'Link copied!', description: shareUrl })
        setTimeout(() => setCopied(false), 2000)
      } catch {
        toast({ title: 'Copy failed', description: 'Copy this manually: ' + shareUrl, variant: 'destructive' })
      }
      document.body.removeChild(textarea)
    }
  }

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600')
  }

  const shareOnLinkedIn = () => openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)
  const shareOnTwitter = () => openShareWindow(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`)
  const shareOnWhatsApp = () => openShareWindow(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`)

  const downloadQRCode = () => {
    const a = document.createElement('a')
    a.href = '/portfolio-qr-code.png'
    a.download = `${portfolio.identity.name.replace(/\s+/g, '-').toLowerCase()}-portfolio-qr.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast({ title: 'QR code downloaded', description: 'Print it on your CV, business card, or poster.' })
  }

  if (canUseNativeShare) {
    return (
      <Button variant="ghost" size="icon" aria-label="Share" className="rounded-full" onClick={handleNativeShare}>
        <Share2 className="h-[18px] w-[18px]" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Share" className="rounded-full">
          <Share2 className="h-[18px] w-[18px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Share this portfolio
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer gap-2.5 py-2">
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <LinkIcon className="h-4 w-4" />}
          <span className="text-sm">{copied ? 'Copied!' : 'Copy link'}</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={shareOnLinkedIn} className="cursor-pointer gap-2.5 py-2">
          <Linkedin className="h-4 w-4 text-[#0a66c2]" />
          <span className="text-sm">Share on LinkedIn</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer gap-2.5 py-2">
          <Twitter className="h-4 w-4" />
          <span className="text-sm">Share on X / Twitter</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={shareOnWhatsApp} className="cursor-pointer gap-2.5 py-2">
          <MessageCircle className="h-4 w-4 text-[#25d366]" />
          <span className="text-sm">Share on WhatsApp</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={downloadQRCode} className="cursor-pointer gap-2.5 py-2">
          <QrCode className="h-4 w-4" />
          <span className="text-sm">Download QR code</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
