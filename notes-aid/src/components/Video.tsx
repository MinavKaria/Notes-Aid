"use client";
import React from "react";
import { RefObject, Dispatch, SetStateAction } from "react";
import { CheckSquare, Square, ChevronDown } from "lucide-react";
import { BookmarkButton } from "./BookmarkButton";

interface VideoProps {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  toggleVideo: (index: number) => void;
  openVideoIndex: number | null;
  index: number;
  video: { title: string; url?: string };
  videoRefs: RefObject<(HTMLIFrameElement | null)[]>;
  videoKey: string;
  updateVideoProgress: (
    moduleIndex: string,
    videoIndex: string,
    topicName: string
  ) => void;
  moduleKey: string;
  topicKey: string;
  subjectName: string;
}

function Video({
  toggleVideo,
  openVideoIndex,
  index,
  video,
  videoRefs,
  videoKey,
  updateVideoProgress,
  moduleKey,
  topicKey,
  subjectName,
}: VideoProps) {
  // console.log(videoKey)

  const storedProgress =
    typeof window !== "undefined"
      ? localStorage.getItem(subjectName + "-progress")
      : null;
  const progressData = storedProgress
    ? JSON.parse(storedProgress)
    : { completeVideos: {} };

  const key = `${subjectName}-module${moduleKey}-topic${topicKey}-video${videoKey}`;
  const isCompleted = progressData.completeVideos[key] === true;

  return (
    <>
      <div className="flex items-center gap-2 hover:bg-base-200 ">
        <button
          onClick={() => {
            updateVideoProgress(moduleKey, videoKey, topicKey);
            // setChecked((prev) => !prev);
          }}
          className="w-6 h-6"
        >
          {isCompleted ? (
            <CheckSquare className="text-primary" />
          ) : (
            <Square className="text-base-content" />
          )}
        </button>

        <div
          onClick={() => toggleVideo(index)}
          className="p-2 cursor-pointer hover:bg-base-200  flex justify-between items-center flex-1 gap-2"
        >
          <span className="text-sm font-medium text-base-content">
            {video.title}
          </span>
          <div className="flex gap-3 justify-center items-center">
           <BookmarkButton
           item={{
           id: `subject-${subjectName}-module${moduleKey}-topic${topicKey}-video${videoKey}`,
           title: video.title,
           subject: subjectName,
           url: video.url || "",
           module: Number(moduleKey),
           topics: topicKey,
           type: 'video',
           }} 
        />
          <ChevronDown
            className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
              openVideoIndex === index ? "rotate-180" : ""
            }`}
          />
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out  ${
          openVideoIndex === index
            ? "opacity-100 max-h-[900px]"
            : "max-h-0 opacity-0"
        }`}
      >
        {openVideoIndex === index && video.url && video.url!=="" && (
          <div className="p-2">
            <div className="aspect-video">
              <iframe
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                width="100%"
                height="100%"
                src={`${video.url}?enablejsapi=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        )}
        {openVideoIndex === index && !video.url && (
          <div className="p-2 text-sm text-base-content">
            We could&apos;nt find a video for this topic. Please check the notes.
          </div>
        )}
            
      </div>
    </>
  );
}

export default Video;
