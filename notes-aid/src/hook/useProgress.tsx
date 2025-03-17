import { useState, useEffect } from "react";
// import { Subjects } from "../interfaces/Subject";

interface ProgressData {
    completeVideos: {
        [key: string]: boolean;
    };
    moduleProgress: {
        [key: string]: number;
    };
    topicProgress: {
        [key: string]: number;
    };
    subjectProgress: number;
}

const useProgress = (subjectName: string) => {
    const key = subjectName + "-progress";
    
    const [progressData, setProgressData] = useState<ProgressData>({
        completeVideos: {},
        moduleProgress: {},
        topicProgress: {},
        subjectProgress: 0
    });

  
    useEffect(() => {
        const storedProgress = localStorage.getItem(key);
        if (storedProgress) {
            try {
                setProgressData(JSON.parse(storedProgress));
                // console.log("Progress Data is: "+JSON.parse(storedProgress))
            } catch {
                console.error("Failed to parse stored progress data");
            }
        }
    }, [key]);


    const saveToLocalStorage = (data: ProgressData) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

  
    const updateVideoProgress = (moduleIndex: string, videoIndex: string, topicName: string) => {
        const videoKey = `${subjectName}-module${moduleIndex}-topic${topicName}-video${videoIndex}`;
        const isVideoCompleted = progressData.completeVideos[videoKey] === true;

        // console.log(videoKey)
        
   
        const newProgressData = { ...progressData };
        
  
        newProgressData.completeVideos = {
            ...progressData.completeVideos,
            [videoKey]: !isVideoCompleted
        };
        
      
        const currentModuleProgress = progressData.moduleProgress[moduleIndex] || 0;
        newProgressData.moduleProgress = {
            ...progressData.moduleProgress,
            [moduleIndex]: isVideoCompleted 
                ? Math.max(0, currentModuleProgress - 1) 
                : currentModuleProgress + 1
        };
        

        const topicKey = `${subjectName}-module${moduleIndex}-topic${topicName}`;
        const currentTopicProgress = progressData.topicProgress[topicKey] || 0;
        newProgressData.topicProgress = {
            ...progressData.topicProgress,
            [topicKey]: isVideoCompleted 
                ? Math.max(0, currentTopicProgress - 1)
                : currentTopicProgress + 1
        };
        
      
        newProgressData.subjectProgress = isVideoCompleted
            ? Math.max(0, progressData.subjectProgress - 1)
            : progressData.subjectProgress + 1;
        
      
        setProgressData(newProgressData);
        saveToLocalStorage(newProgressData);
    };


    const resetProgress = () => {
        const resetData: ProgressData = {
            completeVideos: {},
            moduleProgress: {},
            topicProgress: {},
            subjectProgress: 0
        };
        setProgressData(resetData);
        localStorage.removeItem(key);
    };

    return {
        progressData,
        updateVideoProgress,
        resetProgress
    };
};

export default useProgress;

