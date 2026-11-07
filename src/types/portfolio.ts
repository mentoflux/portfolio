export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  category: 'AI Tools' | 'Web Applications' | 'Finance & Accounting' | 'Education' | 'Experiments' | 'Other';
  technologies: string[];
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
  updatedAt?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  skills: string[];
  credentialId?: string;
  certificateImage?: string;
  credentialUrl?: string;
  isQualification?: boolean;
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
  order: number;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Development' | 'AI & Tools' | 'Marketing & SEO' | 'Finance & Business' | 'Leadership';
  order: number;
}

export interface Publication {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  externalUrl?: string;
  order: number;
}

export interface WebsiteSettings {
  id?: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  aboutText: string;
  avatarUrl: string;
  email: string;
  linkedin: string;
  availabilityText: string;
  accentColor?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}
