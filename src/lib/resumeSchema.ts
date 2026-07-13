import { z } from 'zod';

const ContactSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  github: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Format: YYYY-MM'),
  endDate: z.string().regex(/^\d{4}-\d{2}$/, 'Format: YYYY-MM').optional().or(z.literal('Present')),
  description: z.string().min(1, 'Description is required'),
  achievements: z.array(z.string()).optional(),
});

const EducationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, 'School is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Format: YYYY-MM'),
  endDate: z.string().regex(/^\d{4}-\d{2}$/, 'Format: YYYY-MM').optional(),
  details: z.string().optional(),
});

const SkillSchema = z.object({
  id: z.string(),
  category: z.string().min(1, 'Category is required'),
  items: z.array(z.string().min(1)).min(1, 'At least one skill is required'),
});

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.string().optional(),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const CustomSectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export const ResumeDataSchema = z.object({
  contact: ContactSchema,
  summary: z.string().optional(),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(SkillSchema),
  projects: z.array(ProjectSchema).optional(),
  certifications: z.array(CertificationSchema).optional(),
  customSections: z.array(CustomSectionSchema).optional(),
});

export type ResumeDataType = z.infer<typeof ResumeDataSchema>;
