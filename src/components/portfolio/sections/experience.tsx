'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, FlaskConical, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

type TabKey = 'research' | 'professional'

export function Experience() {
  const portfolio = usePortfolio()
  const [tab, setTab] = React.useState<TabKey>('research')

  if (!portfolio.experience.enabled) return null

  const allTabs = [
    { key: 'research' as const, label: 'Research', icon: FlaskConical, count: portfolio.experience.research.length },
    { key: 'professional' as const, label: 'Professional', icon: Briefcase, count: portfolio.experience.professional.length },
  ]
  const tabs = allTabs.filter((t) => t.count > 0)
  if (tabs.length === 0) return null

  const activeKey: TabKey = tabs.some((t) => t.key === tab) ? tab : tabs[0].key
  const items = activeKey === 'research' ? portfolio.experience.research : portfolio.experience.professional
  const showSwitcher = tabs.length > 1

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 scroll-mt-20 bg-muted/30 border-y border-border/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="03 — Experience"
          title={portfolio.experience.heading}
          description="A timeline of research assistantships — spanning wet-lab molecular microbiology and field ecology — with the techniques, tools, and skills I developed along the way."
        />

        {showSwitcher && (
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 backdrop-blur p-1">
            {tabs.map(({ key, label, icon: Icon, count }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  'relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                  activeKey === key ? 'text-background' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {activeKey === key && (
                  <motion.span
                    layoutId="experience-tab"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                  <span className={cn('ml-1 text-[10px] tabular-nums', activeKey === key ? 'text-background/70' : 'text-muted-foreground/60')}>
                    {count}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.role + item.organization}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Card className="border-border/60 bg-card/60 backdrop-blur overflow-hidden hover:border-foreground/20 transition-colors">
                <CardContent className="p-5 sm:p-6">
                  <div className="grid sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-3">
                      <div className="text-xs font-medium text-primary">{item.period}</div>
                      {item.location && (
                        <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {item.location}
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-9">
                      <div className="text-base font-semibold">{item.role}</div>
                      <div className="text-sm text-foreground/80">{item.organization}</div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.tags.map((t) => (
                            <Badge key={t} variant="outline" className="rounded-full text-[11px] font-medium px-2.5 py-0.5">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
