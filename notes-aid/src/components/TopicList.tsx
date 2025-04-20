import React, { useEffect, useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import VideoAccordion from "./VideoAccordion";
import ProgressBar from "./ProgressBar";
interface Topic {
  title: string;
  description: string;
  videos?: {
    title: string;
    url?: string;
  }[];
  notes?: {
    title: string;
    url: string;
  }[];
}

interface NotesLink {
  title: string;
  url: string;
}

interface TopicListProps {
  topics: Topic[];
  notesLink: NotesLink[];
  moduleNumber: number;
  updateVideoProgress: (
    moduleIndex: string,
    videoIndex: string,
    topicName: string
  ) => void;
  moduleKey: string;
  subjectName: string;
}

const TopicList: React.FC<TopicListProps> = ({
  topics,
  notesLink,
  moduleNumber,
  updateVideoProgress,
  moduleKey,
  subjectName,
}) => {
  const [openTopicIndex, setOpenTopicIndex] = useState<number | null>(null);
  // const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggleTopic = (index: number) => {
    setOpenTopicIndex(openTopicIndex === index ? null : index);
    // setDone((x)=>x+10);
  };

  // console.log("Module Key is: "+moduleKey)

  useEffect(() => {
    setOpenTopicIndex(null);
  }, [topics]);

  if (!topics || topics.length === 0) {
    return (
      <div className="p-4 text-center bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
        <p className="text-slate-500 dark:text-slate-400">
          No topics available
        </p>
      </div>
    );
  }
  // const total = 100;
  // const [done, setDone] = useState(70);

  return (
    <div className="space-y-3">
      {Object.keys(notesLink).length > 0 && (
        <h5 className="text-sm font-medium text-base-content">
          Study Materials for Module {moduleNumber}
        </h5>
      )}
      <div className="flex flex-wrap gap-2">
        {notesLink.map((note: NotesLink, noteIndex: number) => (
          <React.Fragment key={`note-${noteIndex}`}>
            <a
              key={noteIndex}
              href={note.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2 px-4 py-2 bg-neutral text-neutral-content  border-1 border-primary"
            >
              <BookOpen className="w-4 h-4" />
              {note.title}
            </a>
          </React.Fragment>
        ))}
      </div>

      {Object.keys(topics).length > 0 && (
        <h5 className="text-sm font-medium text-base-content">
          Videos
        </h5>
      )}
      {Object.keys(topics).length > 0 &&
        topics.map((topic, index) => {
          const topicKey = `${subjectName}-module${moduleKey}-topic${topic.title.replace(
            /\s/g,
            ""
          )}`;

          let progressData = {
            completeVideos: {} as Record<string, boolean>,
            topicProgress: {} as Record<string, number>,
          };

          if (typeof window !== "undefined") {
            const storedProgress = localStorage.getItem(
              subjectName + "-progress"
            );
            if (storedProgress) {
              try {
                const parsedData = JSON.parse(storedProgress);
                progressData = {
                  completeVideos: parsedData.completeVideos || {},
                  topicProgress: parsedData.topicProgress || {},
                };
              } catch (e) {
                console.error("Error parsing progress data:", e);
              }
            }
          }

          const completedTopics = progressData.topicProgress[topicKey] || 0;
          console.log(completedTopics);

          return (
            <div
              key={index}
              className="bg-base-100 rounded-lg border overflow-hidden"
            >
              <ProgressBar
                total={topic.videos?.length ?? 0}
                completed={completedTopics}
              />
              <div
                onClick={() => toggleTopic(index)}
                className="p-3 cursor-pointer bg-base-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-base-100 rounded-sm">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm text-base-content font-bold">
                        {topic.title}
                      </h4>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                          openTopicIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <p className="text-sm text-base-content mt-1">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  openTopicIndex === index ? "opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-3 pt-0">
                  {topic.videos && topic.videos.length > 0 ? (
                    <div className="mt-3 border-t dark:border-cardsBorder pt-3">
                      <h5 className="text-sm font-medium text-base-content mb-2">
                        Lecture Videos
                      </h5>
                      <VideoAccordion
                        videos={topic.videos}
                        topicKey={topic.title.replace(/\s/g, "")}
                        moduleKey={moduleKey}
                        updateVideoProgress={updateVideoProgress}
                        subjectName={subjectName}
                      />
                    </div>
                  ) : (
                    <div className="mt-3 border-t dark:border-gray-700 pt-3">
                      <h5 className="text-sm font-medium text-base-content mb-2">
                        No videos available, We will update soon, Till then
                        refer the notes
                      </h5>
                    </div>
                  )}

                  {topic.notes && topic.notes.length > 0 && (
                    <div className="mt-3 border-t dark:border-gray-700 pt-3">
                      <h5 className="text-sm font-medium text-black dark:text-base mb-2">
                        Study Materials
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {topic.notes.map((note, noteIndex) => (
                          <a
                            key={noteIndex}
                            href={note.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                          >
                            <BookOpen className="w-4 h-4" />
                            {note.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TopicList;
