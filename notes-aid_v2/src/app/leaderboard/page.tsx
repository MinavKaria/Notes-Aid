"use client";

import {useCallback, useEffect, useState} from "react";
import Layout from "@/components/Layout";
import {Award, Calendar, ChevronDown, Medal, Search, Star, TrendingUp, Trophy, User, Users,} from "lucide-react";

import SkeletonCard from "@/components/leaderboard/SkeletonCard";
import SkeletonTable from "@/components/leaderboard/SkeletonTable";
import {
    SkeletonPerformanceBreakdown,
    SkeletonPerformerCard,
    SkeletonTopPerformersGrid
} from '@/components/leaderboard/SkeletonPerformerCard';
import type {AnalyticsResponse, LeaderboardResponse, StudentData, TopPerformersResponse} from '@/types/leaderboard';
import {calculateTiedRanks} from "@/lib/calculateTiedRanks";
import {StudentDetailModal} from "@/components/studentDetailModal";


export default function Leaderboard() {
  const [activeView, setActiveView] = useState<
    "dashboard" | "leaderboard" | "top" | "semester" | "search"
  >("dashboard");


  const [admissionYear, setAdmissionYear] = useState<number>(2024);
  const [sortBy, setSortBy] = useState<string>("avg_cgpa");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [topCount, setTopCount] = useState<number>(10);

  const getMaxSemesters = (year: number): number => {
    switch (year) {
      case 2022:
        return 6;
      case 2023:
        return 4;
      case 2024:
        return 2;
      default:
        return 8;
    }
  };

  useEffect(() => {
    const maxSems = getMaxSemesters(admissionYear);
    if (selectedSemester > maxSems) {
      setSelectedSemester(1);
    }
  }, [admissionYear, selectedSemester]);


  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardResponse | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(
    null
  );
  const [topPerformersData, setTopPerformersData] =
    useState<TopPerformersResponse | null>(null);
  const [semesterData, setSemesterData] = useState<LeaderboardResponse | null>(
    null
  );
  const [searchResults, setSearchResults] =
    useState<LeaderboardResponse | null>(null);

  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [loading, setLoading] = useState<{
    leaderboard: boolean;
    analytics: boolean;
    top: boolean;
    semester: boolean;
    search: boolean;
  }>({
    leaderboard: false,
    analytics: false,
    top: false,
    semester: false,
    search: false,
  });


  const [errors, setErrors] = useState<{
    leaderboard: string | null;
    analytics: string | null;
    top: string | null;
    semester: string | null;
    search: string | null;
  }>({
    leaderboard: null,
    analytics: null,
    top: null,
    semester: null,
    search: null,
  });


  const fetchAnalytics = useCallback(async () => {
    setLoading((prev) => ({ ...prev, analytics: true }));
    setErrors((prev) => ({ ...prev, analytics: null }));

    try {
      const response = await fetch(
        `/api/leaderboard/analytics?admission_year=${admissionYear}`
      );
      if (!response.ok) throw new Error("Failed to fetch analytics");

      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        analytics:
          error instanceof Error ? error.message : "Failed to fetch analytics",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, analytics: false }));
    }
  }, [admissionYear]);


  const fetchLeaderboard = useCallback(
    async (page: number = 1) => {
      setLoading((prev) => ({ ...prev, leaderboard: true }));
      setErrors((prev) => ({ ...prev, leaderboard: null }));

      try {
        const params = new URLSearchParams({
          admission_year: admissionYear.toString(),
          sort_by: sortBy,
          sort_order: sortOrder,
          page: page.toString(),
          limit: "50",
        });

        const response = await fetch(`/api/leaderboard?${params}`);
        if (!response.ok) throw new Error("Failed to fetch leaderboard");

        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          leaderboard:
            error instanceof Error
              ? error.message
              : "Failed to fetch leaderboard",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, leaderboard: false }));
      }
    },
    [admissionYear, sortBy, sortOrder]
  );


  const fetchTopPerformers = useCallback(async () => {
    setLoading((prev) => ({ ...prev, top: true }));
    setErrors((prev) => ({ ...prev, top: null }));

    try {
      const response = await fetch(
        `/api/leaderboard/top?admission_year=${admissionYear}&count=${topCount}`
      );
      if (!response.ok) throw new Error("Failed to fetch top performers");

      const data = await response.json();
      setTopPerformersData(data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        top:
          error instanceof Error
            ? error.message
            : "Failed to fetch top performers",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, top: false }));
    }
  }, [admissionYear, topCount]);

  const fetchSemesterData = useCallback(async () => {
    setLoading((prev) => ({ ...prev, semester: true }));
    setErrors((prev) => ({ ...prev, semester: null }));

    try {
      const response = await fetch(
        `/api/leaderboard/semester?admission_year=${admissionYear}&semester=${selectedSemester}&limit=50`
      );
      if (!response.ok) throw new Error("Failed to fetch semester data");

      const data = await response.json();
      setSemesterData(data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        semester:
          error instanceof Error
            ? error.message
            : "Failed to fetch semester data",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, semester: false }));
    }
  }, [admissionYear, selectedSemester]);

  const performSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setLoading((prev) => ({ ...prev, search: true }));
    setErrors((prev) => ({ ...prev, search: null }));

    try {
      const params = new URLSearchParams({
        admission_year: admissionYear.toString(),
        q: searchQuery,
        limit: "50",
      });

      const response = await fetch(`/api/leaderboard/search?${params}`);
      if (!response.ok) throw new Error("Failed to search");

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        search: error instanceof Error ? error.message : "Search failed",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, search: false }));
    }
  }, [admissionYear, searchQuery]);

  // Initial data fetch
  useEffect(() => {
    fetchAnalytics();
    fetchLeaderboard();
    fetchTopPerformers();
    fetchSemesterData();
  }, [fetchAnalytics, fetchLeaderboard, fetchTopPerformers, fetchSemesterData]);


  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "top", label: "Top Performers", icon: Medal },
    { id: "semester", label: "Semester View", icon: Calendar },
    { id: "search", label: "Search", icon: Search },
  ];

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="text-9xl font-bold text-yellow-400 animate-pulse">
                🏆
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3 relative z-10">
              <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
              Welcome to KJSCE Leaderboard
              <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto relative z-10">
              Where the race for excellence begins! Track academic performance,
              rankings, and achievements across different metrics
            </p>
            <p className="text-gray-500 text-sm mt-2 italic relative z-10">
              &quot;Success is not just about grades, it&apos;s about the
              journey of continuous learning&quot;
            </p>
          </div>


          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
            <div className="flex flex-wrap items-center gap-6">

              <div className="flex items-center gap-2">
                <label className="text-gray-300 text-sm font-medium">
                  Admit Year:
                </label>
                <div className="relative">
                  <select
                    value={admissionYear}
                    onChange={(e) => setAdmissionYear(Number(e.target.value))}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none appearance-none pr-8"
                  >
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                    <option value={2022}>2022</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>


              <div className="flex items-center gap-2">
                <label className="text-gray-300 text-sm font-medium">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none appearance-none pr-8"
                  >
                    <option value="avg_cgpa">CGPA</option>
                    <option value="name">Name</option>
                    <option value="seat_number">Seat Number</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>


              <div className="flex items-center gap-2">
                <label className="text-gray-300 text-sm font-medium">
                  Order:
                </label>
                <div className="relative">
                  <select
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(e.target.value as "asc" | "desc")
                    }
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none appearance-none pr-8"
                  >
                    <option value="desc">Highest First</option>
                    <option value="asc">Lowest First</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>


              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or seat number..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      // Auto-switch to search tab when typing
                      if (e.target.value.trim() && activeView !== "search") {
                        setActiveView("search");
                      }
                    }}
                    onFocus={() => {
                      if (searchQuery.trim() && activeView !== "search") {
                        setActiveView("search");
                      }
                    }}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-wrap gap-2 mb-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setActiveView(
                    item.id as
                      | "dashboard"
                      | "leaderboard"
                      | "top"
                      | "semester"
                      | "search"
                  )
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeView === item.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>


          <div className="space-y-8">

            {activeView === "dashboard" && (
              <>

                {loading.analytics ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : analyticsData ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-600/20 rounded-lg">
                          <Users className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            {analyticsData.statistics.total_students}
                          </p>
                          <p className="text-blue-400 text-sm">
                            Total Students
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-green-600/20 rounded-lg">
                          <TrendingUp className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            {analyticsData.statistics.average_cgpa.toFixed(2)}
                          </p>
                          <p className="text-green-400 text-sm">Average CGPA</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-yellow-600/20 rounded-lg">
                          <Trophy className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            {analyticsData.statistics.highest_cgpa.toFixed(2)}
                          </p>
                          <p className="text-yellow-400 text-sm">
                            Highest CGPA
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-purple-600/20 rounded-lg">
                          <Star className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            {
                              analyticsData.statistics.performance_breakdown
                                .above_9_cgpa
                            }
                          </p>
                          <p className="text-purple-400 text-sm">
                            Above 9.0 CGPA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : errors.analytics ? (
                  <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-6 mb-8 text-center">
                    <p className="text-red-400">
                      Failed to load analytics: {errors.analytics}
                    </p>
                  </div>
                ) : null}


                {loading.analytics ? (
                  <SkeletonPerformanceBreakdown />
                ) : analyticsData ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-400" />
                      Performance Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">
                          {
                            analyticsData.statistics.performance_breakdown
                              .above_9_cgpa
                          }
                        </div>
                        <div className="text-gray-300">
                          Students above 9.0 CGPA
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-green-400 h-2 rounded-full"
                            style={{
                              width: `${
                                (analyticsData.statistics.performance_breakdown
                                  .above_9_cgpa /
                                  analyticsData.statistics.total_students) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">
                          {
                            analyticsData.statistics.performance_breakdown
                              .above_8_cgpa
                          }
                        </div>
                        <div className="text-gray-300">
                          Students above 8.0 CGPA
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{
                              width: `${
                                (analyticsData.statistics.performance_breakdown
                                  .above_8_cgpa /
                                  analyticsData.statistics.total_students) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">
                          {
                            analyticsData.statistics.performance_breakdown
                              .above_7_cgpa
                          }
                        </div>
                        <div className="text-gray-300">
                          Students above 7.0 CGPA
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-400 h-2 rounded-full"
                            style={{
                              width: `${
                                (analyticsData.statistics.performance_breakdown
                                  .above_7_cgpa /
                                  analyticsData.statistics.total_students) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {loading.top ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center gap-2 mb-6">
                      <Medal className="w-5 h-5 text-yellow-400" />
                      <div className="h-6 bg-gray-700/50 rounded w-32 animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <SkeletonPerformerCard key={i} />
                      ))}
                    </div>
                  </div>
                ) : topPerformersData ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Medal className="w-5 h-5 text-yellow-400" />
                      Top 5 Performers
                    </h3>
                    <div className="space-y-3">
                      {calculateTiedRanks(topPerformersData.data, "avg_cgpa")
                        .slice(0, 5)
                        .map(({ student, rank }) => (
                          <div
                            key={student.seat_number}
                            className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                  rank === 1
                                    ? "bg-yellow-500 text-black"
                                    : rank === 2
                                    ? "bg-gray-400 text-black"
                                    : rank === 3
                                    ? "bg-amber-600 text-white"
                                    : "bg-gray-600 text-white"
                                }`}
                              >
                                {rank}
                              </div>
                              <div>
                                <button
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setIsModalOpen(true);
                                  }}
                                  className="flex items-center gap-2 text-white font-medium hover:text-blue-400 hover:underline transition-all duration-200 cursor-pointer group"
                                  title="Click to view detailed student information"
                                >
                                  <User className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                  {student.name}
                                </button>
                                <p className="text-gray-400 text-sm">
                                  {student.seat_number}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-white">
                                {student.avg_cgpa?.toFixed(2)}
                              </p>
                              <p className="text-gray-400 text-sm">CGPA</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : errors.top ? (
                  <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-6 text-center">
                    <p className="text-red-400">
                      Failed to load top performers: {errors.top}
                    </p>
                  </div>
                ) : null}
              </>
            )}


            {activeView === "leaderboard" && (
              <>
                {loading.leaderboard ? (
                  <SkeletonTable rows={15} />
                ) : errors.leaderboard ? (
                  <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-8 text-center">
                    <p className="text-red-400">
                      Error loading leaderboard: {errors.leaderboard}
                    </p>
                  </div>
                ) : leaderboardData ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-700">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        Complete Leaderboard
                      </h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700/50">
                          <tr>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Rank
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Name
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Seat Number
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              CGPA
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Year
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculateTiedRanks(
                            leaderboardData.data,
                            "avg_cgpa",
                            (leaderboardData.pagination.current_page - 1) *
                              leaderboardData.pagination.per_page
                          ).map(({ student, rank }) => (
                            <tr
                              key={student.seat_number}
                              className="border-t border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                            >
                              <td className="py-4 px-6">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                    rank === 1
                                      ? "bg-yellow-500 text-black"
                                      : rank === 2
                                      ? "bg-gray-400 text-black"
                                      : rank === 3
                                      ? "bg-amber-600 text-white"
                                      : "bg-gray-600 text-white"
                                  }`}
                                >
                                  {rank}
                                </div>
                              </td>
                              <td className="py-4 px-6 text-white font-medium">
                                <button
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setIsModalOpen(true);
                                  }}
                                  className="flex items-center gap-2 text-white font-medium hover:text-blue-400 hover:underline transition-all duration-200 cursor-pointer group"
                                  title="Click to view detailed student information"
                                >
                                  <User className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                  {student.name}
                                </button>
                              </td>
                              <td className="py-4 px-6 text-gray-300">
                                {student.seat_number}
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`font-bold ${
                                    (student.avg_cgpa || 0) >= 9
                                      ? "text-green-400"
                                      : (student.avg_cgpa || 0) >= 8
                                      ? "text-yellow-400"
                                      : (student.avg_cgpa || 0) >= 7
                                      ? "text-blue-400"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {student.avg_cgpa?.toFixed(2) || "N/A"}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-gray-300">
                                {student.admission_year}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>


                    {leaderboardData.pagination.total_pages > 1 && (
                      <div className="p-6 border-t border-gray-700 flex items-center justify-between">
                        <p className="text-gray-400">
                          Showing{" "}
                          {(leaderboardData.pagination.current_page - 1) *
                            leaderboardData.pagination.per_page +
                            1}{" "}
                          to{" "}
                          {Math.min(
                            leaderboardData.pagination.current_page *
                              leaderboardData.pagination.per_page,
                            leaderboardData.pagination.total_records
                          )}{" "}
                          of {leaderboardData.pagination.total_records} students
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              fetchLeaderboard(
                                leaderboardData.pagination.current_page - 1
                              )
                            }
                            disabled={!leaderboardData.pagination.has_prev}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() =>
                              fetchLeaderboard(
                                leaderboardData.pagination.current_page + 1
                              )
                            }
                            disabled={!leaderboardData.pagination.has_next}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </>
            )}


            {activeView === "top" && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Medal className="w-5 h-5 text-yellow-400" />
                      Top Performers
                    </h3>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-300 text-sm font-medium">
                        Show top:
                      </label>
                      <div className="relative">
                        <select
                          value={topCount}
                          onChange={(e) => setTopCount(Number(e.target.value))}
                          title="Select number of top performers to show"
                          className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none appearance-none pr-8"
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {loading.top ? (
                  <SkeletonTopPerformersGrid count={topCount} />
                ) : errors.top ? (
                  <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-8 text-center">
                    <p className="text-red-400">
                      Error loading top performers: {errors.top}
                    </p>
                  </div>
                ) : topPerformersData ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {calculateTiedRanks(topPerformersData.data, "avg_cgpa").map(
                      ({ student, rank }) => (
                        <div
                          key={student.seat_number}
                          className={`relative bg-gradient-to-br backdrop-blur-sm rounded-2xl p-6 border overflow-hidden ${
                            rank === 1
                              ? "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"
                              : rank === 2
                              ? "from-gray-600/20 to-gray-800/20 border-gray-500/30"
                              : rank === 3
                              ? "from-amber-600/20 to-amber-800/20 border-amber-500/30"
                              : "from-blue-600/20 to-blue-800/20 border-blue-500/30"
                          }`}
                        >
                          <div
                            className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              rank === 1
                                ? "bg-yellow-500 text-black"
                                : rank === 2
                                ? "bg-gray-400 text-black"
                                : rank === 3
                                ? "bg-amber-600 text-white"
                                : "bg-blue-600 text-white"
                            }`}
                          >
                            {rank}
                          </div>
                          <div className="pr-12">
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsModalOpen(true);
                              }}
                              className="flex items-center gap-2 text-xl font-bold text-white mb-2 hover:text-blue-400 hover:underline transition-all duration-200 cursor-pointer text-left group"
                              title="Click to view detailed student information"
                            >
                              <User className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                              {student.name}
                            </button>
                            <p className="text-gray-300 mb-4">
                              {student.seat_number}
                            </p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-3xl font-bold text-white">
                                  {student.avg_cgpa?.toFixed(2)}
                                </p>
                                <p className="text-gray-400 text-sm">CGPA</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg text-white">
                                  {student.admission_year}
                                </p>
                                <p className="text-gray-400 text-sm">Year</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : null}
              </div>
            )}

            {activeView === "semester" && (
              <div className="space-y-6">
                {/* Semester Selector */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      Semester-wise Rankings
                    </h3>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-300 text-sm font-medium">
                        Semester:
                      </label>
                      <div className="relative">
                        <select
                          value={selectedSemester}
                          onChange={(e) =>
                            setSelectedSemester(Number(e.target.value))
                          }
                          title="Select semester to view rankings"
                          className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none appearance-none pr-8"
                        >
                          {Array.from(
                            { length: getMaxSemesters(admissionYear) },
                            (_, i) => i + 1
                          ).map((sem) => (
                            <option key={sem} value={sem}>
                              Semester {sem}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-xs text-gray-400 ml-2">
                        ({getMaxSemesters(admissionYear)} sems available for{" "}
                        {admissionYear})
                      </span>
                    </div>
                  </div>
                </div>

                {loading.semester ? (
                  <SkeletonTable rows={12} />
                ) : errors.semester ? (
                  <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-8 text-center">
                    <p className="text-red-400">
                      Error loading semester data: {errors.semester}
                    </p>
                  </div>
                ) : semesterData && semesterData.data.length > 0 ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700/50">
                          <tr>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Rank
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Name
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Seat Number
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Semester {selectedSemester} SGPA
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculateTiedRanks(
                            semesterData.data,
                            "semester_sgpa"
                          ).map(({ student, rank }) => (
                            <tr
                              key={student.seat_number}
                              className="border-t border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                            >
                              <td className="py-4 px-6">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                    rank === 1
                                      ? "bg-yellow-500 text-black"
                                      : rank === 2
                                      ? "bg-gray-400 text-black"
                                      : rank === 3
                                      ? "bg-amber-600 text-white"
                                      : "bg-gray-600 text-white"
                                  }`}
                                >
                                  {rank}
                                </div>
                              </td>
                              <td className="py-4 px-6 text-white font-medium">
                                <button
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setIsModalOpen(true);
                                  }}
                                  className="flex items-center gap-2 text-white font-medium hover:text-blue-400 hover:underline transition-all duration-200 cursor-pointer group"
                                  title="Click to view detailed student information"
                                >
                                  <User className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                  {student.name}
                                </button>
                              </td>
                              <td className="py-4 px-6 text-gray-300">
                                {student.seat_number}
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`font-bold ${
                                    (student.semester_sgpa || 0) >= 9
                                      ? "text-green-400"
                                      : (student.semester_sgpa || 0) >= 8
                                      ? "text-yellow-400"
                                      : (student.semester_sgpa || 0) >= 7
                                      ? "text-blue-400"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {student.semester_sgpa?.toFixed(2) || "N/A"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center">
                    <p className="text-gray-400">
                      No data available for semester {selectedSemester}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeView === "search" && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                    <Search className="w-5 h-5 text-blue-400" />
                    Search Results
                    {searchQuery.trim() && (
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full border border-blue-500/30">
                        Auto-switched
                      </span>
                    )}
                  </h3>
                  {searchQuery.trim() ? (
                    <p className="text-gray-400">
                      Searching for: &quot;{searchQuery}&quot;
                    </p>
                  ) : (
                    <p className="text-gray-400">
                      Enter a name or seat number in the search bar above to
                      find students. The search tab will activate automatically
                      when you start typing!
                    </p>
                  )}
                </div>

                {loading.search ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden animate-pulse">
                    <div className="p-6 border-b border-gray-700">
                      <div className="h-4 bg-gray-700/50 rounded w-32"></div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700/50">
                          <tr>
                            <th className="py-4 px-6">
                              <div className="h-4 bg-gray-600/50 rounded w-16"></div>
                            </th>
                            <th className="py-4 px-6">
                              <div className="h-4 bg-gray-600/50 rounded w-24"></div>
                            </th>
                            <th className="py-4 px-6">
                              <div className="h-4 bg-gray-600/50 rounded w-16"></div>
                            </th>
                            <th className="py-4 px-6">
                              <div className="h-4 bg-gray-600/50 rounded w-12"></div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="border-t border-gray-700/50">
                              <td className="py-4 px-6">
                                <div className="h-5 bg-gray-700/50 rounded w-32"></div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="h-5 bg-gray-700/50 rounded w-20"></div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="h-5 bg-gray-700/50 rounded w-16"></div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="h-5 bg-gray-700/50 rounded w-12"></div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : errors.search ? (
                  <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-8 text-center">
                    <p className="text-red-400">
                      Error searching: {errors.search}
                    </p>
                  </div>
                ) : searchResults && searchResults.data.length > 0 ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-700">
                      <p className="text-gray-400">
                        Found {searchResults.pagination.total_records} results
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700/50">
                          <tr>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Name
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Seat Number
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              CGPA
                            </th>
                            <th className="text-left py-4 px-6 text-gray-300 font-medium">
                              Year
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.data.map((student) => (
                            <tr
                              key={student.seat_number}
                              className="border-t border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                            >
                              <td className="py-4 px-6 text-white font-medium">
                                <button
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setIsModalOpen(true);
                                  }}
                                  className="flex items-center gap-2 text-white font-medium hover:text-blue-400 hover:underline transition-all duration-200 cursor-pointer group"
                                  title="Click to view detailed student information"
                                >
                                  <User className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                  {student.name}
                                </button>
                              </td>
                              <td className="py-4 px-6 text-gray-300">
                                {student.seat_number}
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`font-bold ${
                                    (student.avg_cgpa || 0) >= 9
                                      ? "text-green-400"
                                      : (student.avg_cgpa || 0) >= 8
                                      ? "text-yellow-400"
                                      : (student.avg_cgpa || 0) >= 7
                                      ? "text-blue-400"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {student.avg_cgpa?.toFixed(2) || "N/A"}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-gray-300">
                                {student.admission_year}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : searchQuery.trim() && searchResults ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center">
                    <p className="text-gray-400">
                      No results found for &quot;{searchQuery}&quot;
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      <StudentDetailModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
      />
    </Layout>
  );
}

