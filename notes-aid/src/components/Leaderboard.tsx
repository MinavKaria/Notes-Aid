"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { useDebounce } from '../hook/useDebounce';
import { Search, Trophy, Medal, Award, Users, ChevronLeft, ChevronRight, RefreshCw, Star, X, BarChart3, ChevronDown } from 'lucide-react';
import { parseCookies } from 'nookies';

const getApiUrl = (endpoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const cleanEndpoint = endpoint.replace(/^\/+/, '');
  return `${cleanBase}/${cleanEndpoint}`;
};

interface Student {
  _id: string;
  seat_number: string;
  name: string;
  admission_year: number;
  cgpa?: number;
  semesterSGPA?: number;
  currentSemesterSGPA?: number;
  totalSemesters: number;
  rank: number;
  sgpa_list: Array<{
    semester: number;
    sgpa: number;
  }>;
}

interface LeaderboardResponse {
  success: boolean;
  data: Student[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  meta: {
    admission_year: number;
    semester?: number;
    currentSemester?: number;
    type: string;
  };
}

interface YearsResponse {
  success: boolean;
  data: number[];
}

interface SemestersResponse {
  success: boolean;
  data: number[];
  admission_year: number;
}


export default function Leaderboard() {
  const [token, setToken] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Separate the display value from the search logic
  const [searchTerm, setSearchTerm] = useState(''); // This will update immediately
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // This will be debounced for filtering
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('overall');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(500);
  
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableSemesters, setAvailableSemesters] = useState<number[]>([]);
  
  const [totalPages, setTotalPages] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
    const cookies = parseCookies();
    const googleToken = cookies.googleToken;
    if (googleToken) {
      setToken(googleToken);
    } else {
      setError('No authentication token found. Please login again.');
      setLoading(false);
    }
  }, []);

  // Client-side search filtering using debounced term
  const filteredStudents = useMemo(() => {
    if (!debouncedSearchTerm) return students;
    
    const searchLower = debouncedSearchTerm.toLowerCase().trim();
    return students.filter(student => {
      const nameMatch = student.name.toLowerCase().includes(searchLower);
      const rollMatch = student.seat_number.toLowerCase().includes(searchLower);
      const yearMatch = student.admission_year.toString().includes(searchLower);
      
      return nameMatch || rollMatch || yearMatch;
    });
  }, [students, debouncedSearchTerm]); // Use debouncedSearchTerm for filtering

  useEffect(() => {
    if (!isHydrated || !token) return;
    
    const fetchAvailableYears = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          getApiUrl('api/v1/leaderboard/meta/years'),
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.ok) {
          const data: YearsResponse = await response.json();
          setAvailableYears(data.data || []);
          if (data.data && data.data.length > 0) {
            setSelectedYear(data.data[0].toString());
          } else {
            setLoading(false);
          }
        } else if (response.status === 401 || response.status === 403) {
          setError('Authentication failed. Please login again.');
          setLoading(false);
        } else {
          console.error('Failed to fetch years:', response.status);
          setError('Failed to fetch available years');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching years:', err);
        setError('Failed to connect to server');
        setLoading(false);
      }
    };
    
    fetchAvailableYears();
  }, [isHydrated, token]); // Wait for hydration and token  // Fetch available semesters when year changes
  useEffect(() => {
    const fetchAvailableSemesters = async () => {
      if (!selectedYear || !token) return;
      
      try {
        const response = await fetch(
          getApiUrl(`api/v1/leaderboard/meta/semesters?admission_year=${selectedYear}`),
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.ok) {
          const data: SemestersResponse = await response.json();
          setAvailableSemesters(data.data);
        } else if (response.status === 401 || response.status === 403) {
          setError('Authentication failed. Please login again.');
        }
      } catch (err) {
        console.error('Error fetching semesters:', err);
      }
    };
    
    if (selectedYear) {
      fetchAvailableSemesters();
    }
  }, [selectedYear, token]);  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!selectedYear || !token) {
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        let endpoint = 'api/v1/leaderboard';
        
        if (selectedSemester === 'overall') {
          endpoint += `?admission_year=${selectedYear}&page=${currentPage}&limit=${limit}`;
        } else if (selectedSemester === 'current') {
          endpoint += `/current?admission_year=${selectedYear}&page=${currentPage}&limit=${limit}`;
        } else {
          endpoint += `/${selectedSemester}?admission_year=${selectedYear}&page=${currentPage}&limit=${limit}`;
        }
        
        const url = getApiUrl(endpoint);
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data: LeaderboardResponse = await response.json();
          setStudents(data.data || []);
          setTotalPages(data.pagination?.pages || 1);
          setTotalStudents(data.pagination?.total || 0);
        } else if (response.status === 401 || response.status === 403) {
          setError('Authentication failed. Please login again.');
        } else {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          setError(`Failed to fetch leaderboard data: ${response.status}`);
        }
      } catch (err) {
        console.error('Network error:', err);
        setError('Network error. Please check if the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [selectedYear, selectedSemester, currentPage, limit, token]);

  // Reset page when filters change (but not search)
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear, selectedSemester]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-base-content dark:text-neutral-content" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-medium text-base-content dark:text-neutral-content">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900';
      default:
        return 'text-base-content dark:text-neutral-content';
    }
  };

  const getScoreValue = (student: Student) => {
    if (selectedSemester === 'overall') return student.cgpa?.toFixed(2) || 'N/A';
    if (selectedSemester === 'current') return student.currentSemesterSGPA?.toFixed(2) || 'N/A';
    return student.semesterSGPA?.toFixed(2) || 'N/A';
  };

  const getScoreLabel = () => {
    if (selectedSemester === 'overall') return 'CGPA';
    return 'SGPA';
  };

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Handle showing student details
  const showStudentDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedStudent(null);
  };

  // SGPA Detail Modal Component
  const SGPADetailModal = () => {
    if (!selectedStudent || !showDetailModal) return null;

    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-base-200 via-base-100 to-base-200 dark:from-neutral dark:via-base-300 dark:to-neutral border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="sm:text-2xl text-xl font-bold text-base-content dark:text-neutral-content">{selectedStudent.name}</h2>
              <p className="text-base-content dark:text-neutral-content text-xs sm:text-xl">Roll: {selectedStudent.seat_number} • Year: {selectedStudent.admission_year}</p>
            </div>
            <button
              onClick={closeModal}
              className="h-12 w-12 btn btn-neutral dark:btn-primary transition-all duration-200 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Overall Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="border-gray-700">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-base-content dark:text-neutral-content">
                      {selectedStudent.cgpa ? selectedStudent.cgpa.toFixed(2) : 'N/A'}
                    </div>
                    <div className="text-sm text-base-content dark:text-neutral-content">Overall CGPA</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-gray-700">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">#{selectedStudent.rank}</div>
                    <div className="text-sm text-base-content dark:text-neutral-content">Current Rank</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Semester-wise SGPA */}
            <div>
              <h3 className="text-lg font-semibold text-base-content dark:text-neutral-content mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Semester-wise SGPA
              </h3>
              
              {selectedStudent.sgpa_list && selectedStudent.sgpa_list.length > 0 ? (
                <div className="space-y-3">                  {selectedStudent.sgpa_list
                    .sort((a, b) => a.semester - b.semester)
                    .map((item) => (
                    <div key={item.semester} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3 mb-3 sm:mb-0">
                        <span className="text-base-content dark:text-neutral-content font-medium">Semester {item.semester}</span>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="text-left sm:text-right flex-1 sm:flex-none">
                          <div className="text-lg font-bold text-base-content dark:text-neutral-content">{item.sgpa.toFixed(2)}</div>
                          <div className="text-xs text-base-content dark:text-neutral-content">SGPA</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-base-content dark:text-neutral-content">No semester data available</div>
                </div>
              )}
            </div>

            {/* Summary Stats */}
            {selectedStudent.sgpa_list && selectedStudent.sgpa_list.length > 0 && (
              <div className="mt-6 p-4 rounded-lg border border-gray-700">
                <h4 className="text-base-content dark:text-neutral-content font-semibold mb-2">Performance Summary</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-400">
                      {Math.max(...selectedStudent.sgpa_list.map(s => s.sgpa)).toFixed(2)}
                    </div>
                    <div className="text-xs text-base-content dark:text-neutral-content">Highest SGPA</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-400">
                      {(selectedStudent.sgpa_list.reduce((sum, s) => sum + s.sgpa, 0) / selectedStudent.sgpa_list.length).toFixed(2)}
                    </div>
                    <div className="text-xs text-base-content dark:text-neutral-content">Average SGPA</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-400">
                      {selectedStudent.totalSemesters}
                    </div>
                    <div className="text-xs text-base-content dark:text-neutral-content">Total Semesters</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );  };

  // Show minimal static content during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-base-content dark:text-neutral-content">Leaderboard</h1>
            <p className="text-base-content dark:text-neutral-content">Track academic excellence across batches and semesters</p>
          </div>
          <div className="rounded-xl p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto mb-4"></div>
              <p className="text-base-content dark:text-neutral-content">Loading leaderboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-base-content dark:text-neutral-content">Leaderboard</h1>
          <p className="text-base-content dark:text-neutral-content">Track academic excellence across batches and semesters</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content dark:text-neutral-content w-5 h-5" />
          <Input
            placeholder="Search students by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 w-full text-base-content dark:text-neutral-content"
          />
          {searchTerm && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={() => setSearchTerm('')}
                className="text-base-content dark:text-neutral-content hover:text-base-content group-hover:dark:text-neutral-content transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Search Results Counter - use debouncedSearchTerm for display */}
        {debouncedSearchTerm && (
          <div className="mb-4 text-center">
            <p className="text-base-content dark:text-neutral-content">
              Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} 
              {debouncedSearchTerm && ` matching "${debouncedSearchTerm}"`}
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Year Selection */}
          <div>
            <label className="block text-sm font-medium text-base-content dark:text-neutral-content mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="select select-bordered h-12 w-full text-base-content dark:text-neutral-content"
            >
              <option value="" disabled>Select Year</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 text-neutral-content absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Semester Selection */}
          <div>
            <label className="block text-sm font-medium text-base-content dark:text-neutral-content mb-2">Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="h-12 select select-bordered w-full text-base-content dark:text-neutral-content"
            >
              <option value="overall">Overall</option>
              <option value="current">Current</option>
              {availableSemesters.map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>          
          {/* Refresh Button */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                setCurrentPage(1);
                // Force re-fetch by clearing and resetting state
                const currentYear = selectedYear;
                setSelectedYear('');
                setTimeout(() => setSelectedYear(currentYear), 0);
              }}
              className="h-12 w-full btn btn-neutral dark:btn-primary transition-all duration-200 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="border border-gray-800 rounded-xl p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto mb-4"></div>
              <p className="text-base-content dark:text-neutral-content">Loading leaderboard...</p>
            </div>
          </div>
        )}        
        {/* Error State */}
        {error && (
          <div className="border border-red-500/20 rounded-xl p-6 mb-6">
            <div className="text-center">
              <p className="text-red-400 mb-3">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  setCurrentPage(1);
                  // Force re-fetch by clearing and resetting state
                  const currentYear = selectedYear;
                  setSelectedYear('');
                  setTimeout(() => setSelectedYear(currentYear), 0);
                }}
                className="bg-red-600 hover:bg-red-700 text-base-content dark:text-neutral-content"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        {/* Students List */}
        {!loading && !error && filteredStudents.length > 0 && (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block border border-gray-700 rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-700">
                <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-base-content dark:text-neutral-content">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-4">Student</div>
                  <div className="col-span-2">Roll Number</div>
                  <div className="col-span-2">Year</div>
                  <div className="col-span-2">Semesters</div>
                  <div className="col-span-1">{getScoreLabel()}</div>
                </div>
              </div>
              
              {/* Table Body */}
              <div className="divide-y">
                {filteredStudents.map((student) => (
                    <div
                    key={student._id}
                    className={`px-6 py-4 bg-gradient-to-br from-base-200 via-base-100 to-base-200 dark:from-neutral dark:via-base-300 dark:to-neutral transition-all duration-200 cursor-pointer group hover:bg-gradient-to-br hover:from-base-300 hover:to-base-300 dark:hover:from-base-300 dark:hover:to-base-300 ${
                      student.rank <= 3 ? 'ring-1 ring-purple-500/30' : ''
                    }`}
                    onClick={() => showStudentDetails(student)}
                    >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Rank */}
                      <div className="col-span-1">
                      <div className="flex items-center">
                        {student.rank <= 3 ? (
                        <div className={`p-1.5 rounded-lg ${getRankBadgeColor(student.rank)} transform group-hover:scale-110 transition-transform`}>
                          {getRankIcon(student.rank)}
                        </div>
                        ) : (
                        <div className="w-8 h-8 flex items-center justify-center text-sm font-medium text-base-content dark:text-neutral-content rounded-lg transition-colors">
                          #{student.rank}
                        </div>
                        )}
                      </div>
                      </div>
                      
                      {/* Student Name */}
                      <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <div>
                        <h3 className="font-semibold text-base-content dark:text-neutral-content text-lg group-hover:text-base-content hover:dark:text-neutral-content transition-colors">
                          {student.name}
                        </h3>
                        {student.rank <= 3 && (
                          <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 group-hover:text-yellow-300" />
                          <span className="text-xs text-yellow-400 font-medium group-hover:text-yellow-300">Top Performer</span>
                          </div>
                        )}
                        </div>
                      </div>
                      </div>
                      
                      {/* Roll Number */}
                      <div className="col-span-2">
                      <span className="text-base-content dark:text-neutral-content font-mono group-hover:text-base-content group-hover:dark:text-neutral-content transition-colors">{student.seat_number}</span>
                      </div>
                      
                      {/* Year */}
                      <div className="col-span-2">
                      <span className="text-base-content dark:text-neutral-content group-hover:text-base-content group-hover:dark:text-neutral-content transition-colors">{student.admission_year}</span>
                      </div>
                      
                      {/* Semesters */}
                      <div className="col-span-2">
                      <span className="text-base-content dark:text-neutral-content group-hover:text-base-content group-hover:dark:text-neutral-content transition-colors">{student.totalSemesters}</span>
                      </div>
                      
                      {/* Score */}
                      <div className="col-span-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xl font-bold ${student.rank <= 3 ? 'text-green-400 group-hover:text-green-300' : 'text-base-content dark:text-neutral-content group-hover:text-base-content group-hover:dark:text-neutral-content'} transition-colors`}>
                        {getScoreValue(student)}
                        </span>
                        <BarChart3 className="w-4 h-4 text-gray-500 group-hover:text-base-content dark:text-neutral-content transition-colors ml-2" />
                      </div>
                      </div>
                    </div>
                    
                    {/* Hover indicator */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                      <p className="text-xs text-gray-500 group-hover:text-base-content dark:text-neutral-content">Click to view detailed SGPA breakdown</p>
                    </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4">
              {filteredStudents.map((student) => (
                <div
                  key={student._id}
                  className={`border border-gray-700 rounded-xl p-4 hover:border-gray-500/50 transition-all duration-200 cursor-pointer ${
                    student.rank <= 3 ? 'ring-1 ring-gray-500/30' : ''
                  }`}
                  onClick={() => showStudentDetails(student)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        {student.rank <= 3 ? (
                          <div className={`p-2 rounded-lg ${getRankBadgeColor(student.rank)}`}>
                            {getRankIcon(student.rank)}
                          </div>
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center text-sm font-medium text-base-content dark:text-neutral-content rounded-lg">
                            #{student.rank}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base-content dark:text-neutral-content text-lg">{student.name}</h3>
                        {student.rank <= 3 && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-yellow-400 font-medium">Top Performer</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <BarChart3 className="w-5 h-5 text-base-content dark:text-neutral-content" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-base-content dark:text-neutral-content">Roll Number</span>
                      <p className="text-base-content dark:text-neutral-content font-mono">{student.seat_number}</p>
                    </div>
                    <div>
                      <span className="text-base-content dark:text-neutral-content">Year</span>
                      <p className="text-base-content dark:text-neutral-content">{student.admission_year}</p>
                    </div>
                    <div>
                      <span className="text-base-content dark:text-neutral-content">Semesters</span>
                      <p className="text-base-content dark:text-neutral-content">{student.totalSemesters}</p>
                    </div>
                    <div>
                      <span className="text-base-content dark:text-neutral-content">{getScoreLabel()}</span>
                      <p className="text-xl font-bold text-base-content dark:text-neutral-content">{getScoreValue(student)}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <p className="text-xs text-base-content dark:text-neutral-content text-center">Tap to view detailed SGPA breakdown</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
                <div className="text-sm text-base-content dark:text-neutral-content">
                  Page {currentPage} of {totalPages} ({totalStudents} total students)
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-900 border-gray-700 hover:bg-gray-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="bg-gray-900 border-gray-700 hover:bg-gray-800"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}        {/* Empty State */}
        {!loading && !error && filteredStudents.length === 0 && (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-12">
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="mb-2 text-base-content dark:text-neutral-content text-xl">
                  {debouncedSearchTerm ? 'No search results found' : 'No students found'}
                </p>
                <p className="text-base-content dark:text-neutral-content mb-4">
                  {debouncedSearchTerm 
                    ? `No students match "${debouncedSearchTerm}". Try a different search term or check your spelling.`
                    : 'No data available for the selected criteria. Try selecting a different year or semester.'
                  }
                </p>
                {debouncedSearchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-base-content dark:text-neutral-content"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </CardContent>
          </Card>        )}
      </div>

      {/* SGPA Detail Modal */}
      <SGPADetailModal />
    </div>
  );
}
