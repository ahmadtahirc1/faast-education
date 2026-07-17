import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

export async function POST(request: Request) {
  if (!BLOB_TOKEN) {
    console.error('Upload failed: BLOB_READ_WRITE_TOKEN is not set')
    return NextResponse.json(
      { error: 'Blob storage is not configured (missing read/write token).' },
      { status: 500 },
    )
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')}`

  try {
    const blob = await put(safeName, file, {
      access: 'public',
      token: BLOB_TOKEN,
    })

    return NextResponse.json({
      url: blob.url,
    })
  } catch (error) {
    console.error('Upload failed:', error)
    const message = error instanceof Error ? error.message : 'Unknown upload error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
