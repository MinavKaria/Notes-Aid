import React from "react";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export default function ProgressBar({
  percentage,
  className = "",
}: ProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  // Get the appropriate width class based on percentage
  const getWidthClass = (percent: number) => {
    if (percent >= 100) return "w-full";
    if (percent >= 95) return "w-11/12";
    if (percent >= 90) return "w-10/12";
    if (percent >= 85) return "w-5/6";
    if (percent >= 80) return "w-4/5";
    if (percent >= 75) return "w-3/4";
    if (percent >= 70) return "w-7/12";
    if (percent >= 65) return "w-8/12";
    if (percent >= 60) return "w-3/5";
    if (percent >= 55) return "w-11/20";
    if (percent >= 50) return "w-1/2";
    if (percent >= 45) return "w-9/20";
    if (percent >= 40) return "w-2/5";
    if (percent >= 35) return "w-7/20";
    if (percent >= 30) return "w-3/10";
    if (percent >= 25) return "w-1/4";
    if (percent >= 20) return "w-1/5";
    if (percent >= 15) return "w-3/20";
    if (percent >= 10) return "w-1/10";
    if (percent >= 5) return "w-1/20";
    return "w-0";
  };

  return (
    <div
      className={`w-full bg-gray-700 rounded-full h-2 overflow-hidden ${className}`}
    >
      <div
        className={`bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ${getWidthClass(
          clampedPercentage
        )}`}
      />
    </div>
  );
}
