'use client';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface BookmarkItem {
  id: string;
  title: string;
  subject: string;
  url?: string;
  module?: number;
  topic?: string;
}

type BookmarkType = 'modules' | 'topics' | 'videos';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [activeTab, setActiveTab] = useState<BookmarkType>('modules');
  const [activeBookmarkId, setActiveBookmarkId] = useState<string | null>(null);

  const toggleActive = (id: string) => {
    setActiveBookmarkId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(stored);
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
    setBookmarks(updated);
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    if (activeTab === 'modules') return !bookmark.id.includes('topic') && !bookmark.id.includes('video');
    if (activeTab === 'topics') return bookmark.id.includes('topic');
    if (activeTab === 'videos') return bookmark.id.includes('video');
    return true;
  });

  return (
    <div className="h-screen max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Bookmarks</h1>
      
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('modules')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'modules' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}
        >
          Modules
        </button>
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'topics' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}
        >
          Topics
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'videos' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}
        >
          Videos
        </button>
      </div>
      
      {filteredBookmarks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No {activeTab} bookmarked yet
        </p>
      ) : (
        <div className="space-y-4">
          {filteredBookmarks.map((item) => (
            <div 
              key={item.id}
              className="p-4 border rounded-lg hover:bg-[#585859] hover:text-white dark:border-gray-700 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Link href="/" className="block"> 
                    <h3 className="font-medium dark:text-white hover:underline">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-400 dark:text-gray-400">
                    {item.subject} {item.module && `• Module ${item.module}`}
                  </p>
                  {activeTab === 'videos' && (
                    <p className="text-xs text-gray-400 mt-1">Video</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {activeTab === 'videos' && (
                    <ChevronDown
                      onClick={() => toggleActive(item.id)}
                      className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 cursor-pointer ${
                        activeBookmarkId === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  <button
                    onClick={() => removeBookmark(item.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {activeTab === 'videos' && activeBookmarkId === item.id && item.url && (
                <div className="mt-3">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`${item.url}?enablejsapi=1`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}