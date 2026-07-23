import { list, put } from '@vercel/blob'

export type Inquiry = {
  id: string
  name: string
  phone: string
  email?: string
  program: string
  message?: string
  createdAt: string
}

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
const BLOB_PATHNAME = 'inquiries.json'

async function readInquiries(): Promise<Inquiry[]> {
  if (!BLOB_TOKEN) return []

  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, token: BLOB_TOKEN, limit: 1 })
    const match = blobs.find((blob) => blob.pathname === BLOB_PATHNAME)
    if (!match) return []

    const response = await fetch(`${match.url}?v=${Date.now()}`, { cache: 'no-store' })
    if (!response.ok) return []

    return (await response.json()) as Inquiry[]
  } catch (error) {
    console.error('Failed to load inquiries from Blob:', error)
    return []
  }
}

async function writeInquiries(inquiries: Inquiry[]) {
  if (!BLOB_TOKEN) {
    throw new Error('Blob storage is not configured (missing BLOB_READ_WRITE_TOKEN).')
  }

  await put(BLOB_PATHNAME, JSON.stringify(inquiries, null, 2), {
    access: 'public',
    token: BLOB_TOKEN,
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  })
}

export async function getInquiries(): Promise<Inquiry[]> {
  const inquiries = await readInquiries()
  return inquiries.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function addInquiry(entry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> {
  const inquiries = await readInquiries()

  const inquiry: Inquiry = {
    ...entry,
    id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  }

  await writeInquiries([...inquiries, inquiry])
  return inquiry
}

export async function deleteInquiry(id: string): Promise<void> {
  const inquiries = await readInquiries()
  await writeInquiries(inquiries.filter((inquiry) => inquiry.id !== id))
}
