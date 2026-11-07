import { Project, Certification, Education, Experience, Skill, Publication, WebsiteSettings } from '../types/portfolio';
import portraitImg from '../assets/images/hamza_saif_portrait_1794068197910.jpg';
import ecsPortalImg from '../assets/images/project_ecs_portal_1794068198936.jpg';
import financeAppImg from '../assets/images/project_finance_app_1794068199046.jpg';
import pubBookCoverImg from '../assets/images/publication_book_cover_1794068198089.jpg';
import certCredentialImg from '../assets/images/cert_sample_credential_1794074164596.jpg';

export const INITIAL_SETTINGS: WebsiteSettings = {
  heroHeadline: "Building Ideas Into Digital Experiences.",
  heroSubheadline: "CA Student | AI Enthusiast | Vibe Coder | Web Developer",
  heroDescription: "I'm a CA student with a passion for AI, vibe coding, and building useful digital products. I love turning ideas into interactive websites, tools, and applications.",
  aboutText: "I'm Hamza Saif, a Chartered Accountancy student at CAF level, currently pursuing my professional journey through ICAP.\n\nBeyond accounting and finance, I'm deeply interested in artificial intelligence, vibe coding, web development, and building digital products.\n\nI enjoy experimenting with AI tools, transforming ideas into working applications, and creating practical solutions for students and professionals.\n\nMy interests lie at the intersection of finance, technology, creativity, and entrepreneurship.",
  avatarUrl: portraitImg,
  email: "hsaif9240@gmail.com",
  linkedin: "https://linkedin.com/in/hamza-saif",
  availabilityText: "Building something interesting ✦",
  stats: [
    { label: "Qualification Level", value: "CA · CAF" },
    { label: "Community Leadership", value: "Founder & Mentor" },
    { label: "Core Discipline", value: "Finance + Tech" },
    { label: "Specialty", value: "Vibe Coding & AI" }
  ]
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "ecs-practice-portal",
    title: "ECS Practice Portal",
    description: "A self-built web application specifically engineered for English Communication Skills (ECS) exam practice, vocabulary building, and timed interactive tests.",
    category: "Education",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Interactive Exam Engine"],
    coverImage: ecsPortalImg,
    liveUrl: "https://linkedin.com/in/hamza-saif",
    githubUrl: "https://github.com",
    isFeatured: true,
    isPublished: true,
    order: 1
  },
  {
    id: "finance-manager-app",
    title: "Finance Manager App",
    description: "A personal finance tracking application combining accounting principles with modern data visualization to track budgets, cashflows, and saving targets.",
    category: "Finance & Accounting",
    technologies: ["TypeScript", "React", "Data Analytics", "Financial Ratios"],
    coverImage: financeAppImg,
    liveUrl: "https://linkedin.com/in/hamza-saif",
    githubUrl: "https://github.com",
    isFeatured: true,
    isPublished: true,
    order: 2
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: "icap-prc-1",
    title: "Pre-requisite Certification (PRC), Level 1",
    issuer: "The Institute of Chartered Accountants of Pakistan (ICAP)",
    issueDate: "November 2025",
    skills: ["Financial Accounting", "Quantitative Methods", "Economics", "Business Writing"],
    isQualification: true,
    order: 1
  },
  {
    id: "icap-ecs",
    title: "English Communication Skills (ECS) Hands-on Course",
    issuer: "The Institute of Chartered Accountants of Pakistan (ICAP)",
    issueDate: "2024",
    skills: ["Professional Communication", "Business Presentations", "Report Writing"],
    isQualification: true,
    order: 2
  },
  {
    id: "gl-front-end-html",
    title: "Front End Development – HTML",
    issuer: "Great Learning",
    issueDate: "2023",
    skills: ["HTML5", "Semantic Markup", "Web Standards"],
    certificateImage: certCredentialImg,
    isQualification: false,
    order: 3
  },
  {
    id: "gl-front-end-css",
    title: "Front End Development – CSS",
    issuer: "Great Learning",
    issueDate: "2023",
    skills: ["CSS3", "Responsive Layouts", "Flexbox & Grid"],
    certificateImage: certCredentialImg,
    isQualification: false,
    order: 4
  },
  {
    id: "gl-seo",
    title: "SEO Strategies",
    issuer: "Great Learning",
    issueDate: "2023",
    skills: ["Search Engine Optimization", "Technical SEO", "Keyword Research"],
    isQualification: false,
    order: 5
  },
  {
    id: "gl-yt-marketing",
    title: "YouTube Marketing",
    issuer: "Great Learning",
    issueDate: "2023",
    skills: ["Content Strategy", "Audience Growth", "Analytics"],
    isQualification: false,
    order: 6
  },
  {
    id: "gl-blockchain",
    title: "Blockchain Process",
    issuer: "Great Learning",
    issueDate: "2023",
    skills: ["Distributed Ledgers", "Smart Contracts", "Cryptographic Fundamentals"],
    isQualification: false,
    order: 7
  },
  {
    id: "ow-html-css",
    title: "Basics of HTML/CSS for Beginners",
    issuer: "Open Weaver",
    issueDate: "2023",
    skills: ["Web Design Basics", "Styling Fundamentals"],
    isQualification: false,
    order: 8
  }
];

