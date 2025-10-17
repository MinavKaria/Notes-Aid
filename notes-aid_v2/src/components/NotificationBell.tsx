"use client";
import { Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
  type?: "info" | "success" | "warning" | "error";
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async (): Promise<void> => {
    setLoading(true);
    try {
      // Fetch from local notification.json file
      const response = await fetch("/notification.json");

      if (!response.ok) {
        throw new Error(`Failed to load notifications: ${response.status}`);
      }

      const data: Notification[] = await response.json();

      // Filter notifications that start with "notify:" (optional, remove if not needed)
      const notifyOnly = data.filter(
        (note: Notification) => note.message.startsWith("notify:")
      );

      const lastReadTimestamp = localStorage.getItem("LastNotificationRead");

      if (lastReadTimestamp) {
        const lastReadDate = new Date(lastReadTimestamp);
        notifyOnly.forEach((notification: Notification) => {
          const notificationDate = new Date(notification.date);
          notification.read = notificationDate <= lastReadDate;
        });
        const unreadCount = notifyOnly.reduce(
          (count: number, note: Notification) => count + (note.read ? 0 : 1),
          0
        );
        setNotifications(notifyOnly);
        setUnreadCount(unreadCount);
      } else {
        // Mark all as unread if no timestamp exists
        notifyOnly.forEach((notification: Notification) => {
          notification.read = false;
        });
        setNotifications(notifyOnly);
        setUnreadCount(notifyOnly.length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      const mockNotifications: Notification[] = [
        {
          id: "1",
          message: "notify: Welcome to Notes-Aid!",
          date: new Date().toISOString(),
          read: false,
          type: "info",
        },
      ];

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.length);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = (): void => {
    setNotifications(notifications.map((note) => ({ ...note, read: true })));
    setUnreadCount(0);
    localStorage.setItem("LastNotificationRead", new Date().toISOString());
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);

    // Update LastNotificationRead if this was the latest notification
    const clickedNotification = notifications.find((n) => n.id === id);
    if (clickedNotification) {
      const currentLastRead = localStorage.getItem("LastNotificationRead");
      const clickedDate = new Date(clickedNotification.date);
      if (
        !currentLastRead ||
        new Date(currentLastRead) < clickedDate
      ) {
        localStorage.setItem("LastNotificationRead", clickedDate.toISOString());
      }
    }

    // Update unread count
    const newUnreadCount = updated.filter((n) => !n.read).length;
    setUnreadCount(newUnreadCount);
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            <div className="flex items-center gap-2">
              {loading && (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
              )}
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={fetchNotifications}
                className="text-xs text-gray-400 hover:text-white transition-colors"
                disabled={loading}
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                {loading ? "Loading notifications..." : "No notifications yet"}
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer ${
                    !notification.read ? "bg-zinc-800/50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-200">
                        {notification.message.replace("notify:", "").trim()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTime(notification.date)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
