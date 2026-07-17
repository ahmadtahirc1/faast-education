import { NextResponse } from 'next/server'
import { isAdminCredentialsValid, setAdminSessionCookie } from '@/lib/admin-auth'

export async function POST(request: Request) {
  const body = await request.json()

  if (!isAdminCredentialsValid(body.username, body.password)) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  await setAdminSessionCookie()
  return NextResponse.json({ success: true })
}
