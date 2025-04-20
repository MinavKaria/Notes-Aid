// "use client";
// import React, { useState, useEffect } from "react";
// import useProgress from "../hook/useProgress"; // Adjust path as needed
// import { Subjects } from "../interfaces/Subject";
// import { Book, Calculator, Code } from "lucide-react";

// // Sample subject data with 3 subjects
// const sampleSubjects: Subjects = {
//   mathematics: {
//     name: "Mathematics",
//     icon: Calculator,
//     color: "blue",
//     modules: {
//       1: {
//         notesLink: ["math-notes-1"],
//         topics: [
//           {
//             title: "Algebra",
//             description: "Basic algebra concepts",
//             videos: [
//               { title: "Introduction to Algebra", url: "video-url-1" },
//               { title: "Algebraic Expressions", url: "video-url-2" },
//             ],
//           },
//           {
//             title: "Geometry",
//             description: "Basic geometry concepts",
//             videos: [{ title: "Introduction to Geometry", url: "video-url-3" }],
//           },
//         ],
//       },
//       2: {
//         notesLink: ["math-notes-1"],
//         topics: [
//           {
//             title: "Algebra",
//             description: "Basic algebra concepts",
//             videos: [
//               { title: "Introduction to Algebra", url: "video-url-1" },
//               { title: "Algebraic Expressions", url: "video-url-2" },
//             ],
//           },
//           {
//             title: "Geometry",
//             description: "Basic geometry concepts",
//             videos: [{ title: "Introduction to Geometry", url: "video-url-3" }],
//           },
//         ],
//       },
//     },
//   },
//   programming: {
//     name: "Programming",
//     icon: Code,
//     color: "green",
//     modules: {
//       1: {
//         notesLink: ["programming-notes-1"],
//         topics: [
//           {
//             title: "JavaScript",
//             description: "JavaScript fundamentals",
//             videos: [
//               { title: "Variables and Data Types", url: "video-url-1" },
//               { title: "Functions and Scope", url: "video-url-2" },
//             ],
//           },
//         ],
//       },
//     },
//   },
//   literature: {
//     name: "Literature",
//     icon: Book,
//     color: "purple",
//     modules: {
//       1: {
//         notesLink: ["literature-notes-1"],
//         topics: [
//           {
//             title: "ClassicNovels",
//             description: "Study of classic novels",
//             videos: [
//               {
//                 title: "Introduction to Literary Analysis",
//                 url: "video-url-1",
//               },
//               { title: "Character Development", url: "video-url-2" },
//             ],
//           },
//         ],
//       },
//     },
//   },
// };

// const MultiSubjectProgress: React.FC = () => {
//   const [activeSubject, setActiveSubject] = useState<string>("mathematics");
//   const [isMounted, setIsMounted] = useState(false);

//   // Create a progress hook for the active subject
//   const { progressData, updateVideoProgress, resetProgress } =
//     useProgress(activeSubject);

//   // Handle client-side mounting
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Function to get total videos in a subject
//   const getTotalVideos = (subjectName: string): number => {
//     const subject = sampleSubjects[subjectName];
//     let count = 0;

//     Object.keys(subject.modules).forEach((moduleKey) => {
//       const module = subject.modules[Number(moduleKey)];
//       module.topics.forEach((topic) => {
//         count += topic.videos?.length || 0;
//       });
//     });

//     return count;
//   };

//   // Function to calculate completion percentage
//   const getCompletionPercentage = (subjectName: string): number => {
//     if (!isMounted) return 0;

//     const total = getTotalVideos(subjectName);
//     if (total === 0) return 0;

//     if (subjectName === activeSubject) {
//       // For active subject, use the current progressData
//       return Math.min(
//         Math.round((progressData.subjectProgress / total) * 100),
//         100
//       );
//     }

//     // For non-active subjects, get data from localStorage safely
//     try {
//       if (typeof window !== "undefined") {
//         const storedData = localStorage.getItem(`${subjectName}-progress`);
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           const completed = parsedData.subjectProgress || 0;
//           return Math.min(Math.round((completed / total) * 100), 100);
//         }
//       }
//     } catch (error) {
//       console.error("Error reading progress data:", error);
//     }

//     return 0;
//   };

//   // Function to render the subject tabs
//   const renderSubjectTabs = () => {
//     return Object.keys(sampleSubjects).map((subjectKey) => {
//       const subject = sampleSubjects[subjectKey];
//       const Icon = subject.icon;
//       const isActive = activeSubject === subjectKey;
//       const percentage = getCompletionPercentage(subjectKey);

//       return (
//         <div
//           key={subjectKey}
//           className={`subject-tab ${isActive ? "active" : ""}`}
//           style={{
//             borderColor: isActive ? subject.color : "transparent",
//             padding: "10px",
//             margin: "5px",
//             cursor: "pointer",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             borderWidth: "2px",
//             borderStyle: "solid",
//             borderRadius: "8px",
//           }}
//           onClick={() => setActiveSubject(subjectKey)}
//         >
//           <Icon size={24} color={subject.color} />
//           <span>{subject.name}</span>
//           <div
//             style={{
//               width: "100%",
//               height: "8px",
//               backgroundColor: "#eee",
//               borderRadius: "4px",
//               margin: "5px 0",
//             }}
//           >
//             <div
//               style={{
//                 width: `${percentage}%`,
//                 height: "100%",
//                 backgroundColor: subject.color,
//                 borderRadius: "4px",
//               }}
//             ></div>
//           </div>
//           <span>{percentage}%</span>
//         </div>
//       );
//     });
//   };

