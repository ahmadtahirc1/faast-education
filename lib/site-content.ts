import { promises as fs } from 'fs'
import path from 'path'
import { getSupabaseServerClient } from './supabase'

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
  const supabase = getSupabaseServerClient()
  if (!supabase) return bundled

  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('id', 1)
      .maybeSingle()

    if (error || !data) return bundled

    return backfillFromBundledDefaults(data.data as SiteContent, bundled)
  } catch (error) {
    console.error('Failed to load site content from Supabase, falling back to bundled defaults:', error)
    return bundled
  }
}

export async function saveSiteContent(content: SiteContent) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    throw new Error('Supabase is not configured (missing SUPABASE_URL/SUPABASE_SECRET_KEY).')
  }

  const { error } = await supabase
    .from('site_content')
    .upsert({ id: 1, data: content, updated_at: new Date().toISOString() })

  if (error) throw new Error(error.message)
}
