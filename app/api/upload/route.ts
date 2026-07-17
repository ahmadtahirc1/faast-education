import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')}`

  const blob = await put(safeName, file, {
    access: 'public',
  })

  return NextResponse.json({
    url: blob.url,
  })
}
