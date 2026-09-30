import type { CVData } from "../types/cv";

export const dummyCVData: CVData = {
  theme: "modern",
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  fullName: "Sarah Jenkins",
  designation: "Senior Full Stack Software Architect",
  summary: "Results-driven Software Architect with 7+ years of experience leading cross-functional teams, designing resilient cloud-native architectures, and shipping scalable web applications. Passionate about developer tooling, clean code, and intuitive user experiences with high performance and accessibility standards.",
  phone: "+1 (555) 234-5678",
  email: "sarah.jenkins@example.com",
  address: "San Francisco, CA, USA",
  website: "https://sarahjenkins.dev",
  linkedin: "linkedin.com/in/sarahjenkins",
  github: "github.com/sarahjenkins",
  skills: [
    { id: "s-1", name: "TypeScript & JavaScript" },
    { id: "s-2", name: "React & Next.js" },
    { id: "s-3", name: "Node.js & Express" },
    { id: "s-4", name: "Python & FastAPI" },
    { id: "s-5", name: "PostgreSQL & Prisma" },
    { id: "s-6", name: "Tailwind CSS & Design Systems" },
    { id: "s-7", name: "Docker & Kubernetes" },
    { id: "s-8", name: "AWS Cloud & Serverless" },
    { id: "s-9", name: "GraphQL & REST APIs" },
    { id: "s-10", name: "CI/CD & DevOps Automation" },
  ],
  experiences: [
    {
      id: "exp-1",
      company: "Stripe",
      position: "Lead Full Stack Engineer",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      description: "<ul><li>Architected high-throughput checkout microservices processing over $15M daily transaction volume with 99.99% uptime.</li><li>Reduced global API response latencies by 38% through Redis distributed caching and database query optimization.</li><li>Mentored 8 mid-level engineers and established enterprise-wide TypeScript and testing best practices.</li></ul>"
    },
    {
      id: "exp-2",
      company: "Vercel",
      position: "Senior Frontend Engineer",
      location: "San Francisco, CA",
      startDate: "Mar 2019",
      endDate: "Dec 2021",
      description: "<ul><li>Built core analytics dashboard and deployment visualization tools using React, Next.js, and WebSockets.</li><li>Engineered an accessible, reusable component library adopting WCAG 2.1 AAA accessibility criteria.</li><li>Collaborated with product and security teams to implement strict OAuth2 and SSO workflows.</li></ul>"
    },
    {
      id: "exp-3",
      company: "Dropbox",
      position: "Software Engineer",
      location: "Seattle, WA",
      startDate: "Jun 2017",
      endDate: "Feb 2019",
      description: "<ul><li>Developed real-time file synchronization microservices in Python and Go with comprehensive unit tests.</li><li>Increased cloud storage synchronization speed by 25% across cross-platform desktop clients.</li></ul>"
    }
  ],
  education: [
    {
      id: "edu-1",
      institute: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      location: "Berkeley, CA",
      year: "2013 - 2017",
      result: "3.92 GPA (Summa Cum Laude)"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "CloudPulse Observability Engine",
      company: "Open Source Project",
      website: "https://cloudpulse-preview.dev",
      duration: "2023 - 2024",
      description: "A lightweight, real-time distributed telemetry and tracing dashboard for microservice clusters with over 3,200 GitHub stars and 50k weekly downloads."
    },
    {
      id: "proj-2",
      title: "FastSchema API Generator",
      company: "DevTool Initiative",
      website: "https://github.com/sarahjenkins/fastschema",
      duration: "2022 - 2023",
      description: "Automated type-safe SDK generator converting OpenAPI specifications into zero-dependency TypeScript and Python client libraries."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "AWS Certified Solutions Architect – Professional",
      provider: "Amazon Web Services",
      year: "2023",
      url: "https://aws.amazon.com/verification"
    },
    {
      id: "cert-2",
      title: "Meta Certified Front-End Software Architect",
      provider: "Meta / Coursera",
      year: "2022",
      url: "https://coursera.org/verify/meta-frontend"
    }
  ],
  languages: [
    {
      id: "lang-1",
      name: "English",
      proficiency: "Native / Bilingual"
    },
    {
      id: "lang-2",
      name: "Spanish",
      proficiency: "Professional Working"
    },
    {
      id: "lang-3",
      name: "German",
      proficiency: "Conversational"
    }
  ],
  hobbies: [
    { id: "hob-1", name: "Open Source Software" },
    { id: "hob-2", name: "Marathon Running" },
    { id: "hob-3", name: "Landscape Photography" },
    { id: "hob-4", name: "Technical Writing" }
  ],
  awards: [
    {
      id: "awd-1",
      title: "Excellence in Engineering Award",
      organization: "Stripe Annual Engineering Summit",
      year: "2023",
      description: "Awarded for exceptional architectural leadership and successful zero-downtime database migration."
    },
    {
      id: "awd-2",
      title: "1st Place Hackathon Winner",
      organization: "TechCrunch Disrupt SF",
      year: "2021",
      description: "Built an AI-assisted accessible code review assistant among 140+ participating international developer teams."
    }
  ],
  references: [
    {
      id: "ref-1",
      name: "Marcus Brody",
      organization: "VP of Engineering, Stripe",
      phone: "+1 (555) 456-7890",
      email: "marcus.brody@stripe.example.com"
    },
    {
      id: "ref-2",
      name: "Elena Rostova",
      organization: "Principal Architect, Vercel",
      phone: "+1 (555) 789-0123",
      email: "elena.rostova@vercel.example.com"
    }
  ],
  activeTabs: [
    "profile",
    "skills",
    "experience",
    "education",
    "projects",
    "certifications",
    "languages",
    "hobbies",
    "awards",
    "references"
  ],
  sidebarWidth: 350
};

export const emptyCVData: CVData = {
  theme: "modern",
  profileImage: "",
  fullName: "",
  designation: "",
  summary: "",
  phone: "",
  email: "",
  address: "",
  website: "",
  linkedin: "",
  github: "",
  skills: [],
  experiences: [],
  education: [],
  certifications: [],
  projects: [],
  languages: [],
  hobbies: [],
  awards: [],
  references: [],
  activeTabs: ["profile", "skills", "experience", "education", "projects"],
  sidebarWidth: 350
};
