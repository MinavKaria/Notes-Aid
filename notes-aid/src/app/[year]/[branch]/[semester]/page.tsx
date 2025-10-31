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

  // console.log(branch, sem, slug);

  const typedNotesData = NotesData as NotesDataType;

  const subjects = slug && typedNotesData[slug]?.[branch]?.[sem];
  // console.log(subjects)
  

  const pyq = (pyqLinks as PyqLinks)[slug] || [];
  // console.log(pyq)
  // const subjects = NotesData.fy.comps.oddSem;

  const isMountedRef = useRef(isMounted);
  useEffect(() => {
    setIsMounted(true);
    console.log(isMountedRef.current); // Access via ref instead
  }, []);

  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
   
  }, [subjects]);

  const initialSubject = subjects ? Object.keys(subjects)[0] : "";
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedModule, setSelectedModule] = useState<number>(1);
  

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const fromBookmark = params.get('fromBookmark');
  
  if (fromBookmark) {
    try {
      const bookmarkState = JSON.parse(fromBookmark);
      if (bookmarkState.selectedSubject && bookmarkState.selectedModule) {
        setSelectedSubject(bookmarkState.selectedSubject);
        setSelectedModule(bookmarkState.selectedModule);
      }
    } catch (e) {
      console.error('Error parsing bookmark state', e);
    }
  }
  }, []);

  useEffect(() => {
  if (subjects && selectedSubject) {
    const params = new URLSearchParams(window.location.search);
    const moduleParam = params.get("module");

    if (moduleParam) {
      setSelectedModule(parseInt(moduleParam));
    } else {
      const firstModuleKey = Object.keys(
        subjects[selectedSubject]?.modules || {}
      )[0];
      setSelectedModule(firstModuleKey ? parseInt(firstModuleKey) : 1);
    }
  }
  }, [selectedSubject, subjects]);


  const { progressData, updateVideoProgress, resetProgress } = useProgress(selectedSubject);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!subjects || Object.keys(subjects).length === 0 ) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
        <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-6">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xs p-6 text-center">
            <h2 className="text-lg md:text-2xl font-bold mb-4 text-black dark:text-base">
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

  const numberVideoInModule = (k: number) =>
    subjects[selectedSubject].modules[k].topics.reduce((acc, topic) => {
      return acc + (topic.videos?.length || 0);
    }, 0);
  
  const handleResetProgress = () => {
    setShowResetConfirmation(true);
  };

  const confirmReset = () => {
    resetProgress();
    setShowResetConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="w-full p-4 md:p-6">
        <div className="max-w-full mx-auto bg-base-300 rounded-lg shadow-xs p-4 md:p-6">
          <div className="mb-6 md:mb-8 text-center md:text-left">
            <h1 className="text-lg md:text-2xl font-bold mb-2 text-base-content">
              Engineering Curriculum of {branch.toUpperCase()} /{" "}
              {slug.toUpperCase()} /{" "}
              {sem.charAt(0).toUpperCase() + sem.slice(1)}
            </h1>
            <p className="text-base-content">
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
                    setSelectedSubject(key)
                    const firstModuleKey = Object.keys(
                      subjects[key]?.modules || {}
                    )[0]
                    // console.log(key, firstModuleKey)
                    setSelectedModule(
                      firstModuleKey ? parseInt(firstModuleKey) : 1
                    )
                  }}
                  className={`p-4 rounded-4xl cursor-pointer transition-all flex-1 max-w-[120px] sm:max-w-[150px] md:max-w-none text-center 
                      ${
                        selectedSubject === key
                          ? "bg-neutral text-neutral-content border-white shadow-xl"
                          : "bg-base-200  text-base-content  border-gray-200 shadow-sm"
                      }
                    `}
                >
                  <div className="flex items-center justify-center gap-2 mb-2 flex-col">
                    <Icon
                      className={`w-6 h-6 ${
                        selectedSubject === key
                          ? " text-neutral-content"
                          : "text-base-content"
                      }`}
                    />
                    <h3
                      className={`font-medium dark:text-base text-sm md:text-base ${
                        selectedSubject === key
                          ? "text-neutral-content"
                          : "text-base-content"
                      }`}
                    >
                      {subject.name}
                    </h3>
                  </div>
                  <p
                    className={`text-xs  md:text-sm${
                      selectedSubject === key
                        ? "text-primary-content"
                        : "text-neutral-content"
                    }`}
                  >
                    {Object.keys(subject.modules).length} modules
                  </p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 ">
            <div className="space-y-3 border border-border p-4 rounded-lg">
              <h2 className=" md:text-lg font-bold  text-base-content">
                Important Links
              </h2>
              <div className="flex gap-2 flex-wrap mb-8">
                {Object.keys(pyq).length > 0 &&
                  pyq.map((pyq, index) => {
                    return (
                      <>
                        <div key={index} > 
                        <a
                          href={pyq.url}
                          target="_blank"
                          className="btn inline-block px-4 py-2 mt-2 text-sm font-medium bg-neutral text-neutral-content btn-soft btn-neutral border-1 border-primary"
                          key={index}
                        >
                          {pyq.title}
                            </a>
                          </div>
                      </>
                    )
                  })}
              </div>

              <h2 className="text-base md:text-lg font-bold mb-1  text-primary-text">
                Modules
              </h2>
              {Object.keys(subjects[selectedSubject].modules).map(
                (moduleKey) => {
                  const moduley = parseInt(moduleKey);
                  return (
                    <ModuleCard
                      key={moduley}
                      module={moduley}
                      subjectName={subjects[selectedSubject].name}
                      topics={
                        subjects[selectedSubject].modules[moduley].topics.length
                      }
                      isActive={selectedModule === moduley}
                      onClick={() => setSelectedModule(moduley)}
                      numberOfVideosCompleted={
                        progressData.moduleProgress[moduley] || 0
                      }
                      numberOfVideos={numberVideoInModule(moduley)}
                      currentSubject={selectedSubject}
                    
                    
                    />
                  );
                }
              )}

              <button
                onClick={handleResetProgress}
                className="w-full px-4 py-2 text-sm font-medium text-warning-content bg-warning rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Progress
              </button>
            </div>

            <div className="md:col-span-2 bg-base-200 text-base-content rounded-lg p-4 md:p-6 border border-border">
              <h2 className="text-base md:text-lg font-bold mb-1 text-base-content">
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
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black dark:text-base">
                Reset Progress
              </h3>
              <button
                onClick={() => setShowResetConfirmation(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-base dark:hover:text-gray-200"
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
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-background dark:text-base dark:hover:bg-gray-600"
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
