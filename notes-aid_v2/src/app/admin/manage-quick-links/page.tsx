"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

interface QuickLinkItem {
  name: string;
  url: string;
}

interface QuickLink {
  _id: string;
  templateName: string;
  subjectCollections: string[]; // Changed to array
  linkType: 'books' | 'pyqs' | 'other';
  links: QuickLinkItem[];
  createdBy: string;
  createdAt: string;
}

interface Subject {
  name: string;
  collection?: string;
}

export default function ManageQuickLinksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<QuickLink | null>(null);
  const [formData, setFormData] = useState({
    templateName: "",
    subjectCollections: [] as string[], // Changed to array
    linkType: "books" as 'books' | 'pyqs' | 'other',
    links: [{ name: "", url: "" }],
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Load quick links
      const quickLinksResponse = await fetch("/api/admin/quick-links");
      const quickLinksData = await quickLinksResponse.json();
      if (quickLinksResponse.ok) {
        setQuickLinks(quickLinksData.quickLinks || []);
      }

      // Load subjects
      const subjectsResponse = await fetch("/api/subject");
      const subjectsData = await subjectsResponse.json();
      if (subjectsResponse.ok) {
        const subjectList = (subjectsData.subjects || []).map((collectionName: string) => ({
          name: collectionName.replace(/_/g, ' ').replace(/\b\w/g, (s: string) => s.toUpperCase()),
          collection: collectionName
        }));
        setSubjects(subjectList);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.isAdmin) {
      router.push("/auth/signin");
    } else {
      loadData();
    }
  }, [session, status, router, loadData]);

  const handleAddLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { name: "", url: "" }],
    });
  };

  const handleRemoveLink = (index: number) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index),
    });
  };

  const handleLinkChange = (index: number, field: 'name' | 'url', value: string) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingLink 
        ? `/api/admin/quick-links/${editingLink._id}`
        : "/api/admin/quick-links";
      
      const method = editingLink ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingLink ? "Quick link updated!" : "Quick link created!");
        setShowForm(false);
        setEditingLink(null);
        setFormData({
          templateName: "",
          subjectCollections: [],
          linkType: "books",
          links: [{ name: "", url: "" }],
        });
        loadData();
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving quick link:", error);
      alert("Failed to save quick link");
    }
  };

  const handleEdit = (quickLink: QuickLink) => {
    setEditingLink(quickLink);
    setFormData({
      templateName: quickLink.templateName,
      subjectCollections: quickLink.subjectCollections || [],
      linkType: quickLink.linkType,
      links: quickLink.links.length > 0 ? quickLink.links : [{ name: "", url: "" }],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quick link template?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/quick-links/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Quick link deleted!");
        loadData();
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting quick link:", error);
      alert("Failed to delete quick link");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingLink(null);
    setFormData({
      templateName: "",
      subjectCollections: [],
      linkType: "books",
      links: [{ name: "", url: "" }],
    });
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

  if (!session?.user?.isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
            <div>
              <h1 className="text-3xl font-semibold text-white">Manage Quick Links</h1>
              <p className="text-gray-400 text-sm">
                Create and manage quick link templates for subjects
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-zinc-700 rounded-md hover:border-zinc-600 transition-colors"
              >
                Back to Admin
              </Link>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-white text-black px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Create New Template
                </button>
              )}
            </div>
          </div>

          {showForm && (
            <div className="mb-8 bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                {editingLink ? "Edit Quick Link Template" : "Create Quick Link Template"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="templateName" className="block text-sm font-medium mb-2">
                      Template Name
                    </label>
                    <input
                      id="templateName"
                      type="text"
                      value={formData.templateName}
                      onChange={(e) => setFormData({ ...formData, templateName: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                      placeholder="e.g. Reference Books"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subjects (Select one or more)
                    </label>
                    <div className="max-h-60 overflow-y-auto bg-zinc-800 border border-zinc-700 rounded-lg p-3 space-y-2">
                      {subjects.map((subject) => (
                        <label
                          key={subject.collection}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-zinc-700 p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={formData.subjectCollections.includes(subject.collection || '')}
                            onChange={(e) => {
                              const subjectCol = subject.collection || '';
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  subjectCollections: [...formData.subjectCollections, subjectCol]
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  subjectCollections: formData.subjectCollections.filter(s => s !== subjectCol)
                                });
                              }
                            }}
                            className="w-4 h-4 text-blue-600 bg-zinc-700 border-zinc-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-white">{subject.name}</span>
                        </label>
                      ))}
                    </div>
                    {formData.subjectCollections.length === 0 && (
                      <p className="text-xs text-red-400 mt-1">Please select at least one subject</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="linkType" className="block text-sm font-medium mb-2">
                    Link Type
                  </label>
                  <select
                    id="linkType"
                    value={formData.linkType}
                    onChange={(e) => setFormData({ ...formData, linkType: e.target.value as 'books' | 'pyqs' | 'other' })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    required
                  >
                    <option value="books">Books / References</option>
                    <option value="pyqs">Previous Year Questions (PYQs)</option>
                    <option value="other">Other Important Links</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Links</label>
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Add Link
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.links.map((link, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 bg-zinc-800 rounded-lg">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={link.name}
                            onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm"
                            placeholder="Link name"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm"
                            placeholder="https://..."
                            required
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleRemoveLink(index)}
                            className="w-full bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700"
                            disabled={formData.links.length === 1}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
                  >
                    {editingLink ? "Update Template" : "Create Template"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 text-gray-300 border border-zinc-700 rounded-md hover:border-zinc-600 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Existing Templates</h2>
            {quickLinks.length === 0 ? (
              <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-lg">
                <p className="text-gray-400">No quick link templates yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickLinks.map((quickLink) => (
                  <div
                    key={quickLink._id}
                    className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg hover:border-zinc-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white">{quickLink.templateName}</h3>
                        <div className="text-sm text-gray-400 mt-1">
                          {quickLink.subjectCollections.map((subCol, idx) => (
                            <span key={subCol}>
                              {subjects.find(s => s.collection === subCol)?.name || subCol}
                              {idx < quickLink.subjectCollections.length - 1 && ', '}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {quickLink.subjectCollections.length} subject(s)
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
                        {quickLink.linkType === 'books' ? 'Books' : quickLink.linkType === 'pyqs' ? 'PYQs' : 'Other'}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2">{quickLink.links.length} link(s)</p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {quickLink.links.map((link, index) => (
                          <div key={index} className="text-xs text-gray-500 truncate">
                            • {link.name}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(quickLink)}
                        className="flex-1 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(quickLink._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
