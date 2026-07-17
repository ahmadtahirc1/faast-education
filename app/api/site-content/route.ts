import { NextResponse } from 'next/server'
import { getSiteContent, saveSiteContent } from '@/lib/site-content'

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json(content)
}

export async function POST(request: Request) {
  const body = await request.json()
  await saveSiteContent(body)
  return NextResponse.json({ success: true })
}
