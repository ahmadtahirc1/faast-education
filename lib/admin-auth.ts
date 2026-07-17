import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const ADMIN_COOKIE_NAME = 'faast_admin_session'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME?.trim()
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD?.trim()
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET?.trim()

export function createAdminSessionToken() {
  if (!SESSION_SECRET) return ''

  const payload = JSON.stringify({ role: 'admin', ts: Date.now() })
  const signature = createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
  return Buffer.from(`${payload}.${signature}`).toString('base64url')
}

export function verifyAdminSessionToken(token: string) {
  if (!SESSION_SECRET || !token) return false

  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8')
    const [payload, signature] = decoded.split('.')

    if (!payload || !signature) return false

    const expected = createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
    const a = Buffer.from(signature)
    const b = Buffer.from(expected)

    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export function isAdminCredentialsValid(username: string, password: string) {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !SESSION_SECRET) return false
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value

  if (!token) return false
  return verifyAdminSessionToken(token)
}

export async function setAdminSessionCookie() {
  if (!SESSION_SECRET) return

  const cookieStore = await cookies()
  const token = createAdminSessionToken()
  if (!token) return

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}
