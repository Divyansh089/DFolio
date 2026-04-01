export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface HeroData {
  tagline: string;
  name: string;
  subtitle: string;
  socials: SocialLink[];
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface AboutData {
  paragraphs: string[];
  stats: Stat[];
}

export interface SkillCategory {
  icon: string;
  name: string;
  description: string;
  tags: string[];
}

export interface Project {
  number: string;
  name: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl: string;
}

export interface Experience {
  dateRange: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
}

export interface Certification {
  name: string;
  organization: string;
  year: string;
  topics: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

export interface ResumeData {
  nav: NavLink[];
  hero: HeroData;
  about: AboutData;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  contact: ContactInfo;
}
