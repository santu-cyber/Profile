'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import { SectionHeading } from './section-heading'
import { SocialIcon } from '../social-icons'

export function Contact() {
  const portfolio = usePortfolio()
  if (!portfolio.contact.enabled) return null

  return (
    <section id="contact" className="py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="06 — Contact"
          title={portfolio.contact.heading}
          description={portfolio.contact.intro}
        />

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <Card className="relative overflow-hidden border-border/60 bg-gradient-to-br from-card to-card/60 backdrop-blur h-full">
              <div aria-hidden className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative p-6 sm:p-8 flex flex-col h-full">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 mb-2">
                  Let&apos;s build something
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Reach out for collaborations, peer reviews, or speaking invitations.
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Whether you are organizing a conference, planning a research partnership, or simply curious about my work, I would love to hear from you. Email is usually the fastest path.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="gap-2">
                    <a href={`mailto:${portfolio.identity.email}`}>
                      <Mail className="h-4 w-4" /> Email me
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="gap-2">
                    <a href={portfolio.identity.cvUrl} target="_blank" rel="noopener noreferrer">
                      Download CV
                    </a>
                  </Button>
                </div>

                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 p-3">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <a href={`mailto:${portfolio.identity.email}`} className="text-sm font-medium truncate hover:underline">
                      {portfolio.identity.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 p-3">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <a href={`tel:${portfolio.identity.phone.replace(/\s/g, '')}`} className="text-sm font-medium hover:underline">
                      {portfolio.identity.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-3 sm:col-span-2">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{portfolio.contact.address}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="text-sm font-semibold mb-3">Find me online</div>
            <div className="grid gap-2.5">
              {portfolio.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/60 backdrop-blur p-4 hover:border-foreground/30 hover:bg-accent transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-background group-hover:border-foreground/30 transition-colors">
                      <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{s.label}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {(() => { try { return new URL(s.href).hostname.replace(/^www\./, '') } catch { return s.href } })()}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
