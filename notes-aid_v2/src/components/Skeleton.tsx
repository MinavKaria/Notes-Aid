"use client";
import React from "react";

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-gray-900 p-4 rounded-lg border border-gray-800 ${className}`}
    >
      <div className="animate-pulse">
        <div className="h-6 bg-gray-800 rounded w-3/4 mb-3" />
        <div className="h-40 bg-black rounded mb-3" />
        <div className="h-3 bg-gray-800 rounded w-1/2" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-800"
        >
          <div className="w-3/4">
            <div className="h-4 bg-gray-800 rounded mb-2 w-2/3" />
            <div className="h-3 bg-gray-800 rounded w-1/2" />
          </div>
          <div className="h-8 w-16 bg-black rounded" />
        </div>
      ))}
    </div>
  );
}

export default function Skeleton() {
  return <GridSkeleton />;
}
