
import { useState, useEffect } from "react"
import { useDatabase } from "./useDatabase";
import { useSession } from "next-auth/react";

interface ProgressData {
  completeVideos: {
    [key: string]: boolean
  }
  moduleProgress: {
    [key: string]: number
  }
  topicProgress: {
    [key: string]: number
  }
  subjectProgress: number
}

const useProgress = (subjectName: string) => {
  const [progressData, setProgressData] = useState<ProgressData>({
    completeVideos: {},
    moduleProgress: {},
    topicProgress: {},
    subjectProgress: 0,
  })

  const { markProgress, getUserProgress } = useDatabase();
  const { data: session } = useSession();

  useEffect(() => {
    const loadProgress = async () => {
      const localKey = `${subjectName}-progress`
      let loaded = false;
      // If logged in, try to fetch from DB
      if (session?.user?.email) {
        // Fetch userId from backend using email
        const res = await fetch(`/api/user/preferences`);
        const userPrefs = await res.json();
        const userId = userPrefs?.id;
        if (userId) {
          const dbProgress = await getUserProgress(userId);
          if (Array.isArray(dbProgress) && dbProgress.length > 0) {
            const completeVideos: Record<string, boolean> = {};
            dbProgress.forEach((item: any) => {
              if (item.completed) {
                const key = `${item.subject}-module${item.module}-topic${item.topic}-video${item.videoTitle}`;
                completeVideos[key] = true;
              }
            });
            setProgressData((prev) => ({ ...prev, completeVideos }));
            loaded = true;
          }
        }
      }
      if (!loaded) {
        const storedProgress = localStorage.getItem(localKey)
        if (storedProgress) {
          try {
            const parsedData = await JSON.parse(storedProgress)
            setProgressData(parsedData)
          } catch {
            console.error("Failed to parse stored progress data")
          }
        } else {
          setProgressData({
            completeVideos: {},
            moduleProgress: {},
            topicProgress: {},
            subjectProgress: 0,
          })
        }
      }
    }
    loadProgress()
  }, [subjectName, session]) 

  const saveToLocalStorage = (data: ProgressData) => {
    const localKey = `${subjectName}-progress`
    localStorage.setItem(localKey, JSON.stringify(data))
  }

  const updateVideoProgress = async (
    moduleIndex: string,
    videoIndex: string,
    topicName: string
  ) => {
    console.log("updateVideoProgress called", { moduleIndex, videoIndex, topicName, session });
    const videoKey = `${subjectName}-module${moduleIndex}-topic${topicName}-video${videoIndex}`
    const isVideoCompleted = progressData.completeVideos[videoKey] === true

    const newProgressData = { ...progressData }

    newProgressData.completeVideos = {
      ...progressData.completeVideos,
      [videoKey]: !isVideoCompleted,
    }

    const currentModuleProgress = progressData.moduleProgress[moduleIndex] || 0
    newProgressData.moduleProgress = {
      ...progressData.moduleProgress,
      [moduleIndex]: isVideoCompleted
        ? Math.max(0, currentModuleProgress - 1)
        : currentModuleProgress + 1,
    }

    const topicKey = `${subjectName}-module${moduleIndex}-topic${topicName}`
    const currentTopicProgress = progressData.topicProgress[topicKey] || 0
    newProgressData.topicProgress = {
      ...progressData.topicProgress,
      [topicKey]: isVideoCompleted
        ? Math.max(0, currentTopicProgress - 1)
        : currentTopicProgress + 1,
    }

    newProgressData.subjectProgress = isVideoCompleted
      ? Math.max(0, progressData.subjectProgress - 1)
      : progressData.subjectProgress + 1

    setProgressData(newProgressData)
    saveToLocalStorage(newProgressData)

    // Also update the database if logged in
    if (session?.user?.email) {
      // Fetch userId from backend using email
      const res = await fetch(`/api/user/preferences`);
      const userPrefs = await res.json();
      console.log("Fetched userPrefs:", userPrefs);
      const userId = userPrefs?.id;
      console.log("Resolved userId:", userId);
      if (userId) {
        console.log("Calling markProgress with:", {
          userId,
          year: "sy",
          branch: "comps",
          semester: "odd",
          subject: subjectName,
          module: moduleIndex,
          topic: topicName,
          videoTitle: videoIndex,
          completed: !isVideoCompleted
        });
        await markProgress({
          userId,
          year: "sy", // Replace with actual year if available
          branch: "comps", // Replace with actual branch if available
          semester: "odd", // Replace with actual semester if available
          subject: subjectName,
          module: moduleIndex,
          topic: topicName,
          videoTitle: videoIndex, // or actual video title
        }, !isVideoCompleted);
      }
    }
  }

  const resetProgress = () => {
    const resetData: ProgressData = {
      completeVideos: {},
      moduleProgress: {},
      topicProgress: {},
      subjectProgress: 0,
    }
    setProgressData(resetData)
    const localKey = `${subjectName}-progress`
    localStorage.removeItem(localKey)
  }

  return {
    progressData,
    updateVideoProgress,
    resetProgress,
  }
}

export default useProgress

