import { LucideIcon } from 'lucide-react';

interface Video {
  title: string;
  url?: string;
  completed?: boolean;
}

interface Note {
  title: string;
  url: string;
}

interface NotesLink{
  title: string;
  url: string;
}

interface Module {
  [key: number]: {
    notesLink: NotesLink[];
    topics: Topic[];
  };
}
  
interface Topic {
  title: string;
  description: string;
  videos?: Video[];
  notes?: Note[];
}
  
  interface Subject {
    name: string
    icon: LucideIcon
    color: string
    modules: Module
  }
  
  export interface Subjects {
    [key: string]: Subject
  }

  