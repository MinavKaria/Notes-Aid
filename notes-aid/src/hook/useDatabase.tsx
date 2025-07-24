import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface ProgressData {
  year: string
  branch: string
  semester: string
  subject: string
  module: string
  topic: string
  videoTitle?: string
  noteTitle?: string
}

interface UserProgress {
  id: string
  completed: boolean
  completedAt: string | null
  year: string
  branch: string
  semester: string
  subject: string
  module: string
  topic: string
  videoTitle?: string
  noteTitle?: string
}

interface AnalyticsData {
  action: string
  year?: string
  branch?: string
  semester?: string
  subject?: string
  module?: string
  topic?: string
  metadata?: Record<string, any>
}

export function useDatabase() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const markProgress = async (progressData: ProgressData, completed: boolean = true) => {
    if (!session) {
      setError('Not authenticated')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...progressData, completed }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to mark progress')
      }

      return data.progress
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getUserProgress = async (filters?: Partial<ProgressData>) => {
    if (!session) {
      setError('Not authenticated')
      return []
    }

    setLoading(true)
    setError(null)

    try {
      const searchParams = new URLSearchParams()
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) searchParams.append(key, value)
        })
      }

      const response = await fetch(`/api/user/progress?${searchParams}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get progress')
      }

      return data.progress as UserProgress[]
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return []
    } finally {
      setLoading(false)
    }
  }

  const logAnalytics = async (analyticsData: AnalyticsData) => {
    if (!session) return null

    try {
      const response = await fetch('/api/user/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analyticsData),
      })

      const data = await response.json()

      if (!response.ok) {
        console.warn('Failed to log analytics:', data.error)
        return null
      }

      return data.analytics
    } catch (err) {
      console.warn('Failed to log analytics:', err)
      return null
    }
  }

  const updatePreferences = async (preferences: {
    selectedBranch?: string
    selectedYear?: string
    selectedSemester?: string
  }) => {
    if (!session) {
      setError('Not authenticated')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update preferences')
      }

      return data.preferences
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getUserPreferences = async () => {
    if (!session) return null

    try {
      const response = await fetch('/api/user/preferences')
      const data = await response.json()

      if (!response.ok) {
        console.warn('Failed to get preferences:', data.error)
        return null
      }

      return data.preferences
    } catch (err) {
      console.warn('Failed to get preferences:', err)
      return null
    }
  }

  return {
    loading,
    error,
    markProgress,
    getUserProgress,
    logAnalytics,
    updatePreferences,
    getUserPreferences,
    isAuthenticated: !!session
  }
}