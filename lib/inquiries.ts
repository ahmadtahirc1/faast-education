import { getSupabaseServerClient } from './supabase'

export type Inquiry = {
  id: string
  name: string
  phone: string
  email?: string
  program: string
  message?: string
  createdAt: string
}

type InquiryRow = {
  id: string
  name: string
  phone: string
  email: string | null
  program: string
  message: string | null
  created_at: string
}

function fromRow(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    program: row.program,
    message: row.message ?? undefined,
    createdAt: row.created_at,
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return (data as InquiryRow[]).map(fromRow)
}

export async function addInquiry(entry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    throw new Error('Supabase is not configured (missing SUPABASE_URL/SUPABASE_SECRET_KEY).')
  }

  const { data, error } = await supabase
    .from('inquiries')
    .insert({
      name: entry.name,
      phone: entry.phone,
      email: entry.email ?? null,
      program: entry.program,
      message: entry.message ?? null,
    })
    .select()
    .single()

  if (error || !data) throw new Error(error?.message ?? 'Failed to save inquiry')
  return fromRow(data as InquiryRow)
}

export async function deleteInquiry(id: string): Promise<void> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    throw new Error('Supabase is not configured (missing SUPABASE_URL/SUPABASE_SECRET_KEY).')
  }

  const { error } = await supabase.from('inquiries').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
