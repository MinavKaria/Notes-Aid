"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  GraduationCap,
  BookOpen,
  ChevronDown,
  School,
  Calendar,
  NotebookText,
} from "lucide-react"
import { ThemeProvider } from "next-themes"
import Navbar from "./components/Navbar"

const branches = [
  { value: "comps", label: "Computer Science" },
  { value: "mech", label: "Mechanical Engineering" },
  { value: "excp", label: "Electronics & Computer Engineering" },
  { value: "it", label: "Information Technology" },
]

const years = [
  { value: "fy", label: "First Year" },
  { value: "sy", label: "Second Year" },
  { value: "ty", label: "Third Year" },
  { value: "ly", label: "Fourth Year" },
]

const semesters = [
  { value: "oddSem", label: "Odd Semester" },
  { value: "evenSem", label: "Even Semester" },
]

export default function MainPage() {
  const router = useRouter()
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setShowForm(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    if (selectedBranch && selectedYear && selectedSemester) {
      console.log(
        `Selected Branch: ${selectedBranch}, Selected Year: ${selectedYear}, Semester: ${selectedSemester}`
      )
      router.push(
        `/${selectedYear}?branch=${selectedBranch}&sem=${selectedSemester}`
      )
    }
  }

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-gradient-to-br from-[#E1F4F3] via-white to-[#E1F4F3] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-colors duration-300">
        <Navbar />
        <div
          className={`flex-1 grid place-items-center p-4 transition-all duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {!showForm ? (
            <div className="flex flex-col items-center justify-center text-center transition-transform duration-500 transform scale-150">
              <h1 className="text-4xl font-bold text-black dark:text-white text-center opacity-100 animate-fade-out delay-150 absolute inset-0 flex items-center justify-center">
                Welcome, let&apos;s get productive!
              </h1>
            </div>
          ) : (
            <div className="w-full max-w-4xl space-y-8">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-[#706C61] dark:text-gray-300" />
                <h1 className="text-2xl font-bold text-[#333333] dark:text-white">
                  Academic Details
                </h1>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow flex-shrink min-w-[200px] group relative transition-all duration-200">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#333333] dark:text-gray-200 mb-2">
                    <School className="w-4 h-4 text-[#706C61] dark:text-gray-400" />
                    Branch
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-3 pr-10 bg-white dark:bg-gray-700 border border-[#706C61] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#706C61] dark:focus:ring-gray-500 text-[#333333] dark:text-white transition-all duration-200 hover:border-[#706C61]/80 dark:hover:border-gray-500 appearance-none"
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
                    <ChevronDown className="w-5 h-5 text-[#706C61] dark:text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex-grow flex-shrink min-w-[200px] group relative transition-all duration-200">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#333333] dark:text-gray-200 mb-2">
                    <Calendar className="w-4 h-4 text-[#706C61] dark:text-gray-400" />
                    Year
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-3 pr-10 bg-white dark:bg-gray-700 border border-[#706C61] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#706C61] dark:focus:ring-gray-500 text-[#333333] dark:text-white transition-all duration-200 hover:border-[#706C61]/80 dark:hover:border-gray-500 appearance-none"
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
                    <ChevronDown className="w-5 h-5 text-[#706C61] dark:text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex-grow flex-shrink min-w-[200px] group relative transition-all duration-200">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#333333] dark:text-gray-200 mb-2">
                    <NotebookText className="w-4 h-4 text-[#706C61] dark:text-gray-400" />
                    Semester
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-3 pr-10 bg-white dark:bg-gray-700 border border-[#706C61] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#706C61] dark:focus:ring-gray-500 text-[#333333] dark:text-white transition-all duration-200 hover:border-[#706C61]/80 dark:hover:border-gray-500 appearance-none"
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
                    <ChevronDown className="w-5 h-5 text-[#706C61] dark:text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button
                className={`w-full bg-[#333333] dark:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  !selectedBranch || !selectedYear || !selectedSemester
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#706C61] dark:hover:bg-gray-600"
                }`}
                onClick={handleContinue}
                disabled={!selectedBranch || !selectedYear || !selectedSemester}
              >
                <BookOpen className="w-4 h-4" />
                Continue to Modules
              </button>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}
