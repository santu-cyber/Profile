/**
 * ============================================================
 *  PORTFOLIO CONTENT  —  EDIT THIS FILE TO MAKE IT YOURS
 * ============================================================
 *  This file is the single source of truth for the static seed
 *  data. The live site reads from the database (which is seeded
 *  from this file). Use the admin editor (sign in as admin →
 *  Edit Portfolio) to change values in the DB without code.
 * ============================================================
 */

export type NavItem = { label: string; href: string };
export type SocialLink = {
  label: string;
  href: string;
  icon: "linkedin" | "researchgate" | "orcid" | "googleScholar" | "github" | "twitter" | "email" | "globe";
};
export type EducationItem = { degree: string; institution: string; period: string; description?: string };
export type ExperienceItem = { role: string; organization: string; period: string; location?: string; description: string; tags?: string[] };
export type PublicationItem = { year: string; title: string; venue: string; authors: string; link?: string };
export type CertificationItem = { title: string; issuer: string; year: string };
export type ServiceItem = { title: string; description: string };
export type ActivityItem = { role: string; organization: string; period: string; description?: string };
export type ConferenceItem = { year: string; title: string; venue: string; note?: string };
export type SkillCategory = { title: string; description?: string; skills: string[] };

export const portfolio = {
  identity: {
    name: "Santu Biswas",
    firstName: "Santu",
    lastName: "Biswas",
    initials: "SB",
    title: "Molecular Microbiologist & Bioinformatician",
    tagline:
      "Applying molecular microbiology, bacterial genomics, and bioinformatics to characterize fish pathogens, track antimicrobial resistance, and discover in silico drug targets for sustainable aquaculture.",
    location: "Gazipur Agricultural University, Bangladesh",
    email: "santub035@gmail.com",
    phone: "+880 1XXX-XXXXXX",
    avatarUrl: "/uploads/avatar-1792981852017-ah8nyk.jpg",
    cvUrl: "/uploads/cv-1792984259846-x3ys80.pdf",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Research", href: "#research" },
    { label: "Activities", href: "#services" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/santu-biswas", icon: "linkedin" },
    { label: "Google Scholar", href: "https://scholar.google.com/", icon: "googleScholar" },
    { label: "ORCID", href: "https://orcid.org/", icon: "orcid" },
    { label: "ResearchGate", href: "https://www.researchgate.net/", icon: "researchgate" },
  ] satisfies SocialLink[],
  heroStats: [
    { label: "Publications", value: "4" },
    { label: "Bacterial isolates processed", value: "150+" },
    { label: "Conferences", value: "4" },
    { label: "Awards & Honours", value: "3" },
  ],
  about: {
    enabled: true,
    heading: "About Me",
    bio: [
      "I am a molecular microbiologist and bioinformatician pursuing an M.S. in Biotechnology and Genetic Engineering at Gazipur Agricultural University, Bangladesh. My research focuses on characterizing fish-pathogenic bacteria — particularly Streptococcus agalactiae — through whole-genome sequencing, comparative genomics, and in silico drug target analysis, with the goal of advancing disease control in sustainable tilapia aquaculture.",
      "My work integrates wet-lab molecular microbiology — PCR, DNA extraction, bacterial culture, primer design — with computational genomics and bioinformatics pipelines. Through my graduate research at the Institute of Biotechnology and Genetic Engineering (IBGE) lab, I have processed over 150 bacterial isolates from diseased fish, designed species-specific PCR primers for rapid Streptococcus detection, and contributed to multiple peer-reviewed genome announcements in ASM's Microbiology Resource Announcements. I am also deeply engaged in scientific outreach — serving as Bioinformatics Campus Coordinator for Dawn of Bioinformatics and as a contributing member of the American Society for Microbiology's Global Outreach network.",
    ],
    interests: [
      "Molecular Microbiology", "Fish Pathogens", "Bacterial Genomics", "Comparative Genomics",
      "Host–Pathogen Interactions", "Bioinformatics", "Antimicrobial Resistance", "Drug Target Discovery",
    ],
    education: [
      {
        degree: "M.S. in Biotechnology and Genetic Engineering (CGPA 3.81/4.00)",
        institution: "Institute of Biotechnology and Genetic Engineering, Gazipur Agricultural University (GAU), Gazipur-1706, Bangladesh",
        period: "2024 – Present",
        description: "Thesis: \"Genomic Characterization, Point-of-Care Detection, and In Silico Drug Target Analysis of Streptococcus agalactiae Causing Streptococcosis in Tilapia.\"",
      },
      {
        degree: "B.S. in Fisheries (CGPA 3.57/4.00)",
        institution: "Department of Fisheries and Marine Bioscience, Gopalganj Science and Technology University (GSTU), Gopalganj-8105, Bangladesh",
        period: "2019 – 2022",
        description: "Thesis: \"Distribution and Potential Ecological Risk of Suckermouth Catfish Invasion in Bangladesh.\"",
      },
    ] satisfies EducationItem[],
  },
  skills: {
    enabled: true,
    heading: "Technical Skills",
    intro: "A hybrid toolkit spanning molecular microbiology wet-lab workflows and computational genomics — bridging the bench and the bioinformatics pipeline.",
    categories: [
      {
        title: "Molecular Biology & Microbiology",
        description: "Wet-lab workflows for bacterial isolation, characterization, and detection.",
        skills: ["Bacterial isolation, culture & preservation", "Phenotypic & biochemical characterization", "Genomic DNA/RNA extraction", "Conventional PCR & RT-PCR", "Agarose gel electrophoresis", "Primer design & validation", "Antimicrobial susceptibility testing (AST)", "Aseptic technique & biosafety"],
      },
      {
        title: "Genomics & Bioinformatics",
        description: "End-to-end genome analysis from raw reads to comparative insights.",
        skills: ["Whole-genome assembly & quality assessment", "Genome annotation (Prokka, BUSCO)", "Comparative & pan-genome analysis (Roary)", "Phylogenetic analysis (FastTree, MEGA)", "Average nucleotide identity (ANI)", "Sequence alignment & variant analysis", "Virulence factor & AMR gene identification (ABRicate)", "Plasmid identification"],
      },
      {
        title: "Programming & Computing",
        description: "Scripting and reproducible analysis on Linux workstations.",
        skills: ["R & RStudio", "Python", "Linux command line (Bash)", "Reproducible analysis pipelines"],
      },
      {
        title: "Molecular Modeling & Drug Discovery",
        description: "In silico target identification and structural analysis.",
        skills: ["Molecular docking (AutoDock Vina)", "Protein structure visualization (PyMOL, BIOVIA Discovery Studio)", "Protein structure prediction (AlphaFold)", "In silico drug target analysis"],
      },
      {
        title: "Bioinformatics Tools & Scientific Visualization",
        description: "Specialised software for sequence, genome, and ecological data.",
        skills: ["BLAST & Primer-BLAST", "MEGA, BioEdit, Geneious Prime, Benchling", "FastQC, Trimmomatic, SPAdes, QUAST, Kraken2", "ArcGIS & Google Earth (ecological mapping)", "BioRender (scientific illustration)", "MS Word, Excel, PowerPoint"],
      },
    ] satisfies SkillCategory[],
  },
  experience: {
    enabled: true,
    heading: "Research Experience",
    research: [
      {
        role: "Graduate Research Assistant",
        organization: "Institute of Biotechnology and Genetic Engineering (IBGE) Lab, Gazipur Agricultural University",
        period: "Feb 2024 – Present",
        location: "Gazipur-1706, Bangladesh",
        description:
          "Conducting molecular and microbiological experiments for the characterization of fish-pathogenic bacteria using PCR, DNA extraction, bacterial culture, and genome analysis. Maintained and processed over 150 bacterial isolates from diseased fish for genomic and molecular analyses; performed DNA extraction, PCR, and gel electrophoresis; designed and validated species-specific PCR primers for rapid detection of Streptococcus spp.; prepared reagents, managed lab inventory, and followed biosafety protocols; contributed to multiple peer-reviewed manuscripts through collaborative scientific writing.",
        tags: ["Molecular Microbiology", "PCR", "Primer Design", "Genomics", "Streptococcus"],
      },
      {
        role: "Research Assistant",
        organization: "Department of Fisheries and Marine Bioscience, Gopalganj Science and Technology University (GSTU)",
        period: "2023 – 2024",
        location: "Gopalganj-8100, Bangladesh",
        description:
          "Designed and conducted field surveys across regions invaded by suckermouth catfish; collected ecological data on species presence, habitat conditions, and environmental parameters; analyzed distribution patterns and ecological risks using field and survey tools; collaborated with local fishers and Union Fisheries Officers for ground-level insights; managed and cleaned field data for statistical analysis, prepared the final report, and successfully defended the B.S. thesis.",
        tags: ["Field Research", "Ecology", "Invasion Biology", "Data Analysis", "GIS"],
      },
    ] satisfies ExperienceItem[],
    professional: [] satisfies ExperienceItem[],
  },
  research: {
    enabled: true,
    heading: "Research & Publications",
    intro:
      "My published work centres on whole-genome sequencing of fish-pathogenic bacteria isolated from Bangladeshi aquaculture — making genomic resources available to the broader microbiology community through ASM's Microbiology Resource Announcements.",
    publications: [
      {
        year: "2026",
        title: "Whole-genome sequence of Streptococcus agalactiae strain GIFTS31 isolated from streptococcosis-infected Nile tilapia in Bangladesh",
        venue: "Microbiology Resource Announcement, ASM",
        authors: "Biswas S, Babu MR, Yeasmin F, Saha P, Guha A, Hossain MA, Rahman MM, Islam T, Rahman MM",
        link: "https://doi.org/10.1128/mra.00441-26",
      },
      {
        year: "2026",
        title: "Draft genome sequence of fish-pathogenic Enterococcus faecalis GIFTE22 isolated from diseased Nile tilapia (Oreochromis niloticus)",
        venue: "Microbiology Resource Announcement, ASM",
        authors: "Biswas S, Babu MR, Yeasmin F, Saha P, Guha A, Rahman MM, Islam T, Rahman MM",
        link: "https://doi.org/10.1128/mra.00416-26",
      },
      {
        year: "2026",
        title: "Genome sequence of Escherichia coli H1G2: a B1 lineage isolated from the gut of Hilsa shad (Tenualosa ilisha) of Bangladesh",
        venue: "Microbiology Resource Announcement, ASM",
        authors: "Galib FA, Kafi AA, Biswas S, Hasnat S, Gupta DR, Hoque MN, Rahman MM, Rahman MM, Islam T",
        link: "https://doi.org/10.1128/mra.00138-26",
      },
      {
        year: "2026",
        title: "Draft genome sequence of Bacillus cereus HS120, a probiotic candidate isolated from the gut of hilsa (Tenualosa ilisha)",
        venue: "Microbiology Resource Announcement, ASM",
        authors: "Yeasmin F, Babu MR, Saha P, Biswas S, Guha A, Islam T, Gupta DR, Rahman MM",
        link: "https://doi.org/10.1128/mra.00151-26",
      },
    ] satisfies PublicationItem[],
    ongoing: [
      {
        role: "M.S. Thesis Project",
        organization: "Genomic Characterization, Point-of-Care Detection, and In Silico Drug Target Analysis of Streptococcus agalactiae Causing Streptococcosis in Tilapia",
        period: "2024 – Present",
        description:
          "An integrated pipeline combining whole-genome sequencing, species-specific PCR primer design for point-of-care detection, and in silico drug target identification against S. agalactiae isolates from Bangladeshi tilapia farms.",
      },
      {
        role: "Conference Study",
        organization: "AI-Assisted Genomic Insights into Host Adaptation and Virulence of Fish-Pathogenic Streptococcus agalactiae in Aquaculture in Bangladesh",
        period: "2025 – Present",
        description:
          "Applying machine-learning-assisted comparative genomics to investigate host adaptation signatures and virulence gene repertoires across S. agalactiae isolates from farmed Nile tilapia.",
      },
    ] satisfies ActivityItem[],
    conferences: [
      {
        year: "2026",
        title: "AI-Assisted Genomic Insights into Host Adaptation and Virulence of Fish-Pathogenic Streptococcus agalactiae in Aquaculture in Bangladesh",
        venue: "6th Young Scientist Congress (YSC 2026), Bangladesh Academy of Sciences (BAS), Dhaka",
        note: "Oral Presentation",
      },
      {
        year: "2025",
        title: "Identification of Streptococcus agalactiae from Streptococcosis in Nile tilapia and Biocontrol Agents Against Streptococcosis",
        venue: "6th International Conference of Biotechnology on Health and Agriculture (ICBHA-2025), GNOBB",
        note: "Oral Presentation",
      },
      {
        year: "2025",
        title: "Exploring Native Probiotic Strains for the Sustainable Cultivation of Tiger Shrimp (Penaeus monodon)",
        venue: "International Biotechnology Conference (IBC-2025), BRAC University, Dhaka",
        note: "Best Poster Presentation",
      },
      {
        year: "2025",
        title: "Distribution and Potential Ecological Risk of Suckermouth Catfish Invasion in Bangladesh",
        venue: "10th Biennial Fisheries Conference and Research Fair 2025, Next Generation Fisheries & Aquaculture",
        note: "Best Poster Presentation",
      },
    ] satisfies ConferenceItem[],
    certifications: [
      { title: "Tools and Techniques of Bioinformatics (80 hrs)", issuer: "Dept. of CSIT, GAU — EDGE Project, Bangladesh Computer Council, ICT Division", year: "2024" },
      { title: "Introduction to Programming with Python (60 hrs)", issuer: "Dept. of CSE, GSTU — EDGE Project, Bangladesh Computer Council, ICT Division", year: "2023" },
      { title: "R Programming & Data Science (4 days)", issuer: "Iskulghar — Research Aid Bangladesh", year: "2024" },
      { title: "Computer-Aided Drug Design A to Z (4 days)", issuer: "Dawn of Bioinformatics Limited Bangladesh", year: "2024" },
      { title: "Whole-Genome Sequencing of Bacterial Genomes: Tools and Applications", issuer: "Technical University of Denmark (DTU), via Coursera", year: "2024" },
    ] satisfies CertificationItem[],
  },
  services: {
    enabled: true,
    heading: "Outreach & Activities",
    services: [
      { title: "Bioinformatics Outreach", description: "Serve as Bioinformatics Campus Coordinator for Dawn of Bioinformatics, organising workshops and training sessions that make genomics and computational biology accessible to undergraduate students across the GAU campus." },
      { title: "ASM Global Outreach", description: "Contributing member of the American Society for Microbiology's Global Outreach network, helping connect Bangladeshi early-career microbiologists with international research, mentoring, and capacity-building opportunities." },
      { title: "Peer Review & Manuscripts", description: "Contributing author on multiple genome-announcement manuscripts submitted to ASM's Microbiology Resource Announcements, with experience in collaborative scientific writing, data sharing, and reviewer responsiveness." },
      { title: "Mentoring & Science Communication", description: "Mentor junior lab members in molecular workflows (PCR, DNA extraction, biosafety) and contribute to accessible scientific communication through conference posters, oral presentations, and BioRender illustrations." },
    ] satisfies ServiceItem[],
    leadership: [
      { role: "Bioinformatics Campus Coordinator", organization: "Dawn of Bioinformatics Ltd. BD", period: "2025 – Present", description: "Coordinate campus-level bioinformatics training, workshops, and student engagement activities." },
      { role: "Global Outreach — Contributing Member", organization: "American Society for Microbiology (ASM)", period: "2025 – Present", description: "Contribute to ASM's global outreach initiatives connecting microbiologists across borders." },
      { role: "Former General Secretary", organization: "Basundhara Shuvashangha, GSTU-8105", period: "2024 – 2025", description: "Led cultural and community engagement programmes for the student body." },
      { role: "Former Executive Member", organization: "Gopalganj Science and Technology Higher Society, GSTU-8105", period: "2022 – 2023", description: "Organised science outreach and academic events for undergraduate peers." },
    ] satisfies ActivityItem[],
    volunteer: [
      { role: "Former Sub-coordinator (Logistics)", organization: "BD Clean, Gopalganj", period: "2020 – 2024", description: "Volunteered in community clean-up and environmental awareness drives across Gopalganj district, coordinating logistics for volunteer teams." },
    ] satisfies ActivityItem[],
    awards: [
      { role: "National Science and Technology Fellowship 2024–2025", organization: "Ministry of Science and Technology, Government of the People's Republic of Bangladesh", period: "2024 – 2025", description: "Awarded in recognition of academic and research merit in the M.S. program." },
      { role: "Best Poster Presenter", organization: "IBC-2025 — Harnessing Sustainable Environment, Agriculture, and Health, BRAC University", period: "Jun 2025", description: "Awarded for the poster on native probiotic strains for sustainable tiger shrimp cultivation." },
      { role: "Best Poster Presenter", organization: "10th Biennial Fisheries Conference and Research Fair 2025", period: "Dec 2025", description: "Awarded for the poster on the ecological risk of suckermouth catfish invasion in Bangladesh." },
      { role: "Merit Scholarship (Academic Excellence)", organization: "Gazipur Agricultural University", period: "2024", description: "Awarded for outstanding performance in the 5th term of the M.S. program." },
    ] satisfies ActivityItem[],
  },
  contact: {
    enabled: true,
    heading: "Get in Touch",
    intro:
      "Open to research collaborations, peer review requests, conference invitations, and conversations about M.S. and Ph.D. opportunities in molecular microbiology and bacterial genomics. The fastest way to reach me is email — I usually reply within 48 hours.",
    address: "Institute of Biotechnology and Genetic Engineering, Gazipur Agricultural University, Gazipur-1706, Bangladesh",
  },
};

export type Portfolio = typeof portfolio;
