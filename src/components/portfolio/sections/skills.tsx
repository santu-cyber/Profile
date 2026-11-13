'use client'

import { motion } from 'framer-motion'
import { Microscope, Dna, Code2, Atom, FlaskConical, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import type { SkillCategory } from '@/data/portfolio'
import { SectionHeading } from './section-heading'

const CATEGORY_ICONS: LucideIcon[] = [Microscope, Dna, Code2, Atom, FlaskConical]

function CategoryCard({ cat, index }: { cat: SkillCategory; index: number }) {
  const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Card className="border-border/60 bg-card/60 backdrop-blur h-full hover:border-foreground/20 hover:shadow-sm transition-all">
        <CardContent className="p-5 sm:p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold leading-tight">{cat.title}</h3>
          </div>
          {cat.description && (
            <p className="text-xs leading-relaxed text-muted-foreground mb-4">{cat.description}</p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md border border-border/60 bg-background/60 px-2 py-0.5 text-[11px] font-medium text-foreground/90 hover:border-foreground/30 hover:bg-accent transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function Skills() {
  const portfolio = usePortfolio()
  if (!portfolio.skills?.enabled) return null

  return (
    <section id="skills" className="py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="02 — Skills"
          title={portfolio.skills.heading}
          description={portfolio.skills.intro}
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.skills.categories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
