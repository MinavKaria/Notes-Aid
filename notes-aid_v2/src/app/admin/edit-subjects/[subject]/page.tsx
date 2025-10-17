"use client";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

interface Video {
  title: string;
  url: string;
  completed: boolean;
  _id?: { $oid: string };
}

interface Topic {
  title: string;
  description: string;
  videos: Video[];
  notes: unknown[];
  _id?: { $oid: string };
}

interface NotesLink {
  title: string;
  url: string;
  _id?: { $oid: string };
}

interface Module {
  notesLink: NotesLink[];
  topics: Topic[];
  _id?: { $oid: string };
}

interface Subject {
  _id?: { $oid: string };
  name: string;
  color: string;
  modules: Record<string, Module>;
  __v?: number;
}

export default function EditSubjectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const subjectSlug = params?.subject as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [originalSubject, setOriginalSubject] = useState<Subject | null>(null);
  const [error, setError] = useState<string>("");
  const [hasLocalChanges, setHasLocalChanges] = useState(false);

  // Generate localStorage key for this subject
  const getLocalStorageKey = () => `edit-subject-${subjectSlug}`;

  // Load data from localStorage
  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(getLocalStorageKey());
      if (stored) {
        const parsedData = JSON.parse(stored);
        return parsedData;
      }
    } catch (err) {
      console.error("Error loading from localStorage:", err);
    }
    return null;
  };

  // Save to localStorage
  const saveToLocalStorage = (data: Subject) => {
    try {
      localStorage.setItem(getLocalStorageKey(), JSON.stringify(data));
      setHasLocalChanges(true);
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  };

  // Clear localStorage
  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(getLocalStorageKey());
      setHasLocalChanges(false);
    } catch (err) {
      console.error("Error clearing localStorage:", err);
    }
  };

  const loadSubjectData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/subject/${encodeURIComponent(subjectSlug)}`
      );
      const data = await response.json();

      if (response.ok) {
        // Extract subject data from API response
        const subjectData = Array.isArray(data.data) ? data.data[0] : data.data;
        
        // Check if there are local changes
        const localData = loadFromLocalStorage();
        if (localData) {
          // Use local data if it exists
          setSubject(localData);
          setOriginalSubject(subjectData);
          setHasLocalChanges(true);
        } else {
          setSubject(subjectData);
          setOriginalSubject(subjectData);
          setHasLocalChanges(false);
        }
      } else {
        setError(data.error || "Failed to load subject data");
      }
    } catch (err) {
      console.error("Error loading subject:", err);
      setError("Failed to load subject data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.isAdmin) {
      router.push("/auth/signin");
    } else if (subjectSlug) {
      loadSubjectData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status, router, subjectSlug]);

  const saveSubjectData = async () => {
    if (!subject) return;

    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        `/api/admin/subjects/${encodeURIComponent(subjectSlug)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subject),
        }
      );

      if (response.ok) {
        alert("Subject updated successfully!");
        // Clear localStorage after successful save
        clearLocalStorage();
        setOriginalSubject(subject);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save subject data");
      }
    } catch (err) {
      console.error("Error saving subject:", err);
      setError("Failed to save subject data");
    } finally {
      setSaving(false);
    }
  };

  // Discard local changes and reload from server
  const discardLocalChanges = () => {
    if (confirm("Are you sure you want to discard all local changes?")) {
      clearLocalStorage();
      if (originalSubject) {
        setSubject(originalSubject);
      }
    }
  };

  // Wrapper to update subject and save to localStorage
  const updateSubject = (newSubject: Subject) => {
    setSubject(newSubject);
    saveToLocalStorage(newSubject);
  };

  const addModule = () => {
    if (!subject) return;

    const moduleNumbers = Object.keys(subject.modules)
      .map(Number)
      .filter((n) => !isNaN(n));
    const nextModuleNumber = Math.max(...moduleNumbers, 0) + 1;

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [nextModuleNumber]: {
          notesLink: [],
          topics: [],
        },
      },
    });
  };

  const addTopic = (moduleKey: string) => {
    if (!subject) return;

    const newTopic: Topic = {
      title: "",
      description: "",
      videos: [],
      notes: [],
    };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subject.modules[moduleKey],
          topics: [...subject.modules[moduleKey].topics, newTopic],
        },
      },
    });
  };

  const addVideo = (moduleKey: string, topicIndex: number) => {
    if (!subject) return;

    const newVideo: Video = {
      title: "",
      url: "",
      completed: false,
    };

    const subjectModule = subject.modules[moduleKey];
    const topics = [...subjectModule.topics];
    topics[topicIndex] = {
      ...topics[topicIndex],
      videos: [...topics[topicIndex].videos, newVideo],
    };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subjectModule,
          topics,
        },
      },
    });
  };

  const updateSubjectField = (field: keyof Subject, value: string) => {
    if (!subject) return;
    updateSubject({ ...subject, [field]: value });
  };

  const updateModuleTopic = (
    moduleKey: string,
    topicIndex: number,
    field: keyof Topic,
    value: string
  ) => {
    if (!subject) return;

    const subjectModule = subject.modules[moduleKey];
    const topics = [...subjectModule.topics];
    topics[topicIndex] = { ...topics[topicIndex], [field]: value };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: { ...subjectModule, topics },
      },
    });
  };

  const addNoteLink = (moduleKey: string) => {
    if (!subject) return;

    const newNote: NotesLink = {
      title: "",
      url: "",
    };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subject.modules[moduleKey],
          notesLink: [
            ...(subject.modules[moduleKey]?.notesLink || []),
            newNote,
          ],
        },
      },
    });
  };

  const updateNoteLink = (
    moduleKey: string,
    noteIndex: number,
    field: keyof NotesLink,
    value: string
  ) => {
    if (!subject) return;

    const subjectModule = subject.modules[moduleKey];
    const notes = [...(subjectModule.notesLink || [])];
    notes[noteIndex] = { ...notes[noteIndex], [field]: value };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: { ...subjectModule, notesLink: notes },
      },
    });
  };

  const removeNoteLink = (moduleKey: string, noteIndex: number) => {
    if (!subject) return;

    const subjectModule = subject.modules[moduleKey];
    const notes = [...(subjectModule.notesLink || [])];
    notes.splice(noteIndex, 1);

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: { ...subjectModule, notesLink: notes },
      },
    });
  };

  const updateVideo = (
    moduleKey: string,
    topicIndex: number,
    videoIndex: number,
    field: keyof Video,
    value: string | boolean
  ) => {
    if (!subject) return;

    const subjectModule = subject.modules[moduleKey];
    const topics = [...subjectModule.topics];
    const videos = [...topics[topicIndex].videos];
    videos[videoIndex] = { ...videos[videoIndex], [field]: value };
    topics[topicIndex] = { ...topics[topicIndex], videos };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: { ...subjectModule, topics },
      },
    });
  };

  // Return YouTube video id if the url is a YouTube link, otherwise null


  if (status === "loading" || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-gray-400">Loading subject data...</div>
        </div>
      </Layout>
    );
  }

  if (!session?.user?.isAdmin) {
    return null;
  }

  if (error && !subject) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="text-red-400 text-lg">{error}</div>
            <button
              onClick={loadSubjectData}
              className="mt-4 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!subject) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-gray-400">No subject data found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12 bg-black">
        <div className="max-w-6xl mx-auto">
          {/* Local Changes Indicator */}
          {hasLocalChanges && (
            <div className="mb-6 p-4 bg-amber-900/20 border border-amber-700 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-amber-400 font-medium">Unsaved Local Changes</div>
                  <div className="text-gray-400 text-sm">Your changes are saved locally but not yet saved to the server</div>
                </div>
              </div>
              <button
                onClick={discardLocalChanges}
                className="px-4 py-2 text-sm text-amber-400 hover:text-amber-300 border border-amber-700 rounded-md hover:border-amber-600 transition-colors"
              >
                Discard Changes
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
            <div>
              <h1 className="text-3xl font-semibold text-white">
                Edit Subject: {subject.name}
              </h1>
              <p className="text-gray-400 text-sm">
                Modify subject content and structure
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/admin/edit-subjects")}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-zinc-700 rounded-md hover:border-zinc-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={saveSubjectData}
                disabled={saving}
                className={`px-6 py-2 rounded-md font-medium text-sm ${
                  saving
                    ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
                    : hasLocalChanges
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {saving ? "Saving..." : hasLocalChanges ? "Save to Server" : "Save Changes"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
              <div className="text-red-400">{error}</div>
            </div>
          )}

          <div className="space-y-8">
            {/* Basic Subject Info */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="subject-name"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject Name
                  </label>
                  <input
                    id="subject-name"
                    aria-label="Subject Name"
                    type="text"
                    value={subject.name}
                    onChange={(e) => updateSubjectField("name", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Advanced Databases"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject-color"
                    className="block text-sm font-medium mb-2"
                  >
                    Color Theme
                  </label>
                  <select
                    id="subject-color"
                    aria-label="Color Theme"
                    value={subject.color}
                    onChange={(e) =>
                      updateSubjectField("color", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="purple">Purple</option>
                    <option value="yellow">Yellow</option>
                    <option value="indigo">Indigo</option>
                    <option value="pink">Pink</option>
                    <option value="gray">Gray</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modules */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Modules</h2>
                <button
                  onClick={addModule}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Module
                </button>
              </div>

              <div className="space-y-6">
                {Object.entries(subject.modules).map(([moduleKey, module]) => (
                  <div
                    key={moduleKey}
                    className="border border-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Module {moduleKey}
                    </h3>

                    {/* Notes for this module */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Notes</h4>
                        <button
                          onClick={() => addNoteLink(moduleKey)}
                          className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                        >
                          Add Note
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(module.notesLink || []).map((note, noteIndex) => (
                          <div
                            key={noteIndex}
                            className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 bg-gray-700 rounded items-center"
                          >
                            <label
                              className="sr-only"
                              htmlFor={`note-title-${moduleKey}-${noteIndex}`}
                            >
                              Note title
                            </label>
                            <input
                              id={`note-title-${moduleKey}-${noteIndex}`}
                              aria-label={`Note title for module ${moduleKey}`}
                              type="text"
                              value={note.title}
                              onChange={(e) =>
                                updateNoteLink(
                                  moduleKey,
                                  noteIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              className="px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                              placeholder="Note title"
                            />

                            <label
                              className="sr-only"
                              htmlFor={`note-url-${moduleKey}-${noteIndex}`}
                            >
                              Note URL
                            </label>
                            <input
                              id={`note-url-${moduleKey}-${noteIndex}`}
                              aria-label={`Note URL for module ${moduleKey}`}
                              type="url"
                              value={note.url}
                              onChange={(e) =>
                                updateNoteLink(
                                  moduleKey,
                                  noteIndex,
                                  "url",
                                  e.target.value
                                )
                              }
                              className="px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                              placeholder="Note URL (optional)"
                            />

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  removeNoteLink(moduleKey, noteIndex)
                                }
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                aria-label={`Remove note ${
                                  noteIndex + 1
                                } from module ${moduleKey}`}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Topics for this module */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Topics</h4>
                        <button
                          onClick={() => addTopic(moduleKey)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Add Topic
                        </button>
                      </div>

                      <div className="space-y-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="border border-gray-600 p-3 rounded"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-xs font-medium mb-1">
                                  Topic Title
                                </label>
                                <input
                                  type="text"
                                  value={topic.title}
                                  onChange={(e) =>
                                    updateModuleTopic(
                                      moduleKey,
                                      topicIndex,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 text-sm bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                                  placeholder="Enter topic title"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  value={topic.description}
                                  onChange={(e) =>
                                    updateModuleTopic(
                                      moduleKey,
                                      topicIndex,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 text-sm bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                                  placeholder="Enter topic description"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-medium">
                                  Videos
                                </label>
                                <button
                                  onClick={() =>
                                    addVideo(moduleKey, topicIndex)
                                  }
                                  className="bg-purple-600 text-white px-2 py-1 rounded text-xs hover:bg-purple-700"
                                >
                                  Add Video
                                </button>
                              </div>

                              <div className="space-y-2">
                                {topic.videos.map((video, videoIndex) => (
                                  <div
                                    key={videoIndex}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 bg-gray-700 rounded"
                                  >
                                    <input
                                      type="text"
                                      value={video.title}
                                      onChange={(e) =>
                                        updateVideo(
                                          moduleKey,
                                          topicIndex,
                                          videoIndex,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      className="px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                                      placeholder="Video title"
                                    />
                                    <input
                                      type="url"
                                      value={video.url}
                                      onChange={(e) =>
                                        updateVideo(
                                          moduleKey,
                                          topicIndex,
                                          videoIndex,
                                          "url",
                                          e.target.value
                                        )
                                      }
                                      className="px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                                      placeholder="Video URL"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
