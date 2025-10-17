import { prisma } from './prisma'
import { performanceMonitor } from './performance'

export interface ProgressData {
  year: string
  branch: string
  semester: string
  subject: string
  module: string
  topic: string
  videoTitle?: string
  noteTitle?: string
}

export interface AnalyticsData {
  action: string
  year?: string
  branch?: string
  semester?: string
  subject?: string
  module?: string
  topic?: string
  metadata?: Record<string, unknown>
}

export class DatabaseService {
  // User Progress Methods
  static async markProgress(userId: string, progressData: ProgressData, completed: boolean = true) {
    return await performanceMonitor.trackQuery('mark_progress', async () => {
      try {
        return await prisma.userProgress.upsert({
          where: {
            userId_year_branch_semester_subject_module_topic_videoTitle_noteTitle: {
              userId,
              ...progressData
            }
          },
          update: {
            completed,
            completedAt: completed ? new Date() : null,
            updatedAt: new Date()
          },
          create: {
            userId,
            ...progressData,
            completed,
            completedAt: completed ? new Date() : null
          }
        })
      } catch (error) {
        console.error('Error marking progress:', error)
        throw error
      }
    })
  }

  static async getUserProgress(userId: string, filters?: Partial<ProgressData>) {
    try {
      return await prisma.userProgress.findMany({
        where: {
          userId,
          ...filters
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })
    } catch (error) {
      console.error('Error getting user progress:', error)
      throw error
    }
  }

  static async getSubjectProgress(userId: string, year: string, branch: string, semester: string, subject: string) {
    try {
      const totalItems = await prisma.userProgress.count({
        where: {
          userId,
          year,
          branch,
          semester,
          subject
        }
      })

      const completedItems = await prisma.userProgress.count({
        where: {
          userId,
          year,
          branch,
          semester,
          subject,
          completed: true
        }
      })

      return {
        total: totalItems,
        completed: completedItems,
        percentage: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
      }
    } catch (error) {
      console.error('Error getting subject progress:', error)
      throw error
    }
  }

  // User Analytics Methods
  static async logAnalytics(userId: string, analyticsData: AnalyticsData) {
    try {
      return await prisma.userAnalytics.create({
        data: {
          userId,
          ...analyticsData
        }
      })
    } catch (error) {
      console.error('Error logging analytics:', error)
      throw error
    }
  }

  static async getUserAnalytics(userId: string, limit: number = 100) {
    try {
      return await prisma.userAnalytics.findMany({
        where: {
          userId
        },
        orderBy: {
          timestamp: 'desc'
        },
        take: limit
      })
    } catch (error) {
      console.error('Error getting user analytics:', error)
      throw error
    }
  }

  // User Preferences Methods
  static async updateUserPreferences(userId: string, preferences: {
    selectedBranch?: string
    selectedYear?: string
    selectedSemester?: string
  }) {
    try {
      return await prisma.user.update({
        where: {
          id: userId
        },
        data: preferences
      })
    } catch (error) {
      console.error('Error updating user preferences:', error)
      throw error
    }
  }

  static async getUserPreferences(userId: string) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          selectedBranch: true,
          selectedYear: true,
          selectedSemester: true
        }
      })
    } catch (error) {
      console.error('Error getting user preferences:', error)
      throw error
    }
  }

  // Content Caching Methods
  static async getCachedContent(key: string) {
    try {
      const cached = await prisma.contentCache.findUnique({
        where: {
          key
        }
      })

      if (!cached || cached.expiresAt < new Date()) {
        return null
      }

      return cached.data
    } catch (error) {
      console.error('Error getting cached content:', error)
      return null
    }
  }

  static async setCachedContent(key: string, data: unknown, expirationMinutes: number = 60) {
    try {
      const expiresAt = new Date()
      expiresAt.setMinutes(expiresAt.getMinutes() + expirationMinutes)

      return await prisma.contentCache.upsert({
        where: {
          key
        },
        update: {
          data,
          expiresAt,
          updatedAt: new Date()
        },
        create: {
          key,
          data,
          expiresAt
        }
      })
    } catch (error) {
      console.error('Error setting cached content:', error)
      throw error
    }
  }

  // Cleanup expired cache entries
  static async cleanupExpiredCache() {
    try {
      return await prisma.contentCache.deleteMany({
        where: {
          expiresAt: {
            lt: new Date()
          }
        }
      })
    } catch (error) {
      console.error('Error cleaning up expired cache:', error)
      throw error
    }
  }
}