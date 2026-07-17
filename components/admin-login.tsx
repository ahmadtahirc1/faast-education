'use client'

import { FormEvent, useState } from 'react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      window.location.reload()
      return
    }

    setError('Invalid username or password. Please try again.')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-xl">
        <h1 className="mb-2 text-2xl font-bold">Admin Access</h1>
        <p className="mb-6 text-sm text-slate-300">Enter the admin email and password to manage FAAST content.</p>

        <label className="mb-2 block text-sm text-slate-300">Email</label>
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
          placeholder="Enter admin email"
        />

        <label className="mb-2 mt-4 block text-sm text-slate-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
          placeholder="Enter password"
        />

        {error && <div className="mt-3 text-sm text-rose-300">{error}</div>}

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
        >
          Access Admin Panel
        </button>
      </form>
    </main>
  )
}
