"use client";
import React, { useEffect, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFirebaseAuth } from "@/components/FirebaseAuthProvider";

type CurriculumDoc = {
  year: number;
  branch: string;
  term?: string;
  subjects: Array<{
    name: string;
    slug: string;
    collection: string;
    redirectPath?: string;
    color?: string;
  }>;
};

export default function ChoosePage() {
  const { data: session, status } = useSession();
  const { user: firebaseUser, loading: firebaseLoading } = useFirebaseAuth();
  const router = useRouter();
  const [year, setYear] = useState<number | null>(1);
  const [branch, setBranch] = useState<string>("Computer Engineering");
  const [curriculum, setCurriculum] = useState<CurriculumDoc[] | null>(null);
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);

  const branchOptions = [
    "Computer Engineering",
    "Information Technology",
    "Electronics & Telecommunication",
    "Mechanical Engineering",
    "Civil Engineering",
  ];

  const yearOptions = [1, 2, 3, 4];

  const fetchCurriculum = useCallback(async () => {
    setLoadingCurriculum(true);
    const branchMapping: { [key: string]: string } = {
      "Computer Engineering": "comps",
      "Information Technology": "it",
      "Electronics & Telecommunication": "extc",
    };

    const res = await fetch(
      `/api/curriculum?year=${year}&branch=${encodeURIComponent(
        branchMapping[branch] || "comps"
      )}`
    );
    if (res.ok) {
      const json = await res.json();
      setCurriculum(json.data || json);
    }
    setLoadingCurriculum(false);
  }, [year, branch]);

  const handleContinue = () => {
    fetchCurriculum();
    setShowSubjects(true);
  };

  useEffect(() => {
    if (showSubjects) {
      fetchCurriculum();
    }
  }, [fetchCurriculum, showSubjects]);

  const isAuthenticated = session || firebaseUser;
  const isLoading = status === "loading" || firebaseLoading;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (!showSubjects) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-lg mx-auto">

            <div className="text-center mb-10">
              <h1 className="text-4xl font-semibold mb-3 text-white">
                Select Your Semester
              </h1>
              <p className="text-gray-400 text-sm">
                Choose your branch and year to view available subjects
              </p>
            </div>


            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <div className="space-y-6">

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 text-gray-100 px-4 py-2.5 rounded-md text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                    aria-label="Select your branch"
                  >
                    {branchOptions.map((option) => (
                      <option key={option} value={option} className="bg-zinc-800">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>


                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    Year
                  </label>
                  <select
                    value={year || 1}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-zinc-800 border border-zinc-700 text-gray-100 px-4 py-2.5 rounded-md text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                    aria-label="Select your year"
                  >
                    {yearOptions.map((yearOption) => (
                      <option
                        key={yearOption}
                        value={yearOption}
                        className="bg-zinc-800"
                      >
                        Year {yearOption}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="pt-4">
                  <button
                    onClick={handleContinue}
                    className="w-full bg-white text-black font-medium py-2.5 px-4 rounded-md text-sm hover:bg-gray-200 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12">
        <div className="w-full max-w-6xl mx-auto">

          <div className="mb-8 pb-6 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold mb-2 text-white">
                  My Subjects
                </h1>
                <p className="text-gray-400 text-sm">
                  {branch} • Year {year}
                </p>
              </div>
              <button
                onClick={() => setShowSubjects(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-zinc-700 rounded-md hover:border-zinc-600 transition-colors"
              >
                Change Selection
              </button>
            </div>
          </div>


          {loadingCurriculum && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg animate-pulse"
                >
                  <div className="w-12 h-12 bg-zinc-800 rounded-md mb-4"></div>
                  <div className="h-5 bg-zinc-800 rounded mb-3"></div>
                  <div className="h-4 bg-zinc-800 rounded mb-2"></div>
                  <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          )}

          {!loadingCurriculum && curriculum && curriculum.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-medium mb-2 text-white">
                No subjects found
              </h3>
              <p className="text-gray-400 text-sm">
                No subjects are available for the selected semester and branch.
              </p>
            </div>
          )}

          {!loadingCurriculum && curriculum && curriculum.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {curriculum.flatMap((c) =>
                c.subjects.map((subject) => (
                  <div
                    key={subject.slug}
                    onClick={() =>
                      router.push(
                        subject.redirectPath || `/subject/${subject.slug}`
                      )
                    }
                    className="group cursor-pointer bg-zinc-900 border border-zinc-800 p-6 rounded-lg hover:border-zinc-600 transition-all"
                  >
                    <div className="w-12 h-12 bg-white rounded-md mb-4 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>

                    <h3 className="text-lg font-medium mb-2 text-gray-100 group-hover:text-white">
                      {subject.name}
                    </h3>

                    {/*<div className="space-y-1 mb-4">*/}
                    {/*  <div className="flex items-center text-xs text-gray-400">*/}
                    {/*    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>*/}
                    {/*    Active Course*/}
                    {/*  </div>*/}
                    {/*</div>*/}


                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                      <span className="text-sm text-gray-300 group-hover:text-white font-medium">
                        Open Course
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
