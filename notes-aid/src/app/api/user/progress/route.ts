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
      year, 
      branch, 
      semester, 
      subject, 
      module, 
      topic, 
      videoTitle, 
      noteTitle, 
      completed = true 
    } = body

    if (!year || !branch || !semester || !subject || !module || !topic) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 })
    }

    // For now, using email as user identifier - this should be improved with proper user management
    const userId = session.user.email

    const progress = await DatabaseService.markProgress(userId, {
      year,
      branch,
      semester,
      subject,
      module,
      topic,
      videoTitle,
      noteTitle
    }, completed)

    // Log analytics
    await DatabaseService.logAnalytics(userId, {
      action: completed ? 'mark_completed' : 'mark_incomplete',
      year,
      branch,
      semester,
      subject,
      module,
      topic,
      metadata: { videoTitle, noteTitle }
    })

    return NextResponse.json({ success: true, progress })
  } catch (error) {
    console.error('Error in progress API:', error)
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
    const year = searchParams.get('year')
    const branch = searchParams.get('branch')
    const semester = searchParams.get('semester')
    const subject = searchParams.get('subject')

    const userId = session.user.email
    const filters: any = {}
    
    if (year) filters.year = year
    if (branch) filters.branch = branch
    if (semester) filters.semester = semester
    if (subject) filters.subject = subject

    const progress = await DatabaseService.getUserProgress(userId, filters)

    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Error in progress GET API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}