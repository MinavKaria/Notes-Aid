'use client';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface BookmarkItem {
  id: string;
  title: string;
  subject: string;
  url?: string;
  module?: number;
  topic?: string;
  type: 'module' | 'topic' | 'video';
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [activeTab, setActiveTab] = useState<'modules' | 'topics' | 'videos'>('modules');
  const [activeBookmarkId, setActiveBookmarkId] = useState<string | null>(null);

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
    if (activeTab === 'modules') return bookmark.type === 'module';
    if (activeTab === 'topics') return bookmark.type === 'topic';
    if (activeTab === 'videos') return bookmark.type === 'video';
    return true;
  });

  return (
    <div className="h-screen max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Bookmarks</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        {(['modules', 'topics', 'videos'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {filteredBookmarks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No {activeTab} bookmarked yet
        </p>
      ) : (
        <div className="space-y-4">
          {filteredBookmarks.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.subject}
                    {item.module && ` • Module ${item.module}`}
                    {item.topic && ` • ${item.topic}`}
                  </p>
                  {item.type === 'video' && (
                    <p className="text-xs text-gray-400 mt-1">Video</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {item.type === 'video' && (
                    <ChevronDown
                      onClick={() => setActiveBookmarkId(prev => prev === item.id ? null : item.id)}
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

              {item.type === 'video' && activeBookmarkId === item.id && item.url && (
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
                    />
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