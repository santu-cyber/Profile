'use client'

import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import { SocialIcon } from '../social-icons'

export function Footer() {
  const portfolio = usePortfolio()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={scrollTop} className="group flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-bold text-xs">
              {portfolio.identity.initials}
            </span>
            <span className="text-sm font-medium">{portfolio.identity.name}</span>
          </button>

          <p className="text-xs text-muted-foreground text-center order-last sm:order-none">
            © {new Date().getFullYear()} {portfolio.identity.name}. Built with Next.js &amp; Tailwind CSS.
          </p>

          <div className="flex items-center gap-0.5">
            {portfolio.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <SocialIcon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
            <Button variant="ghost" size="icon" aria-label="Back to top" onClick={scrollTop} className="rounded-full ml-1">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
