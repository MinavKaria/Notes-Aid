import React from "react";

interface ProgressBarProps {
  total: number;
  completed: number;
}

export default function ProgressBar({ total, completed }: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full bg-base rounded-full h-1 overflow-hidden">
      <div
        className="h-full bg-icons transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
