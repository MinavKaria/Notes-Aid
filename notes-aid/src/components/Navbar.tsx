"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NotebookPen, Bell, X, Download } from "lucide-react";
import ThemeSwitcher from "./ThemeChanger";

interface Notification {
  id: string;
  message: string;
  date: Date;
  read: boolean;
}

interface RawNotification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

// Define the BeforeInstallPromptEvent interface since it's not in standard TypeScript
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

// Define the Navigator extension for getInstalledRelatedApps
interface NavigatorWithInstalledApps extends Navigator {
  getInstalledRelatedApps?: () => Promise<InstalledRelatedApp[]>;
  standalone?: boolean;
}

// Define the InstalledRelatedApp interface
interface InstalledRelatedApp {
  id: string;
  platform: string;
  url?: string;
  version?: string;
}

const Navbar = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // PWA installation states
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [iOSInstructionsVisible, setIOSInstructionsVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    fetchNotifications();

    // Check if user is on iOS
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    setIsIOS(checkIOS());

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    // More reliable app installation detection
    const checkAppInstalled = () => {
      // Method 1: Check if in standalone mode or display-mode is standalone
      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as NavigatorWithInstalledApps).standalone === true
      ) {
        setIsAppInstalled(true);
        return true;
      }

      // Method 2: Use the new getInstalledRelatedApps API (if available)
      const navigatorExt = navigator as NavigatorWithInstalledApps;
      if (navigatorExt.getInstalledRelatedApps) {
        navigatorExt
          .getInstalledRelatedApps()
          .then((apps: InstalledRelatedApp[]) => {
            if (apps.length > 0) {
              setIsAppInstalled(true);
              return true;
            }
          })
          .catch((error: Error) => {
            console.error("Error checking installed related apps:", error);
          });
      }

      return false;
    };

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // If we're already installed, ignore the prompt
      if (checkAppInstalled()) {
        return;
      }

      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI to notify the user they can install the PWA
      console.log("App can be installed");
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      // Hide the install button
      setIsAppInstalled(true);
      setDeferredPrompt(null);
      console.log("PWA was installed");
    };

    // Listen for display mode changes
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // User switched to standalone mode, app is installed
        setIsAppInstalled(true);
        setDeferredPrompt(null);
      }
    };

    // Check if app is already installed on component mount
    checkAppInstalled();

    // Set up display mode change listener
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    mediaQuery.addEventListener("change", handleDisplayModeChange);

    // Add event listeners
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      document.removeEventListener("mousedown", handleClickOutside);
      mediaQuery.removeEventListener("change", handleDisplayModeChange);
    };
  }, []);

  // Re-check installation status when the component becomes visible
  // This helps detect if the app was installed while the browser was minimized
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Check if the app is in standalone mode
        if (
          window.matchMedia("(display-mode: standalone)").matches ||
          (navigator as NavigatorWithInstalledApps).standalone === true
        ) {
          setIsAppInstalled(true);
          setDeferredPrompt(null);
        }
      }
    };

    // console.log(deferredPrompt,isIOS,isAppInstalled,iOSInstructionsVisible)

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const fetchNotifications = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/github-commits");

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data)

      const processedNotifications = data.map((item: RawNotification) => ({
        ...item,
        date: new Date(item.date),
        message: item.message,
      }));

      const notifyOnly = processedNotifications.filter(
        (note: RawNotification) => note.message.startsWith("notify:")
      );

      // console.log(notifyOnly)

      const k = localStorage.getItem("LastNotificationRead");

      if (k) {
        const lastReadDate = new Date(k);
        notifyOnly.forEach((notification: Notification) => {
          notification.read = notification.date <= lastReadDate;
        });
        const unreadCount = notifyOnly.reduce(
          (count: number, note: Notification) => count + (note.read ? 0 : 1),
          0
        );
        setNotifications(notifyOnly);
        setUnreadCount(unreadCount);
      } else {
        setNotifications(notifyOnly);
        setUnreadCount(notifyOnly.length);
      }

      // const unreadNotifications = notifyOnly.filter((note: Notification) => !note.read);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      const mockNotifications: Notification[] = [
        {
          id: "1",
          message: "Welcome to Notes-Aid!",
          date: new Date(),
          read: false,
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

  // Handle PWA installation for non-iOS devices
  const handleInstallClick = async () => {
    if (isIOS) {
      // Show iOS installation instructions
      setIOSInstructionsVisible(!iOSInstructionsVisible);
      return;
    }

    if (!deferredPrompt) {
      console.log("Installation prompt not available");
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      setIsAppInstalled(true);
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the saved prompt as it can't be used again
    setDeferredPrompt(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="w-full py-4 px-6 border-b transition-colors duration-200 bg-base-300 ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <NotebookPen className="w-6 h-6 text-base-content " />
              <h1 className="text-xl font-bold text-base-content ">
                Notes-Aid
                <sup className="text-xs font-normal text-base-content  mx-2">
                  Beta
                </sup>
              </h1>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {!isAppInstalled && (isIOS || deferredPrompt) && (
            <div className="relative">
              <button
                onClick={handleInstallClick}
                className="flex items-center justify-center p-2 rounded-full hover:hover:bg-gray-500 transition-colors duration-200"
                aria-label="Install app"
                title={isIOS ? "Add to Home Screen" : "Install Notes-Aid"}
              >
                <Download className="w-5 h-5  dark:text-gray-200 text-base-content " />
              </button>

              {/* iOS installation instructions popup */}
              {isIOS && iOSInstructionsVisible && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50 ">
                  <button
                    onClick={() => setIOSInstructionsVisible(false)}
                    className="absolute top-2 right-2  text-base-content "
                  >
                    <X className="w-4 h-4 " />
                  </button>
                  <h4 className="font-medium text-gray-900 dark:text-base mb-2">
                    Add to Home Screen
                  </h4>
                  <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-2 ml-4 list-decimal">
                    <li>Tap the Share button in your browser&apos;s toolbar</li>
                    <li>Scroll down and tap &quot;Add to Home Screen&quot;</li>
                    <li>Tap &quot;Add&quot; in the top right corner</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-500 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5  text-base-content " />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showDropdown && (
               <div className="fixed top-16 left-1/2 -translate-x-1/2 md:-translate-x-0 w-11/12 max-w-sm z-50 md:absolute md:transform-none md:top-auto md:left-auto md:right-0 md:mt-2 md:w-80">
                <div className="bg-base-100 rounded-lg shadow-lg w-full flex flex-col">
                  <div className="p-3  border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-base-200  rounded-t-lg">
                    <h3 className="text-sm font-medium text-base-content ">
                      Notifications
                    </h3>
                    <div className="flex items-center space-x-3">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Mark all as read
                        </button>
                      )}
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="rounded-full p-1 hover:bg-gray-500"
                      >
                        <X className="w-4 h-4 hover:text-gray-800" />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-y-auto max-h-64">
                    {loading ? (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                        Loading...
                      </div>
                    ) : notifications.length > 0 ? (
                      notifications.map((note) => (
                        <div
                          key={note.id}
                          className={`p-3  ${
                            note.read ? "bg-base-100 " : "bg-primary/20 border-2 border-base-300"
                          }`}
                        >
                          <p className="text-sm text-base-content">
                            {note.message.replace("notify:", "")}
                          </p>
                          <p className="text-xs text-base-content/60">
                            {note.date.toLocaleString()}
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
              </div>
            )}
          </div>


          <ThemeSwitcher/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
