"use client";
import { useState, useEffect } from 'react';

interface BookmarkItem {
  id: string;
  title: string;
  type: 'module' | 'topic' | 'video';
  subject: string;
  module?: number;
  topics?: string;
  url?: string;
  state?: {
      selectedsubject: string;
      selectedmodule: number;
  }
}

export const BookmarkButton = ({ item }: { item: BookmarkItem }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = getBookmarks();
    setIsBookmarked(bookmarks.some(b => b.id === item.id));
  }, [item.id]);

  const toggleBookmark = () => {
    const bookmarks = getBookmarks();
    const updatedBookmarks = isBookmarked
      ? bookmarks.filter(b => b.id !== item.id)
      : [...bookmarks, item]; // item includes url for videos
    
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button
      onClick={toggleBookmark}
      className="p-1 h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <span className="text-yellow-500">★</span>
      ) : (
        <span className="text-gray-400 dark:text-gray-500">☆</span>
      )}
    </button>
  );
};

const getBookmarks = (): BookmarkItem[] => {
  try {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]');
  } catch {
    return [];
  }
};
