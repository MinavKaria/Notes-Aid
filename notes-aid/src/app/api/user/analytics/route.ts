import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { DatabaseService } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      action,
      year,
      branch,
      semester,
      subject,
      module,
      topic,
      metadata
    } = body

    if (!action) {
      return NextResponse.json({ 
        error: 'Action is required' 
      }, { status: 400 })
    }

    const userId = session.user.email

    const analytics = await DatabaseService.logAnalytics(userId, {
      action,
      year,
      branch,
      semester,
      subject,
      module,
      topic,
      metadata
    })

    return NextResponse.json({ success: true, analytics })
  } catch (error) {
    console.error('Error in analytics API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')

    const userId = session.user.email
    const analytics = await DatabaseService.getUserAnalytics(userId, limit)

    return NextResponse.json({ analytics })
  } catch (error) {
    console.error('Error in analytics GET API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}