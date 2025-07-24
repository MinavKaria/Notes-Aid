import { useCallback } from "react";

export function useDatabase() {
  // Mark progress for a video or note
  const markProgress = useCallback(async (progressData: any, completed: boolean) => {
    const res = await fetch("/api/user/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...progressData, completed, completedAt: completed ? new Date() : null }),
    });
    return res.json();
  }, []);

  // Get user progress by userId
  const getUserProgress = useCallback(async (userId: string) => {
    const res = await fetch(`/api/user/progress?userId=${userId}`);
    return res.json();
  }, []);

  return { markProgress, getUserProgress };
} 