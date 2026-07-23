import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { addInquiry, deleteInquiry, getInquiries } from '@/lib/inquiries'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const inquiries = await getInquiries()
  return NextResponse.json(inquiries)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, phone, email, program, message } = body ?? {}

  if (!name || !phone || !program) {
    return NextResponse.json({ error: 'Name, phone, and course are required.' }, { status: 400 })
  }

  try {
    const inquiry = await addInquiry({
      name: String(name).slice(0, 200),
      phone: String(phone).slice(0, 50),
      email: email ? String(email).slice(0, 200) : undefined,
      program: String(program).slice(0, 200),
      message: message ? String(message).slice(0, 2000) : undefined,
    })
    return NextResponse.json({ success: true, inquiry })
  } catch (error) {
    console.error('Failed to save inquiry:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  try {
    await deleteInquiry(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete inquiry:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
