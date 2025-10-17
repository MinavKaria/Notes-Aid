"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
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

export default function ContributorEditPage() {
  const params = useParams();
  const linkId = params?.linkId as string;

  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [editorName, setEditorName] = useState("");
  const [subjectCollection, setSubjectCollection] = useState("");
  const [subject, setSubject] = useState<Subject | null>(null);
  const [originalSubject, setOriginalSubject] = useState<Subject | null>(null);
  const [error, setError] = useState("");
  const [hasLocalChanges, setHasLocalChanges] = useState(false);

  // Generate localStorage key for this edit link
  const getLocalStorageKey = () => `edit-contributor-${linkId}`;

  // Check if there are actual differences between original and current subject
  const hasActualChanges = () => {
    if (!subject || !originalSubject) return false;

    try {
      // Deep comparison by converting to JSON strings
      const currentData = JSON.stringify(subject);
      const originalData = JSON.stringify(originalSubject);
      return currentData !== originalData;
    } catch (err) {
      console.error("Error comparing data:", err);
      return false;
    }
  };

  // Load data from localStorage
  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(getLocalStorageKey());
      if (stored) {
        return JSON.parse(stored);
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

  // Wrapper to update subject and save to localStorage
  const updateSubject = (newSubject: Subject) => {
    setSubject(newSubject);
    saveToLocalStorage(newSubject);
  };

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedPassword = sessionStorage.getItem(`edit-password-${linkId}`);

      if (storedPassword) {
        // Try to authenticate with stored password
        try {
          const response = await fetch(
            `/api/edit/${linkId}?password=${encodeURIComponent(storedPassword)}`
          );
          const data = await response.json();

          if (response.ok) {
            setAuthenticated(true);
            setEditorName(data.editorName);
            setSubjectCollection(data.subjectCollection);

            // Check if there are local changes
            const localData = loadFromLocalStorage();
            if (localData) {
              // Use local data if it exists
              setSubject(localData);
              setOriginalSubject(data.subjectData);
              setHasLocalChanges(true);
            } else {
              setSubject(data.subjectData);
              setOriginalSubject(data.subjectData);
              setHasLocalChanges(false);
            }
          } else {
            // Password expired or invalid, clear it
            sessionStorage.removeItem(`edit-password-${linkId}`);
          }
        } catch (err) {
          console.error("Auto-authentication error:", err);
        }
      }
      setLoading(false);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkId]);

  const handleAuthenticate = async () => {
    if (!password) {
      setAuthError("Please enter password");
      return;
    }

    setLoading(true);
    setAuthError("");

    try {
      const response = await fetch(
        `/api/edit/${linkId}?password=${encodeURIComponent(password)}`
      );
      const data = await response.json();

      if (response.ok) {
        setAuthenticated(true);
        setEditorName(data.editorName);
        setSubjectCollection(data.subjectCollection);

        // Check if there are local changes
        const localData = loadFromLocalStorage();
        if (localData) {
          // Use local data if it exists
          setSubject(localData);
          setOriginalSubject(data.subjectData);
          setHasLocalChanges(true);
        } else {
          setSubject(data.subjectData);
          setOriginalSubject(data.subjectData);
          setHasLocalChanges(false);
        }

        // Store password in session for subsequent requests
        sessionStorage.setItem(`edit-password-${linkId}`, password);
      } else {
        setAuthError(data.error || "Authentication failed");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setAuthError("Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitChanges = async () => {
    if (!subject) return;

    // Check if there are actual changes
    if (!hasActualChanges()) {
      alert("No changes detected. Please make changes before submitting.");
      return;
    }

    if (!confirm("Submit these changes for admin review?")) return;

    setSubmitting(true);
    setError("");

    try {
      const storedPassword = sessionStorage.getItem(`edit-password-${linkId}`);
      const response = await fetch(`/api/edit/${linkId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: storedPassword,
          changeData: subject,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          "Changes submitted successfully!\n\nYour changes are now pending admin review. You'll be notified once they're approved."
        );
        // Clear localStorage after successful submit
        clearLocalStorage();
        setOriginalSubject(subject);
      } else {
        setError(data.error || "Failed to submit changes");
      }
    } catch (err) {
      console.error("Error submitting changes:", err);
      setError("Failed to submit changes");
    } finally {
      setSubmitting(false);
    }
  };


  const discardLocalChanges = () => {
    if (confirm("Are you sure you want to discard all local changes?")) {
      clearLocalStorage();
      if (originalSubject) {
        setSubject(originalSubject);
      }
    }
  };

  const addModule = () => {
    if (!subject) return;
    const moduleKeys = Object.keys(subject.modules);
    const nextModuleNum = moduleKeys.length + 1;
    const newModule: Module = {
      notesLink: [],
      topics: [],
    };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [nextModuleNum.toString()]: newModule,
      },
    });
  };

  const addNotesLink = (moduleKey: string) => {
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
          notesLink: [...subject.modules[moduleKey].notesLink, newNote],
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

    const updatedTopics = [...subject.modules[moduleKey].topics];
    updatedTopics[topicIndex] = {
      ...updatedTopics[topicIndex],
      videos: [...updatedTopics[topicIndex].videos, newVideo],
    };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subject.modules[moduleKey],
          topics: updatedTopics,
        },
      },
    });
  };

  const updateNotesLink = (
    moduleKey: string,
    noteIndex: number,
    field: keyof NotesLink,
    value: string
  ) => {
    if (!subject) return;
    const updatedNotes = [...subject.modules[moduleKey].notesLink];
    updatedNotes[noteIndex] = { ...updatedNotes[noteIndex], [field]: value };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subject.modules[moduleKey],
          notesLink: updatedNotes,
        },
      },
    });
  };

  const updateTopic = (
    moduleKey: string,
    topicIndex: number,
    field: keyof Topic,
    value: string
  ) => {
    if (!subject) return;
    const updatedTopics = [...subject.modules[moduleKey].topics];
    updatedTopics[topicIndex] = { ...updatedTopics[topicIndex], [field]: value };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subject.modules[moduleKey],
          topics: updatedTopics,
        },
      },
    });
  };

  const updateVideo = (
    moduleKey: string,
    topicIndex: number,
    videoIndex: number,
    field: keyof Video,
    value: string
  ) => {
    if (!subject) return;
    const updatedTopics = [...subject.modules[moduleKey].topics];
    const updatedVideos = [...updatedTopics[topicIndex].videos];
    updatedVideos[videoIndex] = { ...updatedVideos[videoIndex], [field]: value };
    updatedTopics[topicIndex] = {
      ...updatedTopics[topicIndex],
      videos: updatedVideos,
    };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subject.modules[moduleKey],
          topics: updatedTopics,
        },
      },
    });
  };

  const deleteNotesLink = (moduleKey: string, noteIndex: number) => {
    if (!subject) return;
    const updatedNotes = subject.modules[moduleKey].notesLink.filter(
      (_, i) => i !== noteIndex
    );

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subject.modules[moduleKey],
          notesLink: updatedNotes,
        },
      },
    });
  };

  const deleteTopic = (moduleKey: string, topicIndex: number) => {
    if (!subject) return;
    const updatedTopics = subject.modules[moduleKey].topics.filter(
      (_, i) => i !== topicIndex
    );

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subject.modules[moduleKey],
          topics: updatedTopics,
        },
      },
    });
  };

  const deleteVideo = (moduleKey: string, topicIndex: number, videoIndex: number) => {
    if (!subject) return;
    const updatedTopics = [...subject.modules[moduleKey].topics];
    const updatedVideos = updatedTopics[topicIndex].videos.filter(
      (_, i) => i !== videoIndex
    );
    updatedTopics[topicIndex] = {
      ...updatedTopics[topicIndex],
      videos: updatedVideos,
    };

    updateSubject({
      ...subject,
      modules: {
        ...subject.modules,
        [moduleKey]: {
          ...subject.modules[moduleKey],
          topics: updatedTopics,
        },
      },
    });
  };


  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center ">
          <div className="text-gray-400">Loading...</div>
        </div>
      </Layout>
    );
  }


  if (!authenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center  px-6">
          <div className="max-w-md w-full">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h1 className="text-2xl font-bold text-white mb-2">
                Contributor Edit Access
              </h1>
              <p className="text-gray-400 mb-6">
                Enter the password provided by the admin to access the edit page.
              </p>

              {authError && (
                <div className="mb-4 p-3 bg-red-900 text-red-300 rounded-lg text-sm">
                  {authError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAuthenticate()}
                    className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Enter password"
                  />
                </div>

                <button
                  onClick={handleAuthenticate}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Authenticating..." : "Access Edit Page"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12 ">
        <div className="max-w-6xl mx-auto">

          {hasLocalChanges && (
            <div className="mb-6 p-4 bg-amber-900/20 border border-amber-700 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-amber-400 font-medium">Unsaved Local Changes</div>
                  <div className="text-gray-400 text-sm">Your changes are saved locally but not yet submitted for review</div>
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


          <div className="mb-8 pb-4 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Edit Subject</h1>
                <p className="text-gray-400 mt-2">
                  Editor: <span className="text-white">{editorName}</span> •{" "}
                  Subject:{" "}
                  <span className="text-white">
                    {subjectCollection
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </p>
              </div>
              <button
                onClick={handleSubmitChanges}
                disabled={submitting || !hasActualChanges()}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  submitting || !hasActualChanges()
                    ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
                    : hasLocalChanges
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {submitting ? "Submitting..." : !hasActualChanges() ? "No Changes to Submit" : hasLocalChanges ? "Submit for Review" : "Submit for Review"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900 text-red-300 rounded-lg">
              {error}
            </div>
          )}


          {subject && (
            <div className="space-y-8">

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Subject Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) =>
                        updateSubject({ ...subject, name: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Color
                    </label>
                    <input
                      type="text"
                      value={subject.color}
                      onChange={(e) =>
                        updateSubject({ ...subject, color: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                </div>
              </div>


              {Object.entries(subject.modules || {}).map(([moduleKey, module]) => (
                <div
                  key={moduleKey}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Module {moduleKey}
                  </h2>


                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">Notes & Resources</h3>
                      <button
                        onClick={() => addNotesLink(moduleKey)}
                        className="px-3 py-1 text-sm bg-zinc-800 text-white border border-zinc-700 rounded hover:border-zinc-600"
                      >
                        + Add Note
                      </button>
                    </div>
                    <div className="space-y-3">
                      {module.notesLink.map((note, noteIdx) => (
                        <div
                          key={noteIdx}
                          className="flex gap-3 items-start bg-zinc-800 p-3 rounded-lg"
                        >
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={note.title}
                              onChange={(e) =>
                                updateNotesLink(moduleKey, noteIdx, "title", e.target.value)
                              }
                              placeholder="Note title"
                              className="w-full px-3 py-2 bg-zinc-900 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                            />
                            <input
                              type="text"
                              value={note.url}
                              onChange={(e) =>
                                updateNotesLink(moduleKey, noteIdx, "url", e.target.value)
                              }
                              placeholder="Note URL"
                              className="w-full px-3 py-2 bg-zinc-900 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                            />
                          </div>
                          <button
                            onClick={() => deleteNotesLink(moduleKey, noteIdx)}
                            className="px-2 py-1 text-red-400 hover:text-red-300"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">Topics & Videos</h3>
                      <button
                        onClick={() => addTopic(moduleKey)}
                        className="px-3 py-1 text-sm bg-zinc-800 text-white border border-zinc-700 rounded hover:border-zinc-600"
                      >
                        + Add Topic
                      </button>
                    </div>
                    <div className="space-y-4">
                      {module.topics.map((topic, topicIdx) => (
                        <div
                          key={topicIdx}
                          className="bg-zinc-800 p-4 rounded-lg"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                value={topic.title}
                                onChange={(e) =>
                                  updateTopic(moduleKey, topicIdx, "title", e.target.value)
                                }
                                placeholder="Topic title"
                                className="w-full px-3 py-2 bg-zinc-900 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                              />
                              <textarea
                                value={topic.description}
                                onChange={(e) =>
                                  updateTopic(moduleKey, topicIdx, "description", e.target.value)
                                }
                                placeholder="Topic description"
                                rows={2}
                                className="w-full px-3 py-2 bg-zinc-900 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                              />
                            </div>
                            <button
                              onClick={() => deleteTopic(moduleKey, topicIdx)}
                              className="px-2 py-1 text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>


                          <div className="ml-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-400">Videos</span>
                              <button
                                onClick={() => addVideo(moduleKey, topicIdx)}
                                className="px-2 py-1 text-xs bg-zinc-900 text-white border border-zinc-700 rounded hover:border-zinc-600"
                              >
                                + Add Video
                              </button>
                            </div>
                            <div className="space-y-2">
                              {topic.videos.map((video, videoIdx) => (
                                <div
                                  key={videoIdx}
                                  className="flex gap-2 items-start bg-zinc-900 p-2 rounded"
                                >
                                  <div className="flex-1 space-y-1">
                                    <input
                                      type="text"
                                      value={video.title}
                                      onChange={(e) =>
                                        updateVideo(
                                          moduleKey,
                                          topicIdx,
                                          videoIdx,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Video title"
                                      className="w-full px-2 py-1 bg-black text-white border border-zinc-700 rounded focus:outline-none focus:ring-1 focus:ring-white text-xs"
                                    />
                                    <input
                                      type="text"
                                      value={video.url}
                                      onChange={(e) =>
                                        updateVideo(
                                          moduleKey,
                                          topicIdx,
                                          videoIdx,
                                          "url",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Video URL"
                                      className="w-full px-2 py-1 bg-black text-white border border-zinc-700 rounded focus:outline-none focus:ring-1 focus:ring-white text-xs"
                                    />
                                  </div>
                                  <button
                                    onClick={() =>
                                      deleteVideo(moduleKey, topicIdx, videoIdx)
                                    }
                                    className="px-1 text-red-400 hover:text-red-300 text-sm"
                                  >
                                    ✕
                                  </button>
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

              <button
                onClick={addModule}
                className="w-full py-3 bg-zinc-900 text-white border border-zinc-800 rounded-lg hover:border-zinc-600"
              >
                + Add New Module
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
