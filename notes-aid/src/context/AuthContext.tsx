"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  rollNo?: string;
  year?: number | string;
  branch?: string;
  phone?: string;
  isProfileComplete?: boolean;
}

// Define a type for SGPA entries
interface SGPAEntry {
  _id: string;
  semester: number;
  sgpa: number;
}

// Add dashboard-related interfaces
interface UserStats {
  cgpa?: number;
  totalSemesters?: number;
  sgpaList?: SGPAEntry[]; // Added sgpaList to UserStats
  rank: number;
  totalStudents: number;
  admissionYear?: number;
  currentYear?: number;
  isProfileComplete?: boolean;
  documentsUploaded: number;
}

interface DocumentItem {
  _id: string;
  subject: string;
  module: string;
  faculty?: string;
  year?: number;
  uploadedBy: {
    name: string;
  };
  url: string;
  cloudinaryId?: string;
  fileName?: string;
  fileSize?: number;
  description?: string;
  createdAt: string;
}

interface PodcastItem {
  _id: string;
  title: string;
  topic: string;
  uploadedBy: {
    name: string;
  };
  createdAt: string;
  duration?: number;
}

interface DashboardData {
  stats: {
    totalDocuments: number;
    totalPodcasts: number;
    documentsUploaded: number;
    rank: number;
    totalUsers: number;
  };
  userStats: UserStats;
  recentDocuments: DocumentItem[];
  recentPodcasts: PodcastItem[];
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateProfile: (userData: Partial<User>) => void;
  dashboardData: DashboardData | null;
  refreshDashboardData: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility function to construct API URLs properly
const getApiUrl = (endpoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const cleanBase = baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
  const cleanEndpoint = endpoint.replace(/^\/+/, ''); // Remove leading slashes
  return `${cleanBase}/${cleanEndpoint}`;
};

// Cookie options with httpOnly and secure flags for production
const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false); // Track fresh login
  const router = useRouter();
  
  // Dashboard state
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Don't run auth check until mounted
    
    const checkAuth = async () => {
      try {
        const cookies = parseCookies();
        // Try new cookie names first, then fall back to legacy names
        const authToken = cookies.quadratoken || cookies.authToken;
        const userCookie = cookies.user || cookies.userData;
          if (authToken && userCookie) {
          const userData = JSON.parse(userCookie);
          setUser(userData);
          setToken(authToken);
            // Skip token validation if we just logged in (to avoid CORS issues during callback)
          if (justLoggedIn) {
            setJustLoggedIn(false);
            setLoading(false);
            return;
          }
          
          try {            const response = await fetch(getApiUrl('api/v1/auth/status'), {
              headers: { Authorization: `Bearer ${authToken}` },
              credentials: 'include' // Include cookies in requests
            });
            
            if (!response.ok) {
              throw new Error('Invalid token');
            }            const data = await response.json();
            if (data.user) {
              // After token validation, fetch complete user profile
              try {
                const profileResponse = await fetch(getApiUrl(`api/v1/user/${data.user.id}`), {
                  headers: { Authorization: `Bearer ${authToken}` },
                  credentials: 'include'
                });
                
                if (profileResponse.ok) {
                  const profileData = await profileResponse.json();
                  if (profileData.success && profileData.user) {
                    // Use complete profile data instead of incomplete auth status data
                    setUser(profileData.user);
                    setCookie(null, 'user', JSON.stringify(profileData.user), COOKIE_OPTIONS);
                  } else {
                    // Fallback to merging with existing data if profile fetch fails
                    setUser(prevUser => {
                      const mergedUser = { ...prevUser, ...data.user };
                      setCookie(null, 'user', JSON.stringify(mergedUser), COOKIE_OPTIONS);
                      return mergedUser;
                    });
                  }
                } else {
                  // Fallback to merging with existing data if profile fetch fails
                  setUser(prevUser => {
                    const mergedUser = { ...prevUser, ...data.user };
                    setCookie(null, 'user', JSON.stringify(mergedUser), COOKIE_OPTIONS);
                    return mergedUser;
                  });
                }
              } catch (profileErr) {
                console.error('Failed to fetch complete profile:', profileErr);
                // Fallback to merging with existing data
                setUser(prevUser => {
                  const mergedUser = { ...prevUser, ...data.user };
                  setCookie(null, 'user', JSON.stringify(mergedUser), COOKIE_OPTIONS);
                  return mergedUser;
                });
              }
              
              // Clean up legacy cookie names
              if (cookies.userData) {
                destroyCookie(null, 'userData', { path: '/' });
              }
              if (cookies.authToken) {
                destroyCookie(null, 'authToken', { path: '/' });
                setCookie(null, 'quadratoken', authToken, COOKIE_OPTIONS);
              }
              
              // Fetch dashboard data after successful authentication
              if (data.user.isProfileComplete !== false) {
                fetchDashboardData(data.user.id, authToken);
              }
            }
          } catch (err) {
            console.error('Token validation failed:', err);
            logout();
          }
        }
      } catch (err) {
        console.error('Auth restore error:', err);
        logout();
        setError('Authentication session expired. Please login again.');
      } finally {
        setLoading(false);
      }
    };    checkAuth();
  }, [mounted, justLoggedIn]);

  const fetchDashboardData = async (userId: string, authToken: string) => {
    try {
      setDashboardData(prev => prev ? { ...prev, isLoading: true, error: null } : {
        stats: {
          totalDocuments: 0,
          totalPodcasts: 0,
          documentsUploaded: 0,
          rank: 0,
          totalUsers: 0
        },
        userStats: {
          rank: 0,
          totalStudents: 0,
          documentsUploaded: 0
        },
        recentDocuments: [],
        recentPodcasts: [],
        isLoading: true,
        error: null
      });      // Fetch real data from backend endpoints
      const [userStatsRes, documentsRes, podcastsRes] = await Promise.allSettled([
        fetch(getApiUrl(`api/v1/user/${userId}/stats`), {
          headers: { Authorization: `Bearer ${authToken}` }
        }),
        fetch(getApiUrl('api/v1/documents'), {
          headers: { Authorization: `Bearer ${authToken}` }
        }),
        fetch(getApiUrl('api/v1/podcasts'), {
          headers: { Authorization: `Bearer ${authToken}` }
        })
      ]);

      let userStats: UserStats = {
        rank: 0,
        totalStudents: 0,
        documentsUploaded: 0
      };
      
      if (userStatsRes.status === 'fulfilled' && userStatsRes.value.ok) {
        const userStatsData = await userStatsRes.value.json();
        
        if (userStatsData.success) {
          const stats = userStatsData.stats;
          userStats = {
            cgpa: stats.cgpa,
            totalSemesters: stats.totalSemesters,
            sgpaList: stats.sgpaList, // Include sgpaList in userStats
            rank: stats.rank,
            totalStudents: stats.totalStudentsInYear,
            admissionYear: stats.admissionYear,
            currentYear: stats.year,
            isProfileComplete: stats.isProfileComplete,
            documentsUploaded: stats.documentsUploaded || 0,
          };
        }
      }      // Now fetch leaderboard with the correct admission year
      let leaderboardRes = null;
      if (userStats.admissionYear) {
        try {
          leaderboardRes = await fetch(
            getApiUrl(`api/v1/leaderboard?admission_year=${userStats.admissionYear}&limit=100`), 
            {
              headers: { Authorization: `Bearer ${authToken}` }
            }
          );
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
        }
      }

      // Process documents
      let documentsData: DocumentItem[] = [];
      let totalDocuments = 0;
      if (documentsRes.status === 'fulfilled' && documentsRes.value.ok) {
        const docsResponse = await documentsRes.value.json();
        if (docsResponse.success && docsResponse.data) {
          documentsData = docsResponse.data.slice(0, 5); // Recent documents
          totalDocuments = docsResponse.totalDocuments;
        }
      }

      // Process podcasts
      let podcastsData: PodcastItem[] = [];
      let totalPodcasts = 0;
      if (podcastsRes.status === 'fulfilled' && podcastsRes.value.ok) {
        const podcastsResponse = await podcastsRes.value.json();
        if (podcastsResponse.success && podcastsResponse.data) {
          podcastsData = podcastsResponse.data.slice(0, 3); // Recent podcasts
          totalPodcasts = podcastsResponse.totalPodcasts;
        }
      }      // Process leaderboard for user rank
      let userRank = userStats.rank || 0;
      let totalUsers = userStats.totalStudents || 0;
      
      if (leaderboardRes && leaderboardRes.ok) {
        try {
          const leaderboardResponse = await leaderboardRes.json();
          
          if (leaderboardResponse.success && leaderboardResponse.data && Array.isArray(leaderboardResponse.data)) {
            const leaderboard = leaderboardResponse.data;
            totalUsers = leaderboard.length;
            
            // Find user by rollNo/seat_number instead of user._id
            const userPosition = leaderboard.findIndex((entry: any) => 
              entry.seat_number === user?.rollNo
            );
            
            if (userPosition >= 0) {
              userRank = userPosition + 1;
            } else {
              // If not found in leaderboard, use the rank from userStats
              userRank = userStats.rank || 0;
            }
          }
        } catch (error) {
          console.error('Error processing leaderboard response:', error);
          // Fallback to userStats rank if leaderboard processing fails
          userRank = userStats.rank || 0;
        }
      }      setDashboardData({
        stats: {
          totalDocuments,
          totalPodcasts,
          documentsUploaded: userStats.documentsUploaded || 0,
          rank: userRank,
          totalUsers
        },
        userStats,
        recentDocuments: documentsData,
        recentPodcasts: podcastsData,
        isLoading: false,
        error: null
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDashboardData(prev => prev ? { 
        ...prev, 
        isLoading: false, 
        error: 'Failed to load dashboard data' 
      } : {
        stats: {
          totalDocuments: 0,
          totalPodcasts: 0,
          documentsUploaded: 0,
          rank: 0,
          totalUsers: 0
        },
        userStats: {
          rank: 0,
          totalStudents: 0,
          documentsUploaded: 0
        },
        recentDocuments: [],
        recentPodcasts: [],
        isLoading: false,
        error: 'Failed to load dashboard data'
      });
    }
  };
  // Function to refresh dashboard data
  const refreshDashboardData = useCallback(async () => {
    if (user && token) {
      await fetchDashboardData(user.id, token);
    }
  }, [user, token]);  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    setLoading(false); // Set loading to false immediately
    setJustLoggedIn(true); // Mark as fresh login to skip validation
    
    // Use new cookie names for better security
    setCookie(null, 'quadratoken', authToken, COOKIE_OPTIONS);
    setCookie(null, 'user', JSON.stringify(userData), COOKIE_OPTIONS);
    
    // Clean up any legacy cookies
    destroyCookie(null, 'authToken', { path: '/' });
    destroyCookie(null, 'userData', { path: '/' });
    
    // Navigate to appropriate page after login
    setTimeout(() => {
      if (userData.isProfileComplete === false) {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    }, 100);
    
    // Fetch dashboard data upon login if profile is complete
    if (userData.isProfileComplete !== false) {
      fetchDashboardData(userData.id, authToken);
    }
  };

  const logout = async () => {
    try {      if (token) {
        await fetch(getApiUrl('api/v1/auth/logout'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include' // Include cookies in logout request
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all possible cookie names (new and legacy)
      destroyCookie(null, 'quadratoken', { path: '/' });
      destroyCookie(null, 'user', { path: '/' });
      destroyCookie(null, 'authToken', { path: '/' });
      destroyCookie(null, 'userData', { path: '/' });
      setUser(null);
      setToken(null);
      setDashboardData(null);
      router.push('/');
    }
  };
    const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = {...prevUser, ...userData};
      setCookie(null, 'user', JSON.stringify(updatedUser), COOKIE_OPTIONS);
      
      // Refresh dashboard data if profile is now complete
      if (userData.isProfileComplete === true && token) {
        fetchDashboardData(updatedUser.id, token);
      }
      
      return updatedUser;
    });
  };

  // Alias for updateUser to maintain consistent API
  const updateProfile = (userData: Partial<User>) => {
    updateUser(userData);
  };
  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    updateUser,
    updateProfile,
    dashboardData,
    refreshDashboardData
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};