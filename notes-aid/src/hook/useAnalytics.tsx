import { useCallback } from "react";

export function useAnalytics() {
  // Log a user analytics event
  const logAnalytics = useCallback(async (analyticsData: any) => {
    const res = await fetch("/api/user/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(analyticsData),
    });
    return res.json();
  }, []);

  // Get user analytics by userId
  const getUserAnalytics = useCallback(async (userId: string) => {
    const res = await fetch(`/api/user/analytics?userId=${userId}`);
    return res.json();
  }, []);

  return { logAnalytics, getUserAnalytics };
} 