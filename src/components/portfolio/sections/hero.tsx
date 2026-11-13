'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import { SocialIcon } from '../social-icons'

export function Hero() {
  const portfolio = usePortfolio()

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      const top = (el as HTMLElement).offsetTop - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(var(--foreground-rgb,15,23,42),0.04)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,oklch(0.922_0_0/0.4)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.922_0_0/0.4)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)] dark:[background-image:linear-gradient(to_right,oklch(1_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.05)_1px,transparent_1px)]"
      />

      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            className="lg:col-span-5 order-1 lg:order-1"
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative mr-auto max-w-[260px] sm:max-w-[320px] lg:max-w-[420px]">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-2xl"
              />
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden ring-1 ring-border/60 shadow-2xl bg-muted">
                {portfolio.identity.avatarUrl ? (
                  <img
                    src={portfolio.identity.avatarUrl}
                    alt={`${portfolio.identity.name} — ${portfolio.identity.title}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                    <span className="text-7xl font-bold">{portfolio.identity.initials}</span>
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md px-3 py-2 text-white"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-medium truncate">{portfolio.identity.location}</span>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: 'easeOut' }}
                className="hidden lg:flex absolute -bottom-5 -right-5 flex-col items-center justify-center rounded-2xl border border-border/60 bg-background/95 backdrop-blur-md shadow-xl px-4 py-3"
              >
                <div className="text-2xl font-bold tabular-nums">
                  {portfolio.heroStats[0]?.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {portfolio.heroStats[0]?.label}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to research collaborations &amp; speaking invitations
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Hello, I&apos;m{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                {portfolio.identity.firstName}
              </span>
              <br className="hidden sm:block" />
              <span className="text-foreground/90">{portfolio.identity.lastName}</span>
              <span className="text-primary">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {portfolio.identity.title}{' '}
              <span className="block mt-1 text-base text-muted-foreground/80">
                {portfolio.identity.tagline}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button size="lg" asChild className="gap-2">
                <a href={portfolio.identity.cvUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('#research')} className="gap-2">
                Explore My Research
              </Button>
              <Button size="lg" variant="ghost" onClick={() => scrollTo('#contact')} className="gap-2">
                Contact Me
              </Button>
              <div className="hidden sm:flex items-center gap-1 ml-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {portfolio.identity.location}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.9, ease: 'easeOut' }}
              className="mt-8 grid grid-cols-3 gap-3 max-w-md"
            >
              {portfolio.heroStats.slice(1).map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/60 bg-card/60 backdrop-blur p-3"
                >
                  <div className="text-xl font-bold tabular-nums">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground leading-tight mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 1.0, ease: 'easeOut' }}
              className="mt-6 flex items-center gap-1.5"
            >
              {portfolio.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-background/60 backdrop-blur text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-accent transition-all"
                >
                  <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={() => scrollTo('#about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to about"
        >
          <span>Scroll</span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-border/60">
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </span>
        </motion.button>
      </div>
    </section>
  )
}
