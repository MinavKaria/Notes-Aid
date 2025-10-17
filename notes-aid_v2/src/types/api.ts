import { Mongoose } from 'mongoose';

// Database connection type  
export type MongoConnection = Mongoose;

// SGPA entry interface
export interface SgpaEntry {
  semester: number;
  sgpa: number;
}

// Student data interface - matches Mongoose lean() return type
export interface StudentData {
  seat_number?: string;
  name?: string;
  admission_year?: number;
  sgpa_list?: SgpaEntry[] | SgpaEntry;
  avg_cgpa?: number;
  semester_sgpa?: number;
  semester_number?: number;
  _id?: unknown;
  __v?: number;
  [key: string]: unknown; // Allow additional fields due to strict: false in schema
}

// Filter interfaces for API queries
export interface LeaderboardFilter {
  admission_year: number;
  name?: { $regex: string; $options: string };
  seat_number?: string;
  avg_cgpa?: {
    $gte?: number;
    $lte?: number;
  };
  $or?: Array<{
    name?: { $regex: string; $options: string };
    seat_number?: { $regex: string; $options: string };
  }>;
  'sgpa_list.sgpa'?: {
    $gte?: number;
    $lte?: number;
  };
}

// Sort interface
export interface SortOptions {
  avg_cgpa?: 1 | -1;
  name?: 1 | -1;
  seat_number?: 1 | -1;
  [key: string]: 1 | -1 | undefined;
}

// Semester filter for aggregation
export interface SemesterFilter {
  $gte?: number;
  $lte?: number;
  $gt?: number;
}

// API request body interfaces
export interface CurriculumPostBody {
  year: number;
  branch: string;
  subjects: unknown[];
}

export interface CurriculumFilter {
  year?: number;
  branch?: string;
}

export interface ProposeRequestBody {
  proposer?: string;
  changes: Record<string, unknown>;
  mode?: 'merge' | 'replace';
}

export interface ReviewRequestBody {
  action: 'approve' | 'reject';
  reviewer?: string;
  note?: string;
}

// MongoDB collection interface
export interface MongoCollection {
  name: string;
  type?: string;
  options?: Record<string, unknown>;
  info?: Record<string, unknown>;
  idIndex?: Record<string, unknown>;
}