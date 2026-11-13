'use client'

import { motion } from 'framer-motion'
import {
  Users, HandHeart, Trophy, PenLine, BookOpenCheck, GraduationCap, Megaphone, type LucideIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import { SectionHeading } from './section-heading'

const serviceIcons: LucideIcon[] = [PenLine, BookOpenCheck, GraduationCap, Megaphone]

export function Services() {
  const portfolio = usePortfolio()
  if (!portfolio.services.enabled) return null

  return (
    <section
      id="services"
      className="py-20 sm:py-28 scroll-mt-20 bg-muted/30 border-y border-border/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="05 — Outreach & Activities"
          title={portfolio.services.heading}
          description="Beyond research: peer review, bioinformatics outreach, ASM membership, leadership roles, and volunteer work that keep me connected to the wider scientific community."
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolio.services.services.map((svc, i) => {
            const Icon = serviceIcons[i % serviceIcons.length]
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Card className="border-border/60 bg-card/60 backdrop-blur h-full hover:border-foreground/20 hover:shadow-sm transition-all group">
                  <CardContent className="p-5 h-full flex flex-col">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-semibold">{svc.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">{svc.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {portfolio.services.awards && portfolio.services.awards.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Grants &amp; Awards
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {portfolio.services.awards.map((item, i) => (
                <motion.div
                  key={item.role + item.organization}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Card className="border-border/60 bg-card/60 backdrop-blur h-full hover:border-foreground/20 transition-colors">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold leading-snug">{item.role}</div>
                        <div className="text-xs text-foreground/80">{item.organization}</div>
                        {item.description && (
                          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="rounded-md text-[11px] font-mono shrink-0">
                        {item.period}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Leadership &amp; Affiliations
              </h3>
            </div>
            <div className="space-y-3">
              {portfolio.services.leadership.map((item, i) => (
                <motion.div
                  key={item.role + item.organization}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="rounded-xl border border-border/60 bg-card/60 backdrop-blur p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{item.role}</div>
                      <div className="text-xs text-foreground/80">{item.organization}</div>
                    </div>
                    <Badge variant="outline" className="rounded-md text-[11px] font-mono shrink-0">
                      {item.period}
                    </Badge>
                  </div>
                  {item.description && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <HandHeart className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Volunteer Experience
              </h3>
            </div>
            <div className="space-y-3">
              {portfolio.services.volunteer.map((item, i) => (
                <motion.div
                  key={item.role + item.organization}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="rounded-xl border border-border/60 bg-card/60 backdrop-blur p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{item.role}</div>
                      <div className="text-xs text-foreground/80">{item.organization}</div>
                    </div>
                    <Badge variant="outline" className="rounded-md text-[11px] font-mono shrink-0">
                      {item.period}
                    </Badge>
                  </div>
                  {item.description && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
