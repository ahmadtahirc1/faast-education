import { NextResponse } from 'next/server'
import { getSiteContent, saveSiteContent } from '@/lib/site-content'

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json(content)
}

export async function POST(request: Request) {
  const body = await request.json()

  try {
    await saveSiteContent(body)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to save site content:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