export const INITIAL_EDUCATION: Education[] = [
  {
    id: "pac-ca-caf",
    degree: "Chartered Accountancy (CA) — CAF Level",
    institution: "Professional's Academy of Commerce (PAC)",
    period: "November 2025 – Present",
    description: "Currently pursuing CA professional qualification through ICAP. Cleared PRC Level 1, actively mastering financial accounting, tax laws, auditing, and corporate governance.",
    order: 1
  },
  {
    id: "pgc-fsc",
    degree: "Intermediate — FSc Medical",
    institution: "Punjab Group of Colleges",
    period: "2023 – 2025",
    description: "Pre-medical studies developing strong analytical reasoning, scientific methodology, and academic discipline.",
    order: 2
  },
  {
    id: "dps-matric",
    degree: "Matriculation",
    institution: "Divisional Public School",
    period: "2021 – 2023",
    description: "Rigorous secondary school education with academic distinction and active participation in co-curricular initiatives.",
    order: 3
  }
];

export const INITIAL_EXPERIENCE: Experience[] = [
  {
    id: "exp-medexel",
    role: "Brand Ambassador",
    organization: "MedExel (MDCAT Preparation Academy / Platform)",
    period: "2024",
    description: "Represented the platform to prospective MDCAT students and promoted its academic courses and resources, helping students navigate entrance exam preparation.",
    order: 1
  },
  {
    id: "exp-communities",
    role: "Founder & Mentor",
    organization: "Student Communities (FSc, MDCAT & CA Education)",
    period: "2023 – Present",
    description: "Created and managed thriving student communities focused on FSc, MDCAT, and CA education, curating study materials, hosting sessions, and providing dedicated peer support.",
    order: 2
  }
];

export const INITIAL_SKILLS: Skill[] = [
  { id: "s-1", name: "Web Development", category: "Development", order: 1 },
  { id: "s-2", name: "HTML5", category: "Development", order: 2 },
  { id: "s-3", name: "CSS3", category: "Development", order: 3 },
  { id: "s-4", name: "App Building", category: "Development", order: 4 },
  { id: "s-5", name: "AI Tools", category: "AI & Tools", order: 5 },
  { id: "s-6", name: "Vibe Coding", category: "AI & Tools", order: 6 },
  { id: "s-7", name: "SEO Strategies", category: "Marketing & SEO", order: 7 },
  { id: "s-8", name: "Digital Marketing", category: "Marketing & SEO", order: 8 },
  { id: "s-9", name: "YouTube Marketing", category: "Marketing & SEO", order: 9 },
  { id: "s-10", name: "Accounting & Finance", category: "Finance & Business", order: 10 },
  { id: "s-11", name: "MS Office & Excel", category: "Finance & Business", order: 11 },
  { id: "s-12", name: "Community Leadership", category: "Leadership", order: 12 }
];

export const INITIAL_PUBLICATIONS: Publication[] = [
  {
    id: "pub-grammar",
    title: "English Grammar Notes",
    description: "A comprehensive self-authored guide for Matric-level students breaking down English grammar concepts, sentence structures, and common exam questions.",
    order: 1
  },
  {
    id: "pub-ecs",
    title: "English Communication Skills Practice Book",
    description: "An intensive practice resource specifically designed for ICAP ECS preparation, covering verbal reasoning, business dialogues, and exam techniques.",
    coverImage: pubBookCoverImg,
    order: 2
  }
];
