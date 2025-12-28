export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Photo {
  id: number;
  url: string;
  title: string;
  aspectRatio: string; // '1/1' | '4/3' | '16/9' | '3/4'
}

export enum SectionId {
  Hero = 'hero',
  About = 'about',
  Experience = 'experience',
  Skills = 'skills',
  Projects = 'projects',
  Gallery = 'gallery',
  Contact = 'contact',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}