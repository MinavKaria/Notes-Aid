"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

interface EditLink {
  _id: string;
  linkId: string;
  subjectCollection: string;
  editorName: string;
  isActive: boolean;
  createdAt: string;
  lastAccessedAt?: string;
}

export default function ManageLinksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<EditLink[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    subjectCollection: "",
    editorName: "",
    password: "",
  });
  const [subjects, setSubjects] = useState<string[]>([]);

  const loadLinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/edit-links");
      const data = await response.json();

      if (response.ok) {
        setLinks(data.links || []);
      } else {
        console.error("Failed to load links:", data.error);
      }
    } catch (error) {
      console.error("Error loading links:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSubjects = useCallback(async () => {
    try {
      const response = await fetch("/api/subject");
      const data = await response.json();

      if (response.ok) {
        setSubjects(data.subjects || []);
      }
    } catch (error) {
      console.error("Error loading subjects:", error);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.isAdmin) {
      router.push("/auth/signin");
    } else {
      loadLinks();
      loadSubjects();
    }
  }, [session, status, router, loadLinks, loadSubjects]);

  const handleCreateLink = async () => {
    if (!formData.subjectCollection || !formData.editorName || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("/api/admin/edit-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Link created successfully!\n\nURL: ${window.location.origin}${data.editUrl}\nPassword: ${formData.password}\n\nShare this with ${formData.editorName}`);
        setShowCreateForm(false);
        setFormData({ subjectCollection: "", editorName: "", password: "" });
        loadLinks();
      } else {
        alert(`Failed to create link: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating link:", error);
      alert("Failed to create link");
    }
  };

  const handleRevokeLink = async (linkId: string) => {
    if (!confirm("Are you sure you want to revoke this link?")) return;

    try {
      const response = await fetch(`/api/admin/edit-links?linkId=${linkId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Link revoked successfully");
        loadLinks();
      } else {
        const data = await response.json();
        alert(`Failed to revoke link: ${data.error}`);
      }
    } catch (error) {
      console.error("Error revoking link:", error);
      alert("Failed to revoke link");
    }
  };

  const copyToClipboard = (linkId: string, password: string) => {
    const url = `${window.location.origin}/edit/${linkId}`;
    const text = `Edit Link: ${url}\nPassword: ${password}`;
    navigator.clipboard.writeText(text);
    alert("Link and password copied to clipboard!");
  };

  if (status === "loading" || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-gray-400">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
            <div>
              <h1 className="text-3xl font-bold text-white">Manage Edit Links</h1>
              <p className="text-gray-400 mt-2">
                Create password-protected edit links for contributors
              </p>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 bg-zinc-900 text-white border border-zinc-800 rounded-lg hover:border-zinc-600"
            >
              Back to Admin
            </Link>
          </div>

          <div className="mb-8">
            {!showCreateForm ? (
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100"
              >
                + Create New Edit Link
              </button>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Create Edit Link
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Subject
                    </label>
                    <select
                      value={formData.subjectCollection}
                      onChange={(e) =>
                        setFormData({ ...formData, subjectCollection: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Editor Name
                    </label>
                    <input
                      type="text"
                      value={formData.editorName}
                      onChange={(e) =>
                        setFormData({ ...formData, editorName: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="Minav Karia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Password
                    </label>
                    <input
                      type="text"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="Create a secure password"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCreateLink}
                      className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100"
                    >
                      Create Link
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateForm(false);
                        setFormData({ subjectCollection: "", editorName: "", password: "" });
                      }}
                      className="px-6 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg hover:border-zinc-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Active Links</h2>
            {links.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No edit links created yet</p>
              </div>
            ) : (
              links.map((link) => (
                <div
                  key={link._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {link.editorName}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            link.isActive
                              ? "bg-green-900 text-green-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {link.isActive ? "Active" : "Revoked"}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">
                        Subject:{" "}
                        {link.subjectCollection
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Created: {new Date(link.createdAt).toLocaleString()}
                      </p>
                      {link.lastAccessedAt && (
                        <p className="text-gray-500 text-xs">
                          Last accessed: {new Date(link.lastAccessedAt).toLocaleString()}
                        </p>
                      )}
                      <div className="mt-3">
                        <code className="text-xs text-blue-400 bg-zinc-800 px-2 py-1 rounded">
                          {window.location.origin}/edit/{link.linkId}
                        </code>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {link.isActive && (
                        <>
                          <button
                            onClick={() => copyToClipboard(link.linkId, "****")}
                            className="px-3 py-1 text-sm bg-zinc-800 text-white border border-zinc-700 rounded hover:border-zinc-600"
                          >
                            Copy Link
                          </button>
                          <button
                            onClick={() => handleRevokeLink(link.linkId)}
                            className="px-3 py-1 text-sm bg-red-900 text-red-300 border border-red-800 rounded hover:bg-red-800"
                          >
                            Revoke
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
