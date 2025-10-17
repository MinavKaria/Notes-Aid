"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

interface AdminUser {
  githubUsername: string;
  name?: string;
  role: string;
  allowedSubjects?: string[];
  createdAt: string;
  createdBy: string;
}

export default function ManageAdminsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    githubUsername: "",
    name: "",
    allowedSubjects: [] as string[],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.isSuperAdmin) {
      router.push("/admin");
    } else {
      loadData();
    }
  }, [session, status, router]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load admins
      const adminsResponse = await fetch("/api/admin/permissions");
      const adminsData = await adminsResponse.json();
      if (adminsResponse.ok) {
        setAdmins(adminsData.admins || []);
      }

      // Load available subjects
      const subjectsResponse = await fetch("/api/subject");
      const subjectsData = await subjectsResponse.json();
      if (subjectsResponse.ok) {
        setSubjects(subjectsData.subjects || []);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.githubUsername.trim()) {
      setError("GitHub username is required");
      return;
    }

    if (formData.allowedSubjects.length === 0) {
      setError("At least one subject must be selected");
      return;
    }

    try {
      const response = await fetch("/api/admin/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Admin added successfully!");
        setFormData({ githubUsername: "", name: "", allowedSubjects: [] });
        setShowAddForm(false);
        loadData();
      } else {
        setError(data.error || "Failed to add admin");
      }
    } catch (err) {
      console.error("Error adding admin:", err);
      setError("Failed to add admin");
    }
  };

  const handleRemoveAdmin = async (githubUsername: string) => {
    if (!confirm(`Are you sure you want to remove admin access for ${githubUsername}?`)) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/permissions?githubUsername=${encodeURIComponent(githubUsername)}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Admin removed successfully!");
        loadData();
      } else {
        setError(data.error || "Failed to remove admin");
      }
    } catch (err) {
      console.error("Error removing admin:", err);
      setError("Failed to remove admin");
    }
  };

  const toggleSubject = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      allowedSubjects: prev.allowedSubjects.includes(subject)
        ? prev.allowedSubjects.filter((s) => s !== subject)
        : [...prev.allowedSubjects, subject],
    }));
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

  if (!session?.user?.isSuperAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
            <div>
              <h1 className="text-3xl font-semibold text-white">Manage Admins</h1>
              <p className="text-gray-400 text-sm">
                Assign subject editing permissions to other users
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-zinc-700 rounded-md hover:border-zinc-600 transition-colors"
              >
                Back
              </Link>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 text-sm bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                {showAddForm ? "Cancel" : "Add Admin"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
              <div className="text-red-400">{error}</div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <div className="text-green-400">{success}</div>
            </div>
          )}

          {showAddForm && (
            <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Add New Admin</h2>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    GitHub Username *
                  </label>
                  <input
                    type="text"
                    value={formData.githubUsername}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUsername: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-gray-100 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                    placeholder="e.g., minavkaria"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Display Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-gray-100 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                    placeholder="e.g., Minav Karia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Allowed Subjects *
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-3 bg-zinc-800 border border-zinc-700 rounded-md">
                    {subjects.map((subject) => (
                      <label
                        key={subject}
                        className="flex items-center space-x-2 text-sm text-gray-200 cursor-pointer hover:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={formData.allowedSubjects.includes(subject)}
                          onChange={() => toggleSubject(subject)}
                          className="rounded border-zinc-600 bg-zinc-700 text-white focus:ring-white"
                        />
                        <span>{subject.replace(/_/g, " ")}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors"
                >
                  Add Admin
                </button>
              </form>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Current Admins</h2>
            
            {/* Super Admin */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-white">
                      {session.user.githubUsername}
                    </h3>
                    <span className="px-2 py-1 text-xs bg-purple-600 text-white rounded-md">
                      Super Admin
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Full access to all features</p>
                </div>
              </div>
            </div>

            {/* Subject Admins */}
            {admins.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No subject admins assigned yet
              </div>
            ) : (
              admins.map((admin) => (
                <div
                  key={admin.githubUsername}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-white">
                          {admin.name || admin.githubUsername}
                        </h3>
                        <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md">
                          Subject Admin
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">@{admin.githubUsername}</p>
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Can edit:</p>
                        <div className="flex flex-wrap gap-2">
                          {admin.allowedSubjects?.map((subject) => (
                            <span
                              key={subject}
                              className="px-2 py-1 text-xs bg-zinc-800 text-gray-300 rounded border border-zinc-700"
                            >
                              {subject.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveAdmin(admin.githubUsername)}
                      className="px-3 py-1 text-sm text-red-400 hover:text-red-300 border border-red-700 rounded-md hover:border-red-600 transition-colors"
                    >
                      Remove
                    </button>
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
