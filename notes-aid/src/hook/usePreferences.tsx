import { useCallback } from "react";

export function usePreferences() {
  // Get user preferences by userId
  const getUserPreferences = useCallback(async (userId: string) => {
    const res = await fetch(`/api/user/preferences?userId=${userId}`);
    return res.json();
  }, []);

  // Set user preferences
  const setUserPreferences = useCallback(async (userId: string, preferences: any) => {
    const res = await fetch("/api/user/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, preferences }),
    });
    return res.json();
  }, []);

  return { getUserPreferences, setUserPreferences };
} 