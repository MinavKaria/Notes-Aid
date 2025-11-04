import { NextRequest, NextResponse } from 'next/server'
import { performanceMonitor } from '@/lib/performance'

export async function GET(request: NextRequest) {
  try {
    // In production, you should add authentication for admin endpoints
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overview'

    switch (type) {
      case 'database':
        const dbStats = await performanceMonitor.getDatabaseStats()
        return NextResponse.json({ type: 'database', data: dbStats })

      case 'activity':
        const activity = await performanceMonitor.getRecentActivity()
        return NextResponse.json({ type: 'activity', data: activity })

      case 'cache':
        const cacheStats = await performanceMonitor.getCacheStats()
        return NextResponse.json({ type: 'cache', data: cacheStats })

      case 'overview':
      default:
        const [database, recentActivity, cache] = await Promise.all([
          performanceMonitor.getDatabaseStats(),
          performanceMonitor.getRecentActivity(),
          performanceMonitor.getCacheStats()
        ])

        return NextResponse.json({
          type: 'overview',
          data: {
            database,
            recent_activity: recentActivity,
            cache: cache,
            timestamp: new Date().toISOString()
          }
        })
    }
  } catch (error) {
    console.error('Error in stats API:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch statistics',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'maintenance') {
      const result = await performanceMonitor.performMaintenance()
      return NextResponse.json({
        message: 'Maintenance completed',
        result
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error in stats POST API:', error)
    return NextResponse.json(
      { error: 'Failed to perform action' },
      { status: 500 }
    )
  }
}