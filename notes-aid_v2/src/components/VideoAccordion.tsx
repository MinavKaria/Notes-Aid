"use client";
import React, { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import Video from "./Video";

type VideoAccordionItem = {
  id: string; // video id or url
  title?: string;
  description?: string;
};

type VideoAccordionProps = {
  items: VideoAccordionItem[];
  className?: string;
  moduleIndex?: string;
  topicName?: string;
  subjectName?: string;
  progressData?: { [key: string]: boolean };
  onVideoProgress?: (
    moduleIndex: string,
    videoIndex: string,
    topicName: string
  ) => void;
};

export default function VideoAccordion({
  items,
  className,
  moduleIndex,
  topicName,
  subjectName,
  progressData,
  onVideoProgress,
}: VideoAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={"space-y-3 " + (className || "")}>
      {items.map((it, idx) => {
        const isOpen = openIndex === idx;
        const isCompleted =
          progressData && moduleIndex && topicName && subjectName
            ? progressData[
                `${subjectName}-module${moduleIndex}-topic${topicName}-video${idx}`
              ] || false
            : false;

        const handleToggleComplete = () => {
          if (moduleIndex && topicName && onVideoProgress) {
            onVideoProgress(moduleIndex, idx.toString(), topicName);
          }
        };

        return (
          <div
            key={it.id + idx}
            className={`bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-shadow shadow-sm hover:shadow-md`}
          >
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {/* Progress Checkbox */}
                {moduleIndex && topicName && onVideoProgress && (
                  <button
                    onClick={handleToggleComplete}
                    className={`flex-shrink-0 p-1 rounded-full transition-all duration-200 ${
                      isCompleted
                        ? "text-green-400 hover:text-green-300"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                    title={
                      isCompleted ? "Mark as incomplete" : "Mark as complete"
                    }
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex-1 text-left"
                >
                  <div className="font-semibold">
                    {it.title || `Video ${idx + 1}`}
                  </div>
                  {it.description && (
                    <div className="text-sm text-gray-400 mt-1">
                      {it.description}
                    </div>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="ml-4 flex items-center hover:bg-gray-700/50 rounded-lg px-2 py-1 transition-colors"
              >
                <div className="text-xs text-gray-400 mr-3">
                  {isOpen ? "Hide" : "Watch"}
                </div>
                <svg
                  className={`w-5 h-5 text-gray-300 transform transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`transition-max-h duration-300 ease-in-out overflow-hidden px-4 pb-4 ${
                isOpen ? "max-h-[800px]" : "max-h-0"
              }`}
            >
              {isOpen ? (
                <div className="mt-2">
                  <Video id={it.id} title={it.title} />
                </div>
              ) : (
                <div className="mt-2">
                  <div className="animate-pulse">
                    <div className="bg-black h-40 rounded" />
                    <div className="h-3 mt-3 bg-gray-800 rounded w-3/4" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