//   // Get active subject details
//   const currentSubject = sampleSubjects[activeSubject];

//   // Render videos for the selected subject
//   const renderSubjectVideos = () => {
//     if (!currentSubject || !currentSubject.modules) {
//       return <p>No subject data available</p>;
//     }

//     const moduleKeys = Object.keys(currentSubject.modules);
//     if (moduleKeys.length === 0) {
//       return <p>No modules available</p>;
//     }

//     return moduleKeys.map((moduleKey) => {
//       const module = currentSubject.modules[Number(moduleKey)];
//       if (!module || !module.topics) {
//         return <p key={moduleKey}>No data for module {moduleKey}</p>;
//       }

//       const moduleProgress = progressData.moduleProgress[moduleKey] || 0;

//       // Count total videos in this module
//       let totalModuleVideos = 0;
//       module.topics.forEach((topic) => {
//         totalModuleVideos += topic.videos?.length || 0;
//       });

//       return (
//         <div
//           key={moduleKey}
//           style={{
//             margin: "20px 0",
//             padding: "15px",
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//           }}
//         >
//           <h2>Module {moduleKey}</h2>
//           <p>
//             Progress: {moduleProgress}/{totalModuleVideos} videos
//           </p>

//           {module.topics.map((topic, topicIndex) => {
//             if (!topic) return null;

//             const topicKey = `${activeSubject}-module${moduleKey}-topic${topic.title}`;
//             const topicProgress = progressData.topicProgress[topicKey] || 0;
//             const totalTopicVideos = topic.videos?.length || 0;

//             return (
//               <div
//                 key={topicIndex}
//                 style={{
//                   margin: "15px 0",
//                   padding: "10px",
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <h3>{topic.title}</h3>
//                 <p>{topic.description}</p>
//                 <p>
//                   Progress: {topicProgress}/{totalTopicVideos} videos
//                 </p>

//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "10px",
//                   }}
//                 >
//                   {topic.videos?.map((video, videoIndex) => {
//                     if (!video) return null;

//                     const videoKey = `${activeSubject}-module${moduleKey}-topic${topic.title}-video${videoIndex}`;
//                     const isCompleted =
//                       progressData.completeVideos[videoKey] === true;

//                     return (
//                       <div
//                         key={videoIndex}
//                         style={{
//                           padding: "10px",
//                           backgroundColor: isCompleted ? "#e6f7e6" : "#fff",
//                           borderRadius: "6px",
//                           border: "1px solid #ddd",
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                         }}
//                       >
//                         <h4 style={{ margin: "0" }}>{video.title}</h4>
//                         <button
//                           onClick={() =>
//                             updateVideoProgress(
//                               moduleKey,
//                               videoIndex.toString(),
//                               topic.title
//                             )
//                           }
//                           style={{
//                             backgroundColor: isCompleted
//                               ? "#4CAF50"
//                               : "#2196F3",
//                             color: "white",
//                             border: "none",
//                             padding: "8px 16px",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {isCompleted
//                             ? "Mark as Incomplete"
//                             : "Mark as Complete"}
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       );
//     });
//   };

//   // Show loading state until component is mounted
//   if (!isMounted) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "300px",
//         }}
//       >
//         <p>Loading progress data...</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         maxWidth: "1000px",
//         margin: "0 auto",
//       }}
//     >
//       <h1 style={{ textAlign: "center", margin: "20px 0" }}>
//         Learning Progress Tracker
//       </h1>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           margin: "20px 0",
//         }}
//       >
//         {renderSubjectTabs()}
//       </div>

//       <div
//         style={{
//           padding: "20px",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//           }}
//         >
//           <h1 style={{ margin: "0", color: currentSubject.color }}>
//             {currentSubject.name}
//           </h1>
//           <button
//             onClick={resetProgress}
//             style={{
//               backgroundColor: "#f44336",
//               color: "white",
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Reset Progress
//           </button>
//         </div>

//         <div
//           style={{
//             padding: "15px",
//             backgroundColor: "#f5f5f5",
//             borderRadius: "8px",
//             marginBottom: "20px",
//           }}
//         >
//           <h3>Overall Progress</h3>
//           <p>
//             {progressData.subjectProgress}/{getTotalVideos(activeSubject)}{" "}
//             videos completed
//           </p>
//           <div
//             style={{
//               width: "100%",
//               height: "15px",
//               backgroundColor: "#eee",
//               borderRadius: "8px",
//             }}
//           >
//             <div
//               style={{
//                 width: `${getCompletionPercentage(activeSubject)}%`,
//                 height: "100%",
//                 backgroundColor: currentSubject.color,
//                 borderRadius: "8px",
//                 transition: "width 0.3s ease",
//               }}
//             ></div>
//           </div>
//         </div>

//         {renderSubjectVideos()}
//       </div>
//     </div>
//   );
// };

// export default MultiSubjectProgress;

import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page
