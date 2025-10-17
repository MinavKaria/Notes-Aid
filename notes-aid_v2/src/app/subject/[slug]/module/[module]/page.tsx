"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VideoAccordion from "@/components/VideoAccordion";
import ProgressBar from "@/components/ProgressBar";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import useProgress from "@/hooks/useProgress";

type NotesLink = { _id?: string; title?: string; url?: string };
type VideoItem = {
  _id?: string;
  url?: string;
  videoId?: string;
  title?: string;
  description?: string;
};
type TopicItem = {
  _id?: string;
  title?: string;
  description?: string;
  videos?: VideoItem[];
};
type ModuleData = { notesLink?: NotesLink[]; topics?: TopicItem[] } | null;
type ModuleStats = {
  key: string;
  notesCount: number;
  videosCount: number;
};

type StatsData = {
  subject?: string;
  modules?: ModuleStats[];
  totalModules?: number;
  totalTopics?: number;
  totalVideos?: number;
  totalNotes?: number;
  progress?: {
    completed?: number;
    total?: number;
    percentage?: number;
  };
} | null;

function formatName(name: string) {
    return name
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const moduleNum = parseInt(params?.module as string);

  const [moduleData, setModuleData] = useState<ModuleData>(null);
  const [statsData, setStatsData] = useState<StatsData>(null);
  const [subjectName, setSubjectName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  // Progress tracking
  const { progressData, updateVideoProgress, resetProgress } =
    useProgress(slug);

  // Fetch module data
  useEffect(() => {
    if (!slug || !moduleNum) return;
    setLoading(true);

    fetch(
      `/api/subject/${encodeURIComponent(slug)}?module=${encodeURIComponent(
        moduleNum
      )}`
    )
      .then((r) => r.json())
      .then((json) => {
        const payload = json?.data ?? json;
        const doc = Array.isArray(payload) ? payload[0] : payload;
        setSubjectName(doc?.name || slug);
        const moduleVal = doc?.modules?.[moduleNum] ?? doc?.modules ?? doc;
        setModuleData(moduleVal || null);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [slug, moduleNum]);

  // Fetch stats data
  useEffect(() => {
    if (!slug) return;
    setStatsLoading(true);

    fetch(`/api/subject/${encodeURIComponent(slug)}/stats`)
      .then((r) => r.json())
      .then((json) => {
        const data = json?.data ?? json;
        // Calculate totals from modules array
        if (data?.modules) {
          const totalModules = data.modules.length;
          const totalNotes = data.modules.reduce(
            (sum: number, mod: ModuleStats) => sum + mod.notesCount,
            0
          );
          const totalVideos = data.modules.reduce(
            (sum: number, mod: ModuleStats) => sum + mod.videosCount,
            0
          );

          setStatsData({
            ...data,
            totalModules,
            totalNotes,
            totalVideos,
            totalTopics: totalVideos, // Assuming each video is a topic for now
          });
        } else {
          setStatsData(data);
        }
        console.log("Stats data:", json);
      })
      .catch((e) => console.error(e))
      .finally(() => setStatsLoading(false));
  }, [slug]);

  const handleModuleNavigation = (direction: "prev" | "next") => {
    const newModule = direction === "prev" ? moduleNum - 1 : moduleNum + 1;
    if (newModule >= 1 && newModule <= (statsData?.totalModules || 6)) {
      router.push(`/subject/${slug}/module/${newModule}`);
    }
  };

  const handleBackToSubject = () => {
    router.push(`/subject/${slug}`);
  };

  return (
    <Layout>
      <div className="min-h-screen mt-10">
        <div className="container mx-auto px-4 py-6">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
            <button
              onClick={handleBackToSubject}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Modules</span>
            </button>

            <div className="hidden items-center gap-4 md:flex">
              <h1 className="text-xl font-semibold text-white">
                  {formatName(subjectName || slug)} — Module {moduleNum}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleModuleNavigation("prev")}
                disabled={moduleNum <= 1}
                className="p-2 rounded-md border border-zinc-700 hover:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous module"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <span className="text-gray-400 text-xs px-3">
                Module {moduleNum} of {statsData?.totalModules || "..."}
              </span>
              <button
                onClick={() => handleModuleNavigation("next")}
                disabled={moduleNum >= (statsData?.totalModules || 6)}
                className="p-2 rounded-md border border-zinc-700 hover:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next module"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-8 bg-zinc-800 rounded-md animate-pulse" />
                  <div className="grid grid-cols-1 gap-4">
                    <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse" />
                    <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse" />
                  </div>
                </div>
              ) : !moduleData ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-base mb-4">
                    Module not found
                  </div>
                  <p className="text-gray-500 text-sm">
                    This module doesn&apos;t exist or is not available yet.
                  </p>
                </div>
              ) : (
                <>
                  {/* Notes Section */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <h2 className="text-lg font-semibold text-gray-100">
                        Notes & Resources
                      </h2>
                    </div>

                    {moduleData?.notesLink &&
                    moduleData.notesLink.length > 0 ? (
                      <div className="space-y-3">
                        {moduleData.notesLink.map((note: NotesLink, index) => (
                          <div
                            key={note._id || note.url || index}
                            className="border border-zinc-700 rounded-lg p-4 hover:border-zinc-600 transition-colors group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-100">
                                  {note.title || "Untitled Note"}
                                </h3>
                              </div>
                              {note.url && (
                                <a
                                  href={note.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-4 py-2 bg-white hover:bg-gray-200 text-black text-sm rounded-md transition-colors"
                                >
                                  Open
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        <p>No notes available for this module.</p>
                      </div>
                    )}
                  </div>

                  {/* Topics & Videos Section */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <h2 className="text-lg font-semibold text-gray-100">
                        Topics & Videos
                      </h2>
                    </div>

                    {moduleData?.topics && moduleData.topics.length > 0 ? (
                      <div className="space-y-4">
                        {moduleData.topics.map((topic: TopicItem, index) => (
                          <div
                            key={topic._id || topic.title || index}
                            className="border border-zinc-700 rounded-lg p-5 hover:border-zinc-600 transition-colors"
                          >
                            <div className="mb-4">
                              <h3 className="text-base font-medium text-gray-100 mb-2">
                                {topic.title || `Topic ${index + 1}`}
                              </h3>
                              {topic.description && (
                                <p className="text-gray-400 text-sm leading-relaxed">
                                  {topic.description}
                                </p>
                              )}
                            </div>

                            <VideoAccordion
                              items={(topic.videos || []).map(
                                (video: VideoItem) => ({
                                  id:
                                    video.url ||
                                    video.videoId ||
                                    video._id ||
                                    "",
                                  title: video.title || "Untitled Video",
                                  description: video.description,
                                })
                              )}
                              moduleIndex={moduleNum.toString()}
                              topicName={topic.title || `Topic ${index + 1}`}
                              subjectName={slug}
                              progressData={progressData.completeVideos}
                              onVideoProgress={updateVideoProgress}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        <p>No topics available for this module.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Stats Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-base font-semibold text-gray-100">
                      Course Stats
                    </h3>
                  </div>

                  {statsLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-12 bg-zinc-800 rounded-md animate-pulse"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="border border-zinc-700 rounded-md p-3">
                        <div className="text-xl font-semibold text-gray-100">
                          {statsData?.totalModules || 0}
                        </div>
                        <div className="text-xs text-gray-400">
                          Total Modules
                        </div>
                      </div>

                      <div className="border border-zinc-700 rounded-md p-3">
                        <div className="text-xl font-semibold text-gray-100">
                          {statsData?.totalTopics || 0}
                        </div>
                        <div className="text-xs text-gray-400">
                          Total Topics
                        </div>
                      </div>

                      <div className="border border-zinc-700 rounded-md p-3">
                        <div className="text-xl font-semibold text-gray-100">
                          {statsData?.totalVideos || 0}
                        </div>
                        <div className="text-xs text-gray-400">
                          Total Videos
                        </div>
                      </div>

                      <div className="border border-zinc-700 rounded-md p-3">
                        <div className="text-xl font-semibold text-gray-100">
                          {statsData?.totalNotes || 0}
                        </div>
                        <div className="text-xs text-gray-400">Total Notes</div>
                      </div>

                      {/* Local Progress */}
                      <div className="border border-zinc-700 rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-gray-400">
                            Your Progress
                          </div>
                          <div className="text-xs font-medium text-gray-100">
                            {progressData.subjectProgress || 0} videos
                          </div>
                        </div>
                        <ProgressBar
                          percentage={
                            statsData?.totalVideos
                              ? Math.round(
                                  ((progressData.subjectProgress || 0) /
                                    statsData.totalVideos) *
                                    100
                                )
                              : 0
                          }
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {progressData.subjectProgress || 0} of{" "}
                          {statsData?.totalVideos || 0} videos completed
                        </div>
                      </div>

                      {/* Current Module Progress */}
                      <div className="border border-zinc-700 rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-gray-400">
                            Module {moduleNum} Progress
                          </div>
                          <div className="text-xs font-medium text-gray-100">
                            {progressData.moduleProgress[
                              moduleNum.toString()
                            ] || 0}{" "}
                            videos
                          </div>
                        </div>
                        <ProgressBar
                          percentage={
                            statsData?.modules?.find(
                              (m) => m.key === moduleNum.toString()
                            )?.videosCount
                              ? Math.round(
                                  ((progressData.moduleProgress[
                                    moduleNum.toString()
                                  ] || 0) /
                                    (statsData.modules.find(
                                      (m) => m.key === moduleNum.toString()
                                    )?.videosCount || 1)) *
                                    100
                                )
                              : 0
                          }
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {progressData.moduleProgress[moduleNum.toString()] ||
                            0}{" "}
                          of{" "}
                          {statsData?.modules?.find(
                            (m) => m.key === moduleNum.toString()
                          )?.videosCount || 0}{" "}
                          completed
                        </div>
                      </div>

                      {progressData.subjectProgress > 0 && (
                        <div className="border border-zinc-700 rounded-md p-3">
                          <button
                            onClick={resetProgress}
                            className="w-full px-4 py-2 bg-white hover:bg-gray-200 text-black text-xs rounded-md transition-colors"
                          >
                            Reset Progress
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Module Navigation */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-base font-semibold text-gray-100">
                      Quick Navigation
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {Array.from(
                      { length: statsData?.totalModules || 6 },
                      (_, i) => i + 1
                    ).map((num) => (
                      <button
                        key={num}
                        onClick={() =>
                          router.push(`/subject/${slug}/module/${num}`)
                        }
                        className={`
                        p-2 rounded-md text-xs font-medium transition-colors
                        ${
                          num === moduleNum
                            ? "bg-white text-black"
                            : "border border-zinc-700 text-gray-300 hover:border-zinc-600 hover:text-white"
                        }
                      `}
                      >
                        M{num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
