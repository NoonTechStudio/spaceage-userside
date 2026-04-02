// types/index.ts
export interface TeamMember {
  id: number;
  name: string;
  title: string;
  education: string;
  expertise: string[];
  credentials: string[];
  photo: string;
  social: {
    linkedin: string;
    email: string;
  };
}

export interface Project {
  id: number;
  name: string;
  category: string;
  location: string;
  year: string;
  size?: string;
  units?: string;
  src: string;
  featured?: boolean;
}