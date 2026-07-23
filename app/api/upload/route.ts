import { NextResponse } from 'next/server'
import { getSupabaseServerClient, MEDIA_BUCKET } from '@/lib/supabase'

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase is not configured (missing SUPABASE_URL/SUPABASE_SECRET_KEY).' },
      { status: 500 },
    )
  }

  const formData = await request.formData()
  const file = formData.get('file')
  const slot = formData.get('slot')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }
  if (typeof slot !== 'string' || !slot) {
    return NextResponse.json({ error: 'No slot provided' }, { status: 400 })
  }

  const safeSlot = slot.replace(/[^a-zA-Z0-9_-]/g, '_')
  const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/)
  const ext = (extMatch?.[1] ?? 'jpg').toLowerCase()
  const objectPath = `${safeSlot}.${ext}`

  try {
    const buffer = Buffer.from(await file.arrayBuffer())

    // upsert: true reuses the same object path per slot, so replacing an
    // image overwrites the old file instead of leaving it orphaned forever.
    const { error: uploadError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(objectPath, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      })

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(objectPath)

    return NextResponse.json({ url: `${data.publicUrl}?v=${Date.now()}` })
  } catch (error) {
    console.error('Upload failed:', error)
    const message = error instanceof Error ? error.message : 'Unknown upload error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
