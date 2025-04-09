"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
// import ModuleCard from "../components/ModuleCard";
// import TopicList from "../components/TopicList";
// import Navbar from "../components/Navbar";
// import NotesData from "../notes/data";
// import pyqLinks from "../notes/pyq";
import ModuleCard from "@/components/ModuleCard";
import TopicList from "@/components/TopicList";
import NotesData from "@/notes/data";
import pyqLinks from "@/notes/pyq";
import useProgress from "@/hook/useProgress";
import { RotateCcw, X } from "lucide-react";

interface Topic {
  title: string;
  description: string;
  videos?: {
    title: string;
    url?: string;
  }[];
  notes?: {
    title: string;
    url: string;
  }[];
}

interface NotesLink {
  title: string;
  url: string;
}

interface Module {
  [key: number]: {
    notesLink: NotesLink[];
    topics: Topic[];
  };
}

interface Subject {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  modules: Module;
}

interface Subjects {
  [subjectKey: string]: Subject;
}

interface SemesterData {
  [key: string]: Subjects;
}

interface BranchData {
  [key: string]: SemesterData;
}

interface NotesDataType {
  [year: string]: BranchData;
}

interface PyqLink {
  title: string;
  url: string;
}

interface PyqLinks {
  [year: string]: PyqLink[];
}

