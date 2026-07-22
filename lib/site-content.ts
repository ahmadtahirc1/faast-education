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
    subCourses?: Array<{
      name: string
      duration: string
      description: string
    }>
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

// Saved content in Blob can predate fields added to the bundled defaults
// since (e.g. a new program field with no admin UI yet) - backfill any
// missing field per-program, matched by id, rather than losing it silently.
function backfillFromBundledDefaults(remote: SiteContent, bundled: SiteContent): SiteContent {
  const bundledProgramsById = new Map(bundled.programs.map((program) => [program.id, program]))

  const programs = remote.programs.map((program) => {
    const defaults = bundledProgramsById.get(program.id)
    return defaults ? { ...defaults, ...program } : program
  })

  return { ...bundled, ...remote, programs }
}

export async function getSiteContent(): Promise<SiteContent> {
  const bundled = await readBundledDefault()
  if (!BLOB_TOKEN) return bundled

  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, token: BLOB_TOKEN, limit: 1 })
    const match = blobs.find((blob) => blob.pathname === BLOB_PATHNAME)
    if (!match) return bundled

    const response = await fetch(`${match.url}?v=${Date.now()}`, { cache: 'no-store' })
    if (!response.ok) return bundled

    const remote = (await response.json()) as SiteContent
    return backfillFromBundledDefaults(remote, bundled)
  } catch (error) {
    console.error('Failed to load site content from Blob, falling back to bundled defaults:', error)
    return bundled
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
