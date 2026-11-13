'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Sparkles, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import { SectionHeading } from './section-heading'

export function About() {
  const portfolio = usePortfolio()
  if (!portfolio.about.enabled) return null

  return (
    <section id="about" className="py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="01 — About" title={portfolio.about.heading} />

        <div className="mt-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-5">
            {portfolio.about.bio.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-base md:text-lg leading-relaxed text-foreground/90"
              >
                {para}
              </motion.p>
            ))}

            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Sparkles className="h-4 w-4" /> Research Interests
              </div>
              <div className="flex flex-wrap gap-2">
                {portfolio.about.interests.map((interest, i) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                      {interest}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button asChild className="gap-2">
                <a href={portfolio.identity.cvUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" /> Download full CV
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-sm font-semibold mb-4">
              <GraduationCap className="h-4 w-4 text-primary" /> Education
            </div>
            <ol className="relative space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[1.45rem] before:w-px before:bg-border">
              {portfolio.about.education.map((edu, i) => (
                <motion.li
                  key={edu.degree + edu.institution}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative pl-12"
                >
                  <span className="absolute left-0 top-1 grid h-11 w-11 place-items-center rounded-full border border-border bg-background">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </span>
                  <Card className="border-border/60 bg-card/60 backdrop-blur">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">{edu.period}</div>
                      <div className="mt-1 text-sm font-semibold leading-snug">{edu.degree}</div>
                      <div className="mt-0.5 text-sm text-foreground/80">{edu.institution}</div>
                      {edu.description && (
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{edu.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
