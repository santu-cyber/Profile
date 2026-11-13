'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import { ThemeToggle } from '@/components/theme-toggle'
import { ShareButton } from '@/components/portfolio/share-button'
import { SocialIcon } from '../social-icons'
import { cn } from '@/lib/utils'

export function Navbar() {
  const portfolio = usePortfolio()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState<string>('')

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    const sectionIds = portfolio.nav.map((n) => n.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [portfolio.nav])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const top = (el as HTMLElement).offsetTop - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <ul className="hidden md:flex items-center gap-1">
            {portfolio.nav.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors rounded-md hover:text-foreground',
                    active === item.href ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex items-center gap-1.5">
            <div className="hidden sm:flex items-center gap-0.5">
              {portfolio.socials.slice(0, 3).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
            <ShareButton />
            <ThemeToggle />
            <Button
              variant="default"
              size="sm"
              className="hidden lg:inline-flex ml-1"
              onClick={() => handleNav('#contact')}
            >
              Let&apos;s talk
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl"
          >
            <ul className="px-4 py-3 space-y-1">
              {portfolio.nav.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleNav('#contact')}
                >
                  <Download className="h-4 w-4" /> Contact
                </Button>
                <a
                  href={portfolio.identity.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent transition-colors"
                >
                  <Download className="h-4 w-4" /> CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
