"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import DiffViewer from "@/components/DiffViewer";
import Link from "next/link";

interface PendingChange {
  _id: string;
  linkId: string;
  subjectCollection: string;
  editorName: string;
  changeData: unknown;
  originalData?: unknown;
  status: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export default function ReviewChangesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState<PendingChange[]>([]);
  const [selectedChange, setSelectedChange] = useState<PendingChange | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [viewMode, setViewMode] = useState<"diff" | "json">("diff");

  const loadChanges = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/review-changes");
      const data = await response.json();

      if (response.ok) {
        setChanges(data.changes || []);
      } else {
        console.error("Failed to load changes:", data.error);
      }
    } catch (error) {
      console.error("Error loading changes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.isAdmin) {
      router.push("/auth/signin");
    } else {
      loadChanges();
    }
  }, [session, status, router, loadChanges]);

  const handleReview = async (action: "approve" | "reject") => {
    if (!selectedChange) return;

    const confirmMsg =
      action === "approve"
        ? "Approve and apply these changes to the production database?"
        : "Reject these changes?";

    if (!confirm(confirmMsg)) return;

    setReviewing(true);

    try {
      const response = await fetch("/api/admin/review-changes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          changeId: selectedChange._id,
          action,
          reviewNotes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setSelectedChange(null);
        setReviewNotes("");
        setViewMode("diff");
        loadChanges();
      } else {
        alert(`Failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error reviewing change:", error);
      alert("Failed to review change");
    } finally {
      setReviewing(false);
    }
  };

  const pendingChanges = changes.filter((c) => c.status === "pending");
  const reviewedChanges = changes.filter((c) => c.status !== "pending");

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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
            <div>
              <h1 className="text-3xl font-bold text-white">Review Changes</h1>
              <p className="text-gray-400 mt-2">
                Review and approve contributor submissions
              </p>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 bg-zinc-900 text-white border border-zinc-800 rounded-lg hover:border-zinc-600"
            >
              Back to Admin
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-amber-400">
                {pendingChanges.length}
              </div>
              <div className="text-sm text-gray-400">Pending Review</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">
                {reviewedChanges.filter((c) => c.status === "approved").length}
              </div>
              <div className="text-sm text-gray-400">Approved</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400">
                {reviewedChanges.filter((c) => c.status === "rejected").length}
              </div>
              <div className="text-sm text-gray-400">Rejected</div>
            </div>
          </div>

          {/* Pending Changes */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Pending Review
            </h2>
            {pendingChanges.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No pending changes</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingChanges.map((change) => (
                  <div
                    key={change._id}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {change.editorName}
                          </h3>
                          <span className="px-2 py-1 text-xs rounded bg-amber-900 text-amber-300">
                            Pending
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">
                          Subject:{" "}
                          {change.subjectCollection
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Submitted: {new Date(change.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedChange(change)}
                        className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviewed Changes */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Review History
            </h2>
            {reviewedChanges.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No reviewed changes yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviewedChanges.slice(0, 10).map((change) => (
                  <div
                    key={change._id}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {change.editorName}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              change.status === "approved"
                                ? "bg-green-900 text-green-300"
                                : "bg-red-900 text-red-300"
                            }`}
                          >
                            {change.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">
                          Subject:{" "}
                          {change.subjectCollection
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </p>
                        <p className="text-gray-500 text-xs mb-1">
                          Submitted: {new Date(change.submittedAt).toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Reviewed by {change.reviewedBy} on{" "}
                          {change.reviewedAt &&
                            new Date(change.reviewedAt).toLocaleString()}
                        </p>
                        {change.reviewNotes && (
                          <p className="text-gray-400 text-sm mt-2">
                            Notes: {change.reviewNotes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedChange && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-6 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col my-6">
            <div className="p-6 border-b border-zinc-800 flex-shrink-0">
              <h2 className="text-2xl font-bold text-white">Review Changes</h2>
              <p className="text-gray-400 mt-1">
                Editor: {selectedChange.editorName} • Subject:{" "}
                {selectedChange.subjectCollection
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => setViewMode("diff")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === "diff"
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Diff View
                    </span>
                  </button>
                  <button
                    onClick={() => setViewMode("json")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === "json"
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      JSON View
                    </span>
                  </button>
                </div>

                {/* Content */}
                {viewMode === "diff" ? (
                  <DiffViewer
                    originalData={selectedChange.originalData}
                    changedData={selectedChange.changeData}
                  />
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Original Data
                      </h3>
                      <pre className="bg-black border border-zinc-800 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto max-h-96">
                        {JSON.stringify(selectedChange.originalData, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        New Data
                      </h3>
                      <pre className="bg-black border border-zinc-800 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto max-h-96">
                        {JSON.stringify(selectedChange.changeData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Review Notes (Optional)
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Add notes about this review..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-800 flex-shrink-0">
              <div className="flex gap-3">
                <button
                  onClick={() => handleReview("approve")}
                  disabled={reviewing}
                  className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {reviewing ? "Processing..." : "✓ Approve & Apply"}
                </button>
                <button
                  onClick={() => handleReview("reject")}
                  disabled={reviewing}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {reviewing ? "Processing..." : "✗ Reject"}
                </button>
                <button
                  onClick={() => {
                    setSelectedChange(null);
                    setReviewNotes("");
                    setViewMode("diff");
                  }}
                  disabled={reviewing}
                  className="px-6 py-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg hover:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
