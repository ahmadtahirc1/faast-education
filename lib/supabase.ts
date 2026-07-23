import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY

export const MEDIA_BUCKET = 'faast-media'

export function getSupabaseServerClient() {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) return null

  return createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  })
}
