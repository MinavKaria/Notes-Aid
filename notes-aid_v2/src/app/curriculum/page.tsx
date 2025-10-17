"use client";
import React, { useEffect, useState, useRef } from "react";
import Layout from "@/components/Layout";
import { GridSkeleton } from "@/components/Skeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type SubjectMeta = {
  name: string;
  slug: string;
  collection: string;
  redirectPath?: string;
  color?: string;
};

type RawSubject = {
  name?: string;
  slug?: string;
  collection?: string;
  redirectPath?: string;
  color?: string;
};

export default function CurriculumEditorPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [year, setYear] = useState<number>(1);
  const [branch, setBranch] = useState<string>("comps");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [available, setAvailable] = useState<SubjectMeta[]>([]);
  const [selected, setSelected] = useState<SubjectMeta[]>([]);

  const dragIndex = useRef<number | null>(null);
  const dragFromAvailable = useRef<boolean>(false);

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session?.user?.isAdmin) {
      router.push("/auth/signin")
    }
  }, [session, status, router])

  async function loadAll() {
    setLoading(true);
    try {
      const [subRes, curRes] = await Promise.all([
        fetch(`/api/subject`),
        fetch(
          `/api/curriculum?year=${year}&branch=${encodeURIComponent(branch)}`
        ),
      ]);

      // available subject collections (subject API returns array of collection names)
      let collections: string[] = [];
      if (subRes.ok) {
        const json = await subRes.json();
        // may be { subjects: [...] } or array
        collections = Array.isArray(json) ? json : json?.subjects ?? [];
      }

      const avail: SubjectMeta[] = collections.map((c: string) => {
        const slug = String(c);
        const name = slug
          .replace(/_/g, " ")
          .replace(/\b\w/g, (s) => s.toUpperCase());
        return {
          name,
          slug,
          collection: slug,
          redirectPath: `/subject/${slug}`,
          color: "gray",
        };
      });

      // curriculum fetch result
      let existing: SubjectMeta[] = [];
      if (curRes.ok) {
        const json = await curRes.json();
        const doc =
          json?.data && Array.isArray(json.data)
            ? json.data[0]
            : json?.data ?? json;
        if (doc && Array.isArray(doc.subjects)) {
          existing = doc.subjects.map((s: RawSubject) => ({
            name: s.name || (s.slug || s.collection || "").replace(/_/g, " "),
            slug: s.slug || s.collection || s.name,
            collection: s.collection || s.slug || s.name,
            redirectPath:
              s.redirectPath || `/subject/${s.slug || s.collection}`,
            color: s.color || "gray",
          }));
        }
      }

      // mark available minus selected existing
      const selectedSlugs = new Set(existing.map((s) => s.slug));
      const filteredAvailable = avail.filter((a) => !selectedSlugs.has(a.slug));

      setAvailable(filteredAvailable);
      setSelected(existing);
    } catch (err) {
      console.error("Failed to load curriculum or subjects:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onDragStartAvailable(e: React.DragEvent, idx: number) {
    dragIndex.current = idx;
    dragFromAvailable.current = true;
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragStartSelected(e: React.DragEvent, idx: number) {
    dragIndex.current = idx;
    dragFromAvailable.current = false;
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function onDropOnSelected(e: React.DragEvent, targetIdx?: number) {
    e.preventDefault();
    const fromIdx = dragIndex.current;
    const fromAvailable = dragFromAvailable.current;
    if (fromIdx == null) return;

    if (fromAvailable) {
      // add available[fromIdx] into selected at targetIdx or end
      const item = available[fromIdx];
      if (!item) return;
      const next = [...selected];
      const insertAt = typeof targetIdx === "number" ? targetIdx : next.length;
      next.splice(insertAt, 0, item);
      setSelected(next);
      // remove from available
      const nextAvail = [...available];
      nextAvail.splice(fromIdx, 1);
      setAvailable(nextAvail);
    } else {
      // reorder selected
      const next = [...selected];
      const [moved] = next.splice(fromIdx, 1);
      const insertAt = typeof targetIdx === "number" ? targetIdx : next.length;
      next.splice(insertAt, 0, moved);
      setSelected(next);
    }

    dragIndex.current = null;
    dragFromAvailable.current = false;
  }

  function onDropOnAvailable(e: React.DragEvent, targetIdx?: number) {
    e.preventDefault();
    const fromIdx = dragIndex.current;
    const fromAvailable = dragFromAvailable.current;
    if (fromIdx == null) return;

    if (!fromAvailable) {
      // move from selected back to available
      const next = [...selected];
      const [moved] = next.splice(fromIdx, 1);
      const nextAvail = [...available];
      const insertAt =
        typeof targetIdx === "number" ? targetIdx : nextAvail.length;
      nextAvail.splice(insertAt, 0, moved);
      setSelected(next);
      setAvailable(nextAvail);
    }

    dragIndex.current = null;
    dragFromAvailable.current = false;
  }

  async function confirmSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/curriculum`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, branch, subjects: selected }),
      });
      if (!res.ok) throw new Error("Save failed");
      alert("Curriculum saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save curriculum");
    } finally {
      setSaving(false);
    }
  }

  if (status === "loading") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </Layout>
    )
  }

  if (!session?.user?.isAdmin) {
    return null // Will redirect
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Curriculum Editor</h1>
              <p className="text-gray-400">
                Drag & drop subjects to build the curriculum
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="curr-year" className="sr-only">
                Year
              </label>
              <select
                id="curr-year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="bg-black/40 border border-gray-700 px-3 py-2 rounded"
              >
                <option value={1}>Year 1</option>
                <option value={2}>Year 2</option>
                <option value={3}>Year 3</option>
                <option value={4}>Year 4</option>
              </select>
              <label htmlFor="curr-branch" className="sr-only">
                Branch
              </label>
              <select
                id="curr-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="bg-black/40 border border-gray-700 px-3 py-2 rounded"
              >
                <option value="comps">COMPS</option>
                <option value="it">IT</option>
                <option value="extc">EXTC</option>
              </select>
              <button
                onClick={loadAll}
                className="bg-white text-black px-4 py-2 rounded-full"
              >
                Load
              </button>
              <button
                onClick={confirmSave}
                disabled={saving}
                className={`px-4 py-2 rounded-full ${
                  saving
                    ? "bg-gray-700 text-gray-300"
                    : "bg-green-600 text-white"
                }`}
              >
                {saving ? "Saving…" : "Confirm & Save"}
              </button>
            </div>
          </div>

          {loading ? (
            <GridSkeleton />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
                  <h2 className="text-lg font-semibold mb-3">
                    Selected Subjects (drag to reorder)
                  </h2>
                  <div
                    onDragOver={onDragOver}
                    onDrop={(e) => onDropOnSelected(e)}
                    className="space-y-3"
                  >
                    {selected.length === 0 && (
                      <div className="text-gray-400">
                        No subjects selected — drag from the right or click add.
                      </div>
                    )}
                    {selected.map((s, i) => (
                      <div
                        key={s.slug}
                        draggable
                        onDragStart={(e) => onDragStartSelected(e, i)}
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDropOnSelected(e, i)}
                        className="bg-gray-800 p-3 rounded-lg flex items-center justify-between border border-gray-700"
                      >
                        <div>
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-gray-400">
                            {s.collection}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              // remove
                              setSelected((prev) =>
                                prev.filter((x) => x.slug !== s.slug)
                              );
                              setAvailable((prev) => [{ ...s }, ...prev]);
                            }}
                            className="text-sm text-red-400"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
                  <h2 className="text-lg font-semibold mb-3">
                    Available Subjects
                  </h2>
                  <div
                    onDragOver={onDragOver}
                    onDrop={(e) => onDropOnAvailable(e)}
                    className="space-y-2 max-h-[60vh] overflow-auto"
                  >
                    {available.map((a, i) => (
                      <div
                        key={a.slug}
                        draggable
                        onDragStart={(e) => onDragStartAvailable(e, i)}
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDropOnAvailable(e, i)}
                        className="bg-black/40 p-3 rounded-lg flex items-center justify-between border border-gray-700"
                      >
                        <div>
                          <div className="font-medium">{a.name}</div>
                          <div className="text-xs text-gray-400">
                            {a.collection}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              // add to end
                              setSelected((prev) => [...prev, a]);
                              setAvailable((prev) =>
                                prev.filter((x) => x.slug !== a.slug)
                              );
                            }}
                            className="text-sm text-blue-300"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
