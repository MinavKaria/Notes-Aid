import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Video from "./Video";

const VideoAccordion: React.FC<{
  videos: { title: string; url?: string }[];
  topicKey: string;
  moduleKey: string;
  updateVideoProgress: (moduleIndex: string, videoIndex: string, topicName: string) => void;
  subjectName: string;
  bookmarkId?: string | null;
}> = ({ videos, topicKey, updateVideoProgress, moduleKey, subjectName, bookmarkId }) => {
  const { year, branch, semester } = useParams<{ year: string; branch: string; semester: string }>();

  const [openVideoIndex, setOpenVideoIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  const toggleVideo = (index: number) => {
    if (openVideoIndex !== null && videoRefs.current[openVideoIndex]) {
      videoRefs.current[openVideoIndex]?.contentWindow?.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    }
    setOpenVideoIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [checked, setChecked] = useState<boolean[]>(videos.map(() => false));

  useEffect(() => {
    setChecked(videos.map(() => false));
  }, [videos]);



  return (
    <div className="space-y-2 pl-4">
      {videos.map((video, index) => (
        <div
          key={index}
          className="rounded-lg justify-center overflow-hidden bg-base-300 hover:bg-base-200 p-2 w-full flex flex-col"
        >
          <Video
            checked={checked[index]}
            setChecked={(value) => {
              const newChecked = [...checked];
              newChecked[index] =
                typeof value === "function" ? value(newChecked[index]) : value;
              setChecked(newChecked);
            }}
            toggleVideo={toggleVideo}
            openVideoIndex={openVideoIndex}
            index={index}
            video={video}
            videoRefs={videoRefs}
            videoKey={video.title.replace(/\s/g, '')}
            updateVideoProgress={updateVideoProgress}
            moduleKey={moduleKey}
            topicKey={topicKey}
            subjectName={subjectName}
            year={year}
            branch={branch}
            semester={semester}
            bookmarkId={bookmarkId}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoAccordion;