const EngineeringCurriculum: React.FC = () => {
  const {
    year: slug,
    branch,
    semester: sem,
  } = useParams<{ year: string; branch: string; semester: string }>();
  //   const searchParam = useSearchParams();
  //   const branch = searchParam.get("branch") || "";
  //   const sem = searchParam.get("sem") || "";
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  console.log(branch, sem, slug);

  const typedNotesData = NotesData as NotesDataType;

  const subjects = slug && typedNotesData[slug]?.[branch]?.[sem];
  const pyq = (pyqLinks as PyqLinks)[slug] || [];
  // console.log(pyq)
  // const subjects = NotesData.fy.comps.oddSem;

  const isMountedRef = useRef(isMounted);
  useEffect(() => {
    setIsMounted(true);
    console.log(isMountedRef.current); // Access via ref instead
  }, []);

  useEffect(() => {
    if (subjects) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [subjects]);

  const initialSubject = subjects ? Object.keys(subjects)[0] : "";
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedModule, setSelectedModule] = useState<number>(1);

  useEffect(() => {
    if (subjects && selectedSubject) {
      const firstModuleKey = Object.keys(
        subjects[selectedSubject]?.modules || {}
      )[0];
      setSelectedModule(firstModuleKey ? parseInt(firstModuleKey) : 1);
    }
  }, [selectedSubject, subjects]);

  const { progressData, updateVideoProgress, resetProgress } =
    useProgress(selectedSubject);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (!subjects || Object.keys(subjects).length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
        <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-6">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-lg md:text-2xl font-bold mb-4 text-black dark:text-white">
              No Subjects Found
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              It seems there are no subjects available for the selected
              curriculum. Will be added soon
            </p>
          </div>
        </div>
      </div>
    );
  }

  // const getTotalVideos = (subjectName: string): number => {
  //   const subject = subjects[subjectName];
  //   let count = 0;

  //   Object.keys(subject.modules).forEach((moduleKey) => {
  //     const moduley = subject.modules[Number(moduleKey)];
  //     moduley.topics.forEach((topic) => {
  //       count += topic.videos?.length || 0;
  //     });
  //   });

  //   return count;
  // };

  // const getCompletionPercentage = (subjectName: string): number => {
  //   if (!isMounted) return 0;

  //   const total = getTotalVideos(subjectName);
  //   if (total === 0) return 0;

  //   if (subjectName === selectedSubject) {

  //     return Math.min(Math.round((progressData.subjectProgress / total) * 100), 100);
  //   }

  //   try {
  //     if (typeof window !== 'undefined') {
  //       const storedData = localStorage.getItem(`${subjectName}-progress`);
  //       if (storedData) {
  //         const parsedData = JSON.parse(storedData);
  //         const completed = parsedData.subjectProgress || 0;
  //         return Math.min(Math.round((completed / total) * 100), 100);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error reading progress data:", error);
  //   }

  //   return 0;
  // };

  // console.log(getTotalVideos("cc"))

  const numberVideoInModule = (k: number) =>
    subjects[selectedSubject].modules[k].topics.reduce((acc, topic) => {
      return acc + (topic.videos?.length || 0);
    }, 0);

  // console.log("Hello")
  // console.log(numberVideoInModule)

  const handleResetProgress = () => {
    setShowResetConfirmation(true);
  };

  const confirmReset = () => {
    resetProgress();
    setShowResetConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      <div className="w-full p-4 md:p-6">
        <div className="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6">
          <div className="mb-6 md:mb-8 text-center md:text-left">
            <h1 className="text-lg md:text-2xl font-bold mb-2 text-black dark:text-white">
              Engineering Curriculum of {branch.toUpperCase()} /{" "}
              {slug.toUpperCase()} /{" "}
              {sem.charAt(0).toUpperCase() + sem.slice(1)}
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Explore subjects and their module-wise topics
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
            {Object.entries(subjects).map(([key, subject]) => {
              const Icon = subject.icon;
              // console.log(subject)

              return (
                <div
                  key={key}
                  onClick={() => {
                    setSelectedSubject(key);
                    const firstModuleKey = Object.keys(
                      subjects[key]?.modules || {}
                    )[0];
                    console.log(key, firstModuleKey);
                    setSelectedModule(
                      firstModuleKey ? parseInt(firstModuleKey) : 1
                    );
                  }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all flex-1 max-w-[120px] sm:max-w-[150px] md:max-w-none text-center 
                      ${
                        selectedSubject === key
                          ? "border-blue-500 bg-blue-50 dark:bg-[#2D336B] dark:border-[#7886C7]"
                          : "bg-blue-200 dark:bg-[#000957] hover:border-blue-200 dark:hover:border-[#A9B5DF]"
                      }
                    `}
                >
                  <div className="flex items-center justify-center gap-2 mb-2 flex-col">
                    <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    <h3 className="font-medium text-black dark:text-white text-sm md:text-base">
                      {subject.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 md:text-sm">
                    {Object.keys(subject.modules).length} modules
                  </p>
                </div>
              );
            })}
          </div>
          <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 shadow-sm mb-4">
            <h2 className="text-sm md:text-base font-bold mb-2 text-black dark:text-white">
              Important Links
            </h2>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(pyq).length > 0 &&
                pyq.map((pyq, index) => {
                  return (
                    <a
                      href={pyq.url}
                      target="_blank"
                      className="inline-block px-4 py-2 mt-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
                      key={index}
                    >
                      {pyq.title}
                    </a>
                  );
                })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-3">
              {Object.keys(subjects[selectedSubject].modules).map(
                (moduleKey) => {
                  const moduley = parseInt(moduleKey);
                  return (
                    <ModuleCard
                      key={moduley}
                      module={moduley}
                      topics={
                        subjects[selectedSubject].modules[moduley].topics.length
                      }
                      isActive={selectedModule === moduley}
                      onClick={() => setSelectedModule(moduley)}
                      progressData={progressData}
                      numberOfVideos={numberVideoInModule(moduley)}
                    />
                  );
                }
              )}
              <button
                onClick={handleResetProgress}
                className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Progress
              </button>
            </div>

            <div className="md:col-span-2 bg-slate-50 dark:bg-gray-900 rounded-lg p-4 md:p-6">
              <h2 className="text-base md:text-lg font-bold mb-1 text-black dark:text-white">
                {subjects[selectedSubject].name} - Module {selectedModule || 1}
              </h2>
              <p className=" text-red-500 mb-4">
                These videos only serve as explanations for the college notes,
                so please refer to the notes to study.
              </p>
              <TopicList
                topics={
                  subjects[selectedSubject].modules[selectedModule].topics || []
                }
                notesLink={
                  subjects[selectedSubject].modules[selectedModule].notesLink ||
                  []
                }
                moduleNumber={selectedModule || 1}
                updateVideoProgress={updateVideoProgress}
                // moduleKey={`${selectedSubject}-module${selectedModule}`}
                moduleKey={`${selectedModule}`}
                subjectName={selectedSubject}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Reset Confirmation Modal */}
      {showResetConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black dark:text-white">
                Reset Progress
              </h3>
              <button
                onClick={() => setShowResetConfirmation(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to reset your progress for this subject?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineeringCurriculum;
