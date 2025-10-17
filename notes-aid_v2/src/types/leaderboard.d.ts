export interface StudentData {
  seat_number?: string;
  name?: string;
  admission_year?: number;
  sgpa_list?: { semester: number; sgpa: number }[] | { semester: number; sgpa: number };
  avg_cgpa?: number;
  semester_sgpa?: number;
  semester_number?: number;
}

export interface LeaderboardResponse {
  data: StudentData[];
  pagination: {
    current_page: number;
    per_page: number;
    total_records: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface AnalyticsResponse {
  admission_year: number;
  statistics: {
    total_students: number;
    average_cgpa: number;
    highest_cgpa: number;
    lowest_cgpa: number;
    performance_breakdown: {
      above_9_cgpa: number;
      above_8_cgpa: number;
      above_7_cgpa: number;
    };
  };
  cgpa_distribution: Array<{
    _id: number;
    count: number;
    students: Array<{ name: string; cgpa: number }>;
  }>;
}

export interface TopPerformersResponse {
  data: StudentData[];
  metadata: {
    admission_year: number;
    top_count: number;
    type: string;
  };
}

