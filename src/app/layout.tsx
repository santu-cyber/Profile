import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { SkipToContent } from "@/components/skip-to-content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santu Biswas — Molecular Microbiologist & Bioinformatician",
  description: "Applying molecular microbiology, bacterial genomics, and bioinformatics to characterize fish pathogens, track antimicrobial resistance, and discover in silico drug targets for sustainable aquaculture.",
  keywords: ["Santu Biswas", "Molecular Microbiologist", "Bioinformatician", "researcher", "portfolio", "Streptococcus agalactiae", "bacterial genomics", "publications"],
  authors: [{ name: "Santu Biswas" }],
  openGraph: {
    title: "Santu Biswas — Molecular Microbiologist & Bioinformatician",
    description: "Applying molecular microbiology, bacterial genomics, and bioinformatics to characterize fish pathogens, track antimicrobial resistance, and discover in silico drug targets for sustainable aquaculture.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santu Biswas — Molecular Microbiologist & Bioinformatician",
    description: "Applying molecular microbiology, bacterial genomics, and bioinformatics to characterize fish pathogens, track antimicrobial resistance, and discover in silico drug targets for sustainable aquaculture.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          <SkipToContent />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
