"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  ChevronDown,
  School,
  Calendar,
  NotebookText,
  RotateCcw,
} from "lucide-react";

const branches = [
  { value: "comps", label: "Computer Science" },
  { value: "mech", label: "Mechanical Engineering" },
  { value: "excp", label: "Electronics & Computer Engineering" },
  { value: "it", label: "Information Technology" },
  { value: "extc", label: "Electronics & Telecommunication Engineering" },
  { value: "rai", label: "Robotics & Automation Engineering" },
  { value: "cce", label: "Computer and Communication Engineering" },
  { value: "csbs", label: "Computer Science and Business Systems" },
  { value: "aids", label: "Artificial Intelligence and Data Science" },
];

const years = [
  { value: "fy", label: "First Year" },
  { value: "sy", label: "Second Year" },
  { value: "ty", label: "Third Year" },
  { value: "ly", label: "Fourth Year" },
];

const semesters = [
  { value: "odd", label: "Odd Semester" },
  { value: "even", label: "Even Semester" },
  // { value: "p", label: "P Group" },
  // { value: "c", label: "C Group" },
];

export default function MainPage() {
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [hasPreviousSelection, setHasPreviousSelection] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowForm(true);
    }, 750);

    // Check for previous selections in localStorage
    const previousBranch = localStorage.getItem("selectedBranch");
    const previousYear = localStorage.getItem("selectedYear");
    const previousSemester = localStorage.getItem("selectedSemester");

    if (previousBranch && previousYear && previousSemester) {
      setHasPreviousSelection(true);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (selectedBranch && selectedYear && selectedSemester) {
      // Save current selections to localStorage
      localStorage.setItem("selectedBranch", selectedBranch);
      localStorage.setItem("selectedYear", selectedYear);
      localStorage.setItem("selectedSemester", selectedSemester);

      // console.log(
      //   `Selected Branch: ${selectedBranch}, Selected Year: ${selectedYear}, Semester: ${selectedSemester}`
      // );

      if (
        selectedYear === "fy" &&
        !(selectedBranch === "comps" || selectedBranch === "aids")
      ) {
        if (selectedSemester === "odd") router.push(`/fy/comps/even`);
        else router.push(`/fy/comps/odd`);
      } else
        router.push(`/${selectedYear}/${selectedBranch}/${selectedSemester}`);
    }
  };

  const handleReturnToPrevious = () => {
    const previousBranch = localStorage.getItem("selectedBranch");
    const previousYear = localStorage.getItem("selectedYear");
    const previousSemester = localStorage.getItem("selectedSemester");

    if (previousBranch && previousYear && previousSemester) {
      router.push(`/${previousYear}/${previousBranch}/${previousSemester}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 dark:from-neutral dark:via-base-300 dark:to-neutral flex flex-col transition-colors duration-300">
      <div
        className={`flex-1 grid place-items-center p-4 transition-all duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {!showForm ? (
          <div className="flex flex-col items-center justify-center text-center transition-transform duration-500 transform scale-150">
            <h1 className="text-4xl font-bold text-base-content text-center opacity-100 animate-fade-out delay-150 absolute inset-0 flex items-center justify-center">
              Welcome, let&apos;s get productive!
            </h1>
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-4">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-8 h-8  text-base-content" />
              <h1 className="text-2xl font-bold text-base-content">
                Academic Details
              </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Branch */}
              <div className="grow shrink min-w-[200px] group relative transition-all duration-200">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content mb-2">
                  <School className="w-4 h-4 text-base-content" />
                  Branch
                </label>
                <div className="relative">
                  <select
                    className="select select-bordered w-full text-base-content"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose a branch
                    </option>
                    {branches.map((branch, index) => (
                      <option key={index} value={branch.value}>
                        {branch.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-neutral-content absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Year */}
              <div className="grow shrink min-w-[200px] group relative transition-all duration-200">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content mb-2">
                  <Calendar className="w-4 h-4 text-base-content" />
                  Year
                </label>
                <div className="relative">
                  <select
                    className="select select-bordered w-full text-base-content dark:text-neutral-content"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose your year
                    </option>
                    {years.map((year) => (
                      <option key={year.value} value={year.value}>
                        {year.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-neutral-content absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Semester */}
              <div className="grow shrink min-w-[200px] group relative transition-all duration-200">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content mb-2">
                  <NotebookText className="w-4 h-4 text-base-content" />
                  Semester
                </label>
                <div className="relative">
                  <select
                    className="select select-bordered w-full text-base-content dark:text-neutral-content"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose your semester
                    </option>
                    {semesters.map((semester) => (
                      <option key={semester.value} value={semester.value}>
                        {semester.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-neutral-content absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={!selectedBranch || !selectedYear || !selectedSemester}
              className={`w-full btn btn-neutral dark:btn-primary transition-all duration-200 flex items-center justify-center gap-2 ${
                !selectedBranch || !selectedYear || !selectedSemester
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Continue to Modules
            </button>

            <div className="flex items-center w-full justify-end">
              {hasPreviousSelection && (
                <button
                  onClick={handleReturnToPrevious}
                  className="btn btn-outline text-sm gap-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Return to Previous Selection
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
