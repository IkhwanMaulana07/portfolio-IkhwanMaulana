export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  categories: string[];
  image: string;
  featured: boolean;
  role: string;
  stack: string[];
  summary: string;
  problem: string;
  objectives?: string[];
  solution: string;
  architecturePoints: string[];
  metrics: ProjectMetric[];
  results?: string;
  github: string;
  demo?: string;
}

export interface SkillItem {
  name: string;
  role: string;
  level: string;
  applied: string;
  desc: string;
  orbitRadius?: number; // for desktop orbital visualization
  orbitSpeed?: number;
}

export interface CapabilityCard {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: string;
  glowColor: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
  details: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  faculty?: string;
  period: string;
  gpa?: string;
  coursework?: string[];
  description: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  type: string;
  desc: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  link?: string;
}
