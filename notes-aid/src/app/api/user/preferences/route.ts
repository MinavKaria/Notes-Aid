import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { DatabaseService } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.email
    const preferences = await DatabaseService.getUserPreferences(userId)

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error('Error in preferences GET API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { selectedBranch, selectedYear, selectedSemester } = body

    const userId = session.user.email
    const preferences = await DatabaseService.updateUserPreferences(userId, {
      selectedBranch,
      selectedYear,
      selectedSemester
    })

    // Log analytics for preference change
    await DatabaseService.logAnalytics(userId, {
      action: 'update_preferences',
      metadata: { selectedBranch, selectedYear, selectedSemester }
    })

    return NextResponse.json({ success: true, preferences })
  } catch (error) {
    console.error('Error in preferences POST API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}