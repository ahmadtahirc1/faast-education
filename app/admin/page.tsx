import { isAdminAuthenticated } from '@/lib/admin-auth'
import AdminLogin from '@/components/admin-login'
import AdminClient from '@/components/admin-client'

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return <AdminClient />
}
