import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadsDir, { recursive: true })

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')}`
  const fileBuffer = Buffer.from(await file.arrayBuffer())
  const filePath = path.join(uploadsDir, safeName)

  await fs.writeFile(filePath, fileBuffer)

  return NextResponse.json({
    url: `/uploads/${safeName}`,
  })
}
