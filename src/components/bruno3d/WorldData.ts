import { COSMIC_DATA } from '../../data/cosmicPortfolioData';

export interface WorldZone {
  id: string;
  title: string;
  subtitle: string;
  position: [number, number, number];
  radius: number;
  color: string;
  type: 'start' | 'project' | 'skills' | 'education' | 'contact';
  projectId?: string;
  link?: string;
}

export const WORLD_ZONES: WorldZone[] = [
  // 1. Starting Plaza
  {
    id: 'zone-start',
    title: 'Ikhwan Maulana Atelier',
    subtitle: 'Full Stack & AI Engineer · S.Kom (GPA 3.78)',
    position: [0, 0, 0],
    radius: 7,
    color: '#E5C378',
    type: 'start'
  },

  // 2. Project Portals
  {
    id: 'zone-proj-veyora',
    title: 'Veyora Technologies',
    subtitle: 'F&B Tech SaaS & Bespoke Digital Agency (0% Commission, QR Dine-in, AI Assistant)',
    position: [32, 0, -28],
    radius: 6.5,
    color: '#E5C378',
    type: 'project',
    projectId: 'veyora-technologies'
  },
  {
    id: 'zone-proj-bsf',
    title: 'BSF Larvae Computer Vision Lab',
    subtitle: 'End-to-End Edge Computer Vision (YOLOv11s, TFLite, Flutter, 21.9K Dataset)',
    position: [55, 0, -28],
    radius: 6.5,
    color: '#06B6D4',
    type: 'project',
    projectId: 'bsf-larvae-detection'
  },
  {
    id: 'zone-proj-movie',
    title: 'AI Movie Recommender & Sentiment',
    subtitle: 'Interactive Machine Learning Application (TF-IDF, Cosine Similarity, REST API)',
    position: [32, 0, -48],
    radius: 6.5,
    color: '#8B5CF6',
    type: 'project',
    projectId: 'movie-recommender'
  },
  {
    id: 'zone-proj-smp',
    title: 'SMP Islam Al-Amin Portal',
    subtitle: 'Academic Grading & Evaluation System (PHP Native MVC, MySQL, Real-time Recapitulation)',
    position: [55, 0, -48],
    radius: 6.5,
    color: '#10B981',
    type: 'project',
    projectId: 'smp-islam-al-amin'
  },

  // 3. Tech Stack Playground Zone (Knockable Bricks Area)
  {
    id: 'zone-skills',
    title: 'Interactive Tech Stack Arena',
    subtitle: 'Tabrak tumpukan balok teknologi ini dengan mobil untuk merobohkannya!',
    position: [-38, 0, -32],
    radius: 12,
    color: '#38BDF8',
    type: 'skills'
  },

  // 4. Academic & Certification Zone
  {
    id: 'zone-education',
    title: 'Academic Provenance & Honors',
    subtitle: 'Universitas Gunadarma (IPK 3.78) & BNSP Certified Programmer',
    position: [38, 0, 32],
    radius: 10,
    color: '#F59E0B',
    type: 'education'
  },

  // 5. Contact & Collaboration Zone
  {
    id: 'zone-contact',
    title: 'Dispatch & Consultation Hub',
    subtitle: 'Hubungi Ikhwan Maulana via Email, WhatsApp, GitHub, atau LinkedIn',
    position: [-38, 0, 32],
    radius: 10,
    color: '#EC4899',
    type: 'contact',
    link: '#contact'
  }
];

export const TECH_BRICKS = [
  { name: 'Next.js 16', color: '#111827', textColor: '#FFFFFF' },
  { name: 'React 19', color: '#087EA4', textColor: '#FFFFFF' },
  { name: 'TypeScript', color: '#3178C6', textColor: '#FFFFFF' },
  { name: 'Python', color: '#3776AB', textColor: '#FFD43B' },
  { name: 'YOLOv11s', color: '#FF6F00', textColor: '#FFFFFF' },
  { name: 'TFLite', color: '#FFA800', textColor: '#111827' },
  { name: 'PyTorch', color: '#EE4C2C', textColor: '#FFFFFF' },
  { name: 'Tailwind CSS', color: '#06B6D4', textColor: '#FFFFFF' },
  { name: 'Node.js', color: '#339933', textColor: '#FFFFFF' },
  { name: 'Express.js', color: '#27272A', textColor: '#FFFFFF' },
  { name: 'PHP MVC', color: '#777BB4', textColor: '#FFFFFF' },
  { name: 'MySQL 3NF', color: '#4479A1', textColor: '#FFFFFF' },
  { name: 'Docker', color: '#2496ED', textColor: '#FFFFFF' },
  { name: 'Gemini AI', color: '#6366F1', textColor: '#FFFFFF' },
  { name: 'Flutter', color: '#02569B', textColor: '#FFFFFF' }
];

export const SOCIAL_BILLBOARDS = [
  {
    name: 'GitHub',
    url: COSMIC_DATA.profile.github,
    color: '#24292E',
    icon: 'Github',
    pos: [-34, 0, 26] as [number, number, number]
  },
  {
    name: 'LinkedIn',
    url: COSMIC_DATA.profile.linkedin,
    color: '#0A66C2',
    icon: 'Linkedin',
    pos: [-42, 0, 26] as [number, number, number]
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/6285770175510',
    color: '#25D366',
    icon: 'MessageSquare',
    pos: [-34, 0, 38] as [number, number, number]
  },
  {
    name: 'Email Consultation',
    url: `mailto:${COSMIC_DATA.profile.email}`,
    color: '#E5C378',
    icon: 'Mail',
    pos: [-42, 0, 38] as [number, number, number]
  }
];
