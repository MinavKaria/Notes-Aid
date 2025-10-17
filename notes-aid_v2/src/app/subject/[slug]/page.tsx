"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useParams } from "next/navigation";

type ModuleStat = {
  key: string;
  notesCount?: number;
  videosCount?: number;
};

type QuickLinkItem = {
  name: string;
  url: string;
};

type QuickLink = {
  _id: string;
  templateName: string;
  linkType: 'books' | 'pyqs' | 'other';
  links: QuickLinkItem[];
};

function formatName(name: string) {
    return name
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

const linkTypeLabels = {
  books: "Books & References",
  pyqs: "Previous Year Questions",
  other: "Other Important Links",
};

export default function SubjectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [modules, setModules] = useState<ModuleStat[]>([]);
  const [subjectName, setSubjectName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [quickLinksLoading, setQuickLinksLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/subject/${encodeURIComponent(slug)}/stats`)
      .then((r) => r.json())
      .then((json) => {
        const payload = json?.data ?? json;

      
        let modulesArr: ModuleStat[] = [];
        if (Array.isArray(payload)) {
          modulesArr = payload as ModuleStat[];
          setSubjectName(slug);
        } else if (Array.isArray(payload.modules)) {
          modulesArr = payload.modules as ModuleStat[];
          setSubjectName(payload.subject ?? slug);
        } else if (Array.isArray(payload.moduleStats)) {
          modulesArr = payload.moduleStats as ModuleStat[];
          setSubjectName(payload.subject ?? slug);
        } else {
          modulesArr = [];
          setSubjectName(payload.subject ?? slug);
        }

        setModules(modulesArr);
      })
      .catch((e) => {
        console.error(e);
        setModules([]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    setQuickLinksLoading(true);
    fetch(`/api/subject/${encodeURIComponent(slug)}/quick-links`)
      .then((r) => r.json())
      .then((json) => {
        setQuickLinks(json.quickLinks || []);
      })
      .catch((e) => {
        console.error(e);
        setQuickLinks([]);
      })
      .finally(() => setQuickLinksLoading(false));
  }, [slug]);

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12 ">
        <div className="w-full max-w-6xl mx-auto">

            {!quickLinksLoading && quickLinks.length > 0 && (
                <div className="my-12">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">Quick Links</h2>
                        <p className="text-gray-400 text-sm">
                            Important resources and references for this subject
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {quickLinks.map((quickLink) => (
                            <div
                                key={quickLink._id}
                                className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg hover:border-zinc-600 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-100">
                                        {quickLink.templateName}
                                    </h3>
                                    <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded whitespace-nowrap">
                        {linkTypeLabels[quickLink.linkType]}
                      </span>
                                </div>

                                <div className="space-y-2">
                                    {quickLink.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-3 bg-zinc-800 border border-zinc-700 rounded-md hover:border-zinc-600 hover:bg-zinc-750 transition-colors group"
                                        >
                                            <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-200 group-hover:text-white">
                              {link.name}
                            </span>
                                                <svg
                                                    className="w-4 h-4 text-gray-400 group-hover:text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    />
                                                </svg>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          <div className="mb-8 pb-6 border-b border-zinc-800">
            <h1 className="text-3xl font-semibold text-white mb-2">{formatName(subjectName || slug)}</h1>
            <p className="text-gray-400 text-sm">
              Select a module to view content and resources
            </p>
          </div>

          {loading && (
            <div className="space-y-6">
              <div className="h-8 w-1/3 bg-zinc-800 rounded-md animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="h-40 bg-zinc-900 border border-zinc-800 rounded-lg p-4 animate-pulse" />
                <div className="h-40 bg-zinc-900 border border-zinc-800 rounded-lg p-4 animate-pulse" />
                <div className="h-40 bg-zinc-900 border border-zinc-800 rounded-lg p-4 animate-pulse" />
              </div>
            </div>
          )}

          {!loading && modules.length === 0 && (
            <p className="text-gray-400 text-sm">
              No module data available for this subject.
            </p>
          )}



          {!loading && modules.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((m) => (
                <div
                  key={m.key}
                  className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg hover:border-zinc-600 transition-all"
                >
                  <h3 className="text-lg font-medium mb-2 text-gray-100">Module {m.key}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {m.notesCount ?? 0} Notes • {m.videosCount ?? 0} Videos
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      onClick={() =>
                        (window.location.href = `/subject/${slug}/module/${m.key}`)
                      }
                      className="bg-white text-black px-4 py-2 rounded-md text-center cursor-pointer text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Open Module
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}


        </div>
      </div>
    </Layout>
  );
}
