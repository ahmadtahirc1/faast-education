import { promises as fs } from 'fs'
import path from 'path'
import { list, put } from '@vercel/blob'

export type SiteContent = {
  name: string
  fullName: string
  tagline: string
  location: string
  locationShort: string
  phone: string
  phone2: string
  email: string
  website: string
  facebookUrl: string
  whatsapp: string
  description: string
  heroBackground?: string
  founderImage?: string
  announcement?: {
    enabled: boolean
    title: string
    message: string
    image?: string
    imageAlt?: string
    ctaText?: string
    ctaUrl?: string
  }
  programs: Array<{
    id: string
    name: string
    shortName: string
    icon: string
    tagline: string
    description: string
    details: string[]
    duration: string
    timing: string
    level: string
    color: string
    image?: string
    badge?: string
    badgeColor?: string
    university?: string
  }>
  achievements: {
    rating: string
    reviews: number
    facebookLikes: number
    talkingAbout: number
    followers: string
    studentPositions: string
  }
  features: string[]
  facilities?: Array<{
    title: string
    description: string
    image?: string
    icon: string
  }>
  galleryImages?: Array<{
    src: string
    title: string
  }>
}

const contentPath = path.join(process.cwd(), 'data', 'academy.json')
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
const BLOB_PATHNAME = 'academy.json'

async function readBundledDefault(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, 'utf8')
  return JSON.parse(raw) as SiteContent
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!BLOB_TOKEN) return readBundledDefault()

  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, token: BLOB_TOKEN, limit: 1 })
    const match = blobs.find((blob) => blob.pathname === BLOB_PATHNAME)
    if (!match) return readBundledDefault()

    const response = await fetch(`${match.url}?v=${Date.now()}`, { cache: 'no-store' })
    if (!response.ok) return readBundledDefault()

    return (await response.json()) as SiteContent
  } catch (error) {
    console.error('Failed to load site content from Blob, falling back to bundled defaults:', error)
    return readBundledDefault()
  }
}

export async function saveSiteContent(content: SiteContent) {
  if (!BLOB_TOKEN) {
    throw new Error('Blob storage is not configured (missing BLOB_READ_WRITE_TOKEN).')
  }

  await put(BLOB_PATHNAME, JSON.stringify(content, null, 2), {
    access: 'public',
    token: BLOB_TOKEN,
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  })
}
