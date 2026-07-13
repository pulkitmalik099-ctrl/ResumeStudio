export interface ContactInfo {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string; // YYYY-MM
  endDate?: string; // YYYY-MM or "Present"
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string; // YYYY-MM
  endDate?: string; // YYYY-MM
  details?: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeData {
  contact: ContactInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[];
  certifications?: Certification[];
  customSections?: CustomSection[];
}

export interface ResumeTemplateProps {
  data: ResumeData;
  colorScheme?: 'default' | 'blue' | 'gray' | 'green';
}
