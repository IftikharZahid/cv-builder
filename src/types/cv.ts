export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institute: string;
  degree: string;
  location?: string;
  year: string;
  result: string;
}

export interface Project {
  id: string;
  title: string;
  company: string;
  website: string;
  duration: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  year: string;
  url: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Hobby {
  id: string;
  name: string;
}

export interface Reference {
  id: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
}

export interface CVData {
  theme: string;
  profileImage: string;
  fullName: string;
  designation: string;
  summary: string;

  phone: string;
  email: string;
  address: string;
  website: string;
  linkedin: string;
  github: string;

  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  hobbies: Hobby[];
  awards: Award[];
  references: Reference[];
  activeTabs: string[];
  sidebarWidth?: number;
}