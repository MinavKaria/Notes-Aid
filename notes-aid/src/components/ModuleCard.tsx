import React from "react";
// import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProgressBar from "./ProgressBar";

interface ModuleCardProps {
  module: number;
  topics: number;
  isActive: boolean;
  onClick: () => void;
  numberOfVideos: number;
  numberOfVideosCompleted: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  topics,
  isActive,
  onClick,
  numberOfVideos,
  numberOfVideosCompleted
}) => {
  // const total = 100;
  // const [done, setdone] = useState(20);

  // console.log("Module Progress for this is "+(progressData.moduleProgress[module] || 0))
  // console.log(topics)
  // console.log("Number of videos in this module is: "+numberOfVideos)

  // setdone(40);

  // console.log(progressData.moduleProgress[module])


  // const [progressDataa, setProgressData2] = useState({});

  // const { progressData: progressData2 } = useProgress(subjectName);
//   console.log( progressData2);
//   console.log(progressData.moduleProgress[module] || 0);

  //   console.log(subjectName)
  // setProgressData2(progressData2);
  // console.log("Progress Data is: " + progressDataa);



  // console.log(progressData2);

  
  return (
    <>
      <div
        onClick={onClick}
        className={`
        p-3 
        rounded-lg 
        
        transition-all 
        cursor-pointer 
        shadow-md
        hover:shadow-2xl
        ${
          isActive
            ? "border-blue-500 bg-base-100"
            : "border-slate-200 bg-base-300"
        }
      `}
      >
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className={` font-semibold text-base-content`}>
                Module {module}
              </h3>
              <span className="text-xs px-2 py-0.5 bg-neutral text-neutral-content dark:bg-icons rounded-full dark:text-background">
                {topics} topics
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                isActive ? "rotate-180" : ""
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <ProgressBar
                total={numberOfVideos}
                completed={numberOfVideosCompleted || 0}
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-base whitespace-nowrap">
              {numberOfVideosCompleted || 0}/{numberOfVideos} videos
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleCard;
