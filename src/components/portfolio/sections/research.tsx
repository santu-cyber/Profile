'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  FileText, Loader2, Mic2, Award, ExternalLink, ChevronRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

type SubTab = 'publications' | 'ongoing' | 'conferences' | 'certifications'

export function Research() {
  const portfolio = usePortfolio()
  const [tab, setTab] = React.useState<SubTab>('publications')

  if (!portfolio.research.enabled) return null

  const tabs: { key: SubTab; label: string; icon: typeof FileText; count: number }[] = [
    { key: 'publications', label: 'Publications', icon: FileText, count: portfolio.research.publications.length },
    { key: 'ongoing', label: 'Ongoing', icon: Loader2, count: portfolio.research.ongoing.length },
    { key: 'conferences', label: 'Conferences', icon: Mic2, count: portfolio.research.conferences.length },
    { key: 'certifications', label: 'Certifications', icon: Award, count: portfolio.research.certifications.length },
  ]

  return (
    <section id="research" className="py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="04 — Research"
          title={portfolio.research.heading}
          description={portfolio.research.intro}
        />

        <div className="mt-8 flex flex-wrap gap-1.5">
          {tabs.map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all',
                tab === key
                  ? 'border-foreground/30 bg-foreground text-background'
                  : 'border-border/60 bg-background hover:bg-accent text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              <span className={cn('ml-0.5 text-[10px] tabular-nums', tab === key ? 'text-background/70' : 'text-muted-foreground/60')}>
                {count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'publications' && (
            <div className="grid gap-3">
              {portfolio.research.publications.map((pub, i) => (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Card className="border-border/60 bg-card/60 backdrop-blur hover:border-foreground/20 transition-colors">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <Badge variant="outline" className="rounded-md px-2 py-1 font-mono text-[11px] tabular-nums">
                          {pub.year}
                        </Badge>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-sm sm:text-base font-semibold leading-snug">{pub.title}</h3>
                            {pub.link && (
                              <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 grid h-8 w-8 place-items-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                                aria-label="Open publication"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground italic">{pub.venue}</div>
                          <div className="mt-1 text-xs text-foreground/70">{pub.authors}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'ongoing' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolio.research.ongoing.map((item, i) => (
                <motion.div
                  key={item.role + item.organization}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Card className="border-border/60 bg-card/60 backdrop-blur h-full">
                    <CardContent className="p-5 h-full flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-primary mb-2">
                        <Loader2 className="h-3.5 w-3.5 animate-spin-slow" />
                        In progress · {item.period}
                      </div>
                      <h3 className="text-sm font-semibold leading-snug">{item.organization}</h3>
                      <div className="text-xs text-muted-foreground">{item.role}</div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'conferences' && (
            <div className="grid gap-3">
              {portfolio.research.conferences.map((conf, i) => (
                <motion.div
                  key={conf.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur p-4 hover:border-foreground/20 transition-colors"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border/60 bg-background">
                    <Mic2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium leading-snug">{conf.title}</div>
                    <div className="text-xs text-muted-foreground">{conf.venue}</div>
                  </div>
                  {conf.note && (
                    <Badge variant="secondary" className="hidden sm:inline-flex rounded-md text-[11px] font-medium px-2 py-0.5 gap-1">
                      <Award className="h-3 w-3" />
                      {conf.note}
                    </Badge>
                  )}
                  <Badge variant="outline" className="rounded-md font-mono text-[11px] tabular-nums shrink-0">
                    {conf.year}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'certifications' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {portfolio.research.certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Card className="border-border/60 bg-card/60 backdrop-blur h-full hover:border-foreground/20 transition-colors">
                    <CardContent className="p-5 h-full flex flex-col">
                      <Award className="h-5 w-5 text-primary mb-3" />
                      <h3 className="text-sm font-semibold leading-snug">{cert.title}</h3>
                      <div className="mt-1 text-xs text-muted-foreground">{cert.issuer}</div>
                      <div className="mt-auto pt-3 text-xs font-mono text-muted-foreground/70">{cert.year}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
