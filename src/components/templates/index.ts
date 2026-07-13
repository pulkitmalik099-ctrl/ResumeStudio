import { ClassicChronological } from './ClassicChronological';
import { ModernSidebar } from './ModernSidebar';
import { ExecutiveElite } from './ExecutiveElite';
import { CreativePortfolio } from './CreativePortfolio';
import { MinimalistATS } from './MinimalistATS';
import {
  ProfessionalClean,
  ContemporarySplit,
  TimelineModern,
  CorporateFormal,
  LeadershipBold,
} from './remaining';
import {
  DesignerShowcase,
  BoldColorBlock,
  TechMinimal,
  DeveloperGrid,
  AcademicCV,
  GraduateFreshStart,
  InternshipSimple,
  HybridSkillsFirst,
  OnePageCompact,
  EuropassStyle,
} from './creative-and-tech';

export const templateRegistry = {
  'classic-chronological': {
    name: 'Classic Chronological',
    category: 'ats',
    component: ClassicChronological,
  },
  'minimalist-ats': {
    name: 'Minimalist ATS',
    category: 'ats',
    component: MinimalistATS,
  },
  'professional-clean': {
    name: 'Professional Clean',
    category: 'ats',
    component: ProfessionalClean,
  },
  'modern-sidebar': {
    name: 'Modern Sidebar',
    category: 'modern',
    component: ModernSidebar,
  },
  'contemporary-split': {
    name: 'Contemporary Split',
    category: 'modern',
    component: ContemporarySplit,
  },
  'timeline-modern': {
    name: 'Timeline Modern',
    category: 'modern',
    component: TimelineModern,
  },
  'executive-elite': {
    name: 'Executive Elite',
    category: 'executive',
    component: ExecutiveElite,
  },
  'corporate-formal': {
    name: 'Corporate Formal',
    category: 'executive',
    component: CorporateFormal,
  },
  'leadership-bold': {
    name: 'Leadership Bold',
    category: 'executive',
    component: LeadershipBold,
  },
  'creative-portfolio': {
    name: 'Creative Portfolio',
    category: 'creative',
    component: CreativePortfolio,
  },
  'designer-showcase': {
    name: 'Designer Showcase',
    category: 'creative',
    component: DesignerShowcase,
  },
  'bold-color-block': {
    name: 'Bold Color Block',
    category: 'creative',
    component: BoldColorBlock,
  },
  'tech-minimal': {
    name: 'Tech Minimal',
    category: 'technical',
    component: TechMinimal,
  },
  'developer-grid': {
    name: 'Developer Grid',
    category: 'technical',
    component: DeveloperGrid,
  },
  'academic-cv': {
    name: 'Academic CV',
    category: 'other',
    component: AcademicCV,
  },
  'graduate-fresh': {
    name: 'Graduate Fresh Start',
    category: 'other',
    component: GraduateFreshStart,
  },
  'internship-simple': {
    name: 'Internship Simple',
    category: 'other',
    component: InternshipSimple,
  },
  'hybrid-skills-first': {
    name: 'Hybrid Skills-First',
    category: 'other',
    component: HybridSkillsFirst,
  },
  'one-page-compact': {
    name: 'One-Page Compact',
    category: 'other',
    component: OnePageCompact,
  },
  'europass-style': {
    name: 'Europass Style',
    category: 'other',
    component: EuropassStyle,
  },
};

export function getTemplate(templateId: string) {
  return templateRegistry[templateId as keyof typeof templateRegistry];
}

export function getTemplateComponent(templateId: string) {
  return templateRegistry[templateId as keyof typeof templateRegistry]?.component;
}
