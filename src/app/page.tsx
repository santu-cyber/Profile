import { Navbar } from '@/components/portfolio/sections/navbar'
import { Hero } from '@/components/portfolio/sections/hero'
import { About } from '@/components/portfolio/sections/about'
import { Skills } from '@/components/portfolio/sections/skills'
import { Experience } from '@/components/portfolio/sections/experience'
import { Research } from '@/components/portfolio/sections/research'
import { Services } from '@/components/portfolio/sections/services'
import { Contact } from '@/components/portfolio/sections/contact'
import { Footer } from '@/components/portfolio/sections/footer'
import { PortfolioProvider } from '@/components/portfolio/portfolio-context'
import { portfolio } from '@/data/portfolio'

/**
 * Static home page.
 *
 * Reads portfolio data directly from src/data/portfolio.ts at build time.
 * No database, no API routes, no admin bar — this is a pure static page
 * suitable for hosting on GitHub Pages, Netlify static, Cloudflare Pages, etc.
 *
 * To update content: edit src/data/portfolio.ts in your GitHub repo,
 * commit, and the GitHub Actions workflow auto-rebuilds + deploys in ~1 min.
 */
export default function Home() {
  return (
    <PortfolioProvider value={portfolio}>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main id="main" className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Research />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  )
}
