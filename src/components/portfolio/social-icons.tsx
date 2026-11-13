'use client'

import {
  Linkedin,
  Mail,
  Globe,
  Github,
  Twitter,
  type LucideIcon,
} from 'lucide-react'

export type SocialIconName =
  | 'linkedin'
  | 'researchgate'
  | 'orcid'
  | 'googleScholar'
  | 'github'
  | 'twitter'
  | 'email'
  | 'globe'

function ResearchGateIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.586 17.05c-.258-.128-.486-.257-.715-.386c-.36-.18-.66-.36-.96-.51c-1.55-.82-3.13-1.69-4.13-3.13c1.62-2.05 2.65-4.65 3.06-7.6c.06-.46.13-.93.13-1.39c0-1.18-.43-2.21-1.46-2.65c-.77-.33-1.66-.18-2.36.21c-2.55 1.43-3.66 4.46-3.86 7.32c-.21 2.91.51 5.78 1.83 7.85c.36.56.84 1.18 1.46 1.59c-.95.36-1.92.51-2.95.41c-2.36-.26-4.06-1.49-4.62-3.6c-.41-1.54-.13-3.13.41-4.4c.13-.31.31-.61.61-.51c.26.05.46.26.41.66c-.05.51-.21.97-.26 1.43c-.06.51.05.92.31 1.23c.31.36.82.41 1.28.21c.56-.21.92-.66 1.13-1.23c.41-1.23.05-2.81-.77-3.59c-.77-.72-1.95-.66-2.86-.21c-1.18.56-2.05 1.84-2.36 3.43c-.31 1.59 0 3.13.61 4.46c.97 2.15 2.81 3.59 5.27 4.05c1.49.31 3.04.21 4.52-.26c1.49-.46 2.81-1.28 4.16-2.15c.51-.31 1.13-.66 1.69-1.08c.18-.13.36-.31.41-.46c.05-.26-.13-.41-.36-.46zM10.06 9.86c.13-1.43.41-2.86 1.18-4.05c.26-.41.61-.66 1.08-.51c.41.13.51.51.46.92c-.21 1.69-.61 3.28-1.28 4.72c-.18.41-.46.82-.97.92c-.46.1-.72-.21-.61-.66c.05-.51.13-.97.21-1.49z" />
    </svg>
  )
}

function OrcidIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.264 5.27c.46 0 .832.372.832.833s-.372.833-.832.833a.833.833 0 1 1 0-1.666zm-.222 2.916h1.667v9.723H7.042V8.186zm4.182 0h3.334c3.18 0 5.139 2.361 5.139 4.861s-1.959 4.861-5.139 4.861h-3.334V8.186zm1.667 1.5v7.361h1.667c2.667 0 3.778-1.875 3.778-3.681s-1.111-3.681-3.778-3.681h-1.667z" />
    </svg>
  )
}

function GoogleScholarIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.749-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
    </svg>
  )
}

const ICONS: Record<SocialIconName, LucideIcon | (({ className }: { className?: string }) => React.ReactElement)> = {
  linkedin: Linkedin,
  researchgate: ResearchGateIcon,
  orcid: OrcidIcon,
  googleScholar: GoogleScholarIcon,
  github: Github,
  twitter: Twitter,
  email: Mail,
  globe: Globe,
}

export function SocialIcon({
  name,
  className,
}: {
  name: SocialIconName
  className?: string
}) {
  const Icon = ICONS[name]
  if (!Icon) return <Globe className={className} aria-hidden="true" />
  return <Icon className={className} />
}
