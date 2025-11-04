import { prisma } from './prisma'

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metricsBuffer: Array<{
    metric: string
    value: number
    timestamp: Date
    metadata?: Record<string, unknown>
  }> = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Track database query performance
  async trackQuery<T>(
    queryName: string,
    queryFunction: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now()
    
    try {
      const result = await queryFunction()
      const duration = Date.now() - startTime
      
      this.recordMetric('db_query_duration', duration, {
        query: queryName,
        status: 'success'
      })

      // Log slow queries
      if (duration > 100) {
        console.warn(`Slow query detected: ${queryName} took ${duration}ms`)
      }

      return result
    } catch (error) {
      const duration = Date.now() - startTime
      
      this.recordMetric('db_query_duration', duration, {
        query: queryName,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })

      throw error
    }
  }

  // Record custom metrics
  recordMetric(
    metric: string, 
    value: number, 
    metadata?: Record<string, unknown>
  ) {
    this.metricsBuffer.push({
      metric,
      value,
      timestamp: new Date(),
      metadata
    })

    // Flush buffer if it gets too large
    if (this.metricsBuffer.length > 100) {
      this.flushMetrics()
    }
  }

  // Flush metrics to database or logging service
  private async flushMetrics() {
    if (this.metricsBuffer.length === 0) return

    try {
      // In production, you might want to send these to a monitoring service
      // For now, we'll log them and optionally store in database
      
      console.log('Performance Metrics:', {
        count: this.metricsBuffer.length,
        timestamp: new Date().toISOString(),
        metrics: this.metricsBuffer.slice(0, 10) // Log first 10 for debugging
      })

      // Clear buffer
      this.metricsBuffer = []
    } catch (error) {
      console.error('Failed to flush metrics:', error)
    }
  }

  // Get database connection info
  async getDatabaseStats() {
    try {
      const stats = await this.trackQuery('database_stats', async () => {
        const userCount = await prisma.user.count()
        const progressCount = await prisma.userProgress.count()
        const analyticsCount = await prisma.userAnalytics.count()
        const cacheCount = await prisma.contentCache.count()

        return {
          users: userCount,
          progress_entries: progressCount,
          analytics_entries: analyticsCount,
          cache_entries: cacheCount,
          timestamp: new Date()
        }
      })

      return stats
    } catch (error) {
      console.error('Failed to get database stats:', error)
      return null
    }
  }

  // Monitor user activity in the last hour
  async getRecentActivity() {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      
      const activity = await this.trackQuery('recent_activity', async () => {
        const analytics = await prisma.userAnalytics.groupBy({
          by: ['action'],
          where: {
            timestamp: {
              gte: oneHourAgo
            }
          },
          _count: {
            id: true
          }
        })

        return analytics.map(item => ({
          action: item.action,
          count: item._count.id
        }))
      })

      return activity
    } catch (error) {
      console.error('Failed to get recent activity:', error)
      return []
    }
  }

  // Monitor cache efficiency
  async getCacheStats() {
    try {
      const stats = await this.trackQuery('cache_stats', async () => {
        const total = await prisma.contentCache.count()
        const expired = await prisma.contentCache.count({
          where: {
            expiresAt: {
              lt: new Date()
            }
          }
        })

        return {
          total_entries: total,
          expired_entries: expired,
          active_entries: total - expired,
          efficiency: total > 0 ? ((total - expired) / total * 100).toFixed(2) : '0.00'
        }
      })

      return stats
    } catch (error) {
      console.error('Failed to get cache stats:', error)
      return null
    }
  }

  // Clean up expired metrics and cache
  async performMaintenance() {
    try {
      // Clean up expired cache entries
      const deletedCache = await this.trackQuery('cache_cleanup', async () => {
        return await prisma.contentCache.deleteMany({
          where: {
            expiresAt: {
              lt: new Date()
            }
          }
        })
      })

      // Clean up old analytics (keep last 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const deletedAnalytics = await this.trackQuery('analytics_cleanup', async () => {
        return await prisma.userAnalytics.deleteMany({
          where: {
            timestamp: {
              lt: thirtyDaysAgo
            }
          }
        })
      })

      console.log('Maintenance completed:', {
        deleted_cache_entries: deletedCache.count,
        deleted_analytics_entries: deletedAnalytics.count
      })

      return {
        cache_cleaned: deletedCache.count,
        analytics_cleaned: deletedAnalytics.count
      }
    } catch (error) {
      console.error('Maintenance failed:', error)
      return null
    }
  }

  // Start periodic maintenance
  startPeriodicMaintenance(intervalMinutes: number = 60) {
    setInterval(async () => {
      await this.performMaintenance()
    }, intervalMinutes * 60 * 1000)

    setInterval(() => {
      this.flushMetrics()
    }, 30 * 1000) // Flush metrics every 30 seconds
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance()