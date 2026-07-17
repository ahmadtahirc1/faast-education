import { promises as fs } from 'fs'
import path from 'path'

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
    image: string
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
    image: string
    icon: string
  }>
  galleryImages?: Array<{
    src: string
    title: string
  }>
}

const contentPath = path.join(process.cwd(), 'data', 'academy.json')

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, 'utf8')
  return JSON.parse(raw) as SiteContent
}

export async function saveSiteContent(content: SiteContent) {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf8')
}
