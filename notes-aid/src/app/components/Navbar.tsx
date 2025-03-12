"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon, NotebookPen, Bell } from "lucide-react"

// Define types for notifications
interface Notification {
  id: string
  message: string
  date: Date
  read: boolean
}

interface RawNotification {
  id: string
  message: string
  date: string // Date comes as string from the API
  read: boolean
}

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    fetchNotifications()

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchNotifications = async (): Promise<void> => {
    setLoading(true)
    try {
      // Fetch commits from our own API route
      const response = await fetch("/api/github-commits")

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()

      // Convert string dates to Date objects and apply any filtering if needed
      const processedNotifications = data.map((item: RawNotification) => ({
        ...item,
        date: new Date(item.date),
        // Optional: Filter for "notify:" prefix
        message: item.message.startsWith("notify: ")
          ? item.message.replace("notify: ", "")
          : item.message,
      }))

      // Optional: Filter only messages that start with "notify:"
      const notifyOnly = processedNotifications.filter((note: Notification) =>
        note.message.startsWith("notify: ")
      )

      setNotifications(notifyOnly)
      setUnreadCount(notifyOnly.length) 
    } catch (error) {
      console.error("Error fetching notifications:", error)
      // Fallback to mock data if the API fails
      const mockNotifications: Notification[] = [
        {
          id: "1",
          message: "Added responsive design to mobile view",
          date: new Date(),
          read: false,
        },
        {
          id: "2",
          message: "Fixed dark mode toggle issues",
          date: new Date(Date.now() - 86400000), // 1 day ago
          read: false,
        },
      ]

      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.length)
    } finally {
      setLoading(false)
    }
  }

  const markAllAsRead = (): void => {
    setNotifications(notifications.map((note) => ({ ...note, read: true })))
    setUnreadCount(0)
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="w-full py-4 px-6 border-b transition-colors duration-200 bg-white dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <NotebookPen className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Notes-Aid
                <sup className="text-xs font-normal text-gray-500 dark:text-gray-400 mx-2">
                  Beta
                </sup>
              </h1>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                      Loading...
                    </div>
                  ) : notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-gray-100 dark:border-gray-700 ${
                          !notification.read
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        }`}
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {notification.date.toLocaleDateString()} at{" "}
                          {notification.date.toLocaleTimeString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              console.log("Theme toggled")
              setTheme(theme === "dark" ? "light" : "dark")
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-gray-200" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
