'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import type { SiteContent } from '@/lib/site-content'
import type { Inquiry } from '@/lib/inquiries'

const defaultAnnouncement: NonNullable<SiteContent['announcement']> = {
  enabled: true,
  title: 'New Admissions Open',
  message: 'Enroll now for the upcoming batch. Limited seats available for MDCAT, NUST NET, NUMS, and other entry test programs.',
  image: '',
  imageAlt: 'Admissions announcement banner',
  ctaText: 'Contact Us',
  ctaUrl: '#contact',
}

const defaultContent: SiteContent = {
  name: 'FAAST Education',
  fullName: 'FAAST Education | Faisalabad',
  tagline: 'Each one Teach one',
  location: '13-C Ali Tower, Jaranwala Road, Near RCG Plaza, Faisalabad, Pakistan',
  locationShort: 'Kohinoor City, Faisalabad, Punjab',
  phone: '03418576000',
  phone2: '03418576000',
  email: 'Faastacademyofficial@gmail.com',
  website: 'www.faasteducation.com',
  facebookUrl: 'https://www.facebook.com/p/FAAST-Education-100064106918760/',
  whatsapp: '923418576000',
  description: 'FAAST Education is a premier educational institution in Faisalabad dedicated to providing advanced coaching and entry test preparation for students of all levels.',
  heroBackground: '',
  heroImages: [],
  founderImage: '',
  announcement: defaultAnnouncement,
  programs: [],
  achievements: {
    rating: '100% recommend',
    reviews: 22,
    facebookLikes: 6020,
    talkingAbout: 123,
    followers: '6K+',
    studentPositions: 'Monthly position holders recognized regularly',
  },
  features: [],
}

export default function AdminClient() {
  const [content, setContent] = useState(defaultContent)
  const [status, setStatus] = useState('')
  const [isHydrated, setIsHydrated] = useState(false)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])

  useEffect(() => {
    fetch('/api/site-content')
      .then((res) => res.json())
      .then((data) => {
        setContent(data)
        setIsHydrated(true)
      })
      .catch(() => setIsHydrated(true))

    fetch('/api/contact')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setInquiries(data))
      .catch(() => setInquiries([]))
  }, [])

  const deleteInquiry = async (id: string) => {
    const res = await fetch(`/api/contact?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    if (res.ok) setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id))
  }

  const programCount = useMemo(() => content.programs?.length ?? 0, [content.programs])

  const persistContent = async (nextContent: typeof content) => {
    setContent(nextContent)

    const res = await fetch('/api/site-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextContent),
    })

    if (res.ok) return true

    try {
      const body = await res.json()
      setStatus(`Unable to save: ${body.error ?? 'unknown error'}`)
    } catch {
      setStatus(`Unable to save (server returned status ${res.status}).`)
    }
    return false
  }

  const handleSave = async () => {
    const ok = await persistContent(content)
    if (ok) setStatus('Content saved successfully.')
  }

  const uploadAndUpdate = async (
    file: File,
    type: 'program' | 'hero' | 'announcement' | 'founder',
    index: number,
  ) => {
    const slot =
      type === 'hero' ? `hero-${content.heroImages?.[index]?.id ?? index}` :
      type === 'founder' ? 'founder' :
      type === 'announcement' ? 'announcement' :
      `program-${content.programs?.[index]?.id ?? index}`

    const formData = new FormData()
    formData.append('file', file)
    formData.append('slot', slot)

    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    let uploaded: { url?: string; error?: string }
    try {
      uploaded = await uploadRes.json()
    } catch {
      setStatus(`Image upload failed (server returned status ${uploadRes.status}).`)
      return
    }

    if (!uploaded.url) {
      setStatus(`Image upload failed: ${uploaded.error ?? 'unknown error'}`)
      return
    }

    let nextContent = content
    let label = 'Image'

    if (type === 'program') {
      const next = [...(content.programs ?? [])]
      next[index] = { ...next[index], image: uploaded.url }
      nextContent = { ...content, programs: next }
      label = 'Course image'
    } else if (type === 'hero') {
      const next = [...(content.heroImages ?? [])]
      next[index] = { ...next[index], src: uploaded.url }
      nextContent = { ...content, heroImages: next }
      label = 'Hero image'
    } else if (type === 'founder') {
      nextContent = { ...content, founderImage: uploaded.url }
      label = 'Founder photo'
    } else {
      nextContent = {
        ...content,
        announcement: { ...(content.announcement ?? defaultAnnouncement), image: uploaded.url },
      }
      label = 'Announcement image'
    }

    const ok = await persistContent(nextContent)
    if (ok) setStatus(`${label} updated and saved.`)
  }

  const addProgram = () => {
    setContent((prev) => ({
      ...prev,
      programs: [
        ...(prev.programs ?? []),
        {
          id: `program-${Date.now()}`,
          name: 'New Course',
          shortName: 'New',
          icon: 'Target',
          tagline: 'Add a short tagline',
          description: 'Add a description',
          details: ['Detail 1'],
          duration: '1 Month',
          timing: 'Flexible',
          level: 'All Levels',
          color: 'primary',
          image: '',
        },
      ],
    }))
  }

  const addHeroImage = () => {
    setContent((prev) => ({
      ...prev,
      heroImages: [
        ...(prev.heroImages ?? []),
        { id: `hero-${Date.now()}`, src: '' },
      ],
    }))
  }

  const removeHeroImage = (index: number) => {
    setContent((prev) => ({
      ...prev,
      heroImages: (prev.heroImages ?? []).filter((_, i) => i !== index),
    }))
  }

  const moveHeroImage = (index: number, direction: -1 | 1) => {
    setContent((prev) => {
      const next = [...(prev.heroImages ?? [])]
      const target = index + direction
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return { ...prev, heroImages: next }
    })
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.reload()
  }

  if (!isHydrated) {
    return <div className="min-h-screen flex items-center justify-center">Loading admin panel...</div>
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">FAAST Admin Dashboard</h1>
              <p className="text-slate-300">Update program cards and site content for your client.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
              >
                Save Changes
              </button>
              <button
                onClick={logout}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-slate-200"
              >
                Logout
              </button>
            </div>
          </div>

          {status && <div className="mt-4 text-sm text-emerald-300">{status}</div>}
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Inquiries</div>
            <div className="mt-2 text-3xl font-bold">{inquiries.length}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Courses</div>
            <div className="mt-2 text-3xl font-bold">{programCount}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Status</div>
            <div className="mt-2 text-lg font-semibold text-emerald-300">Protected</div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Contact Form Inquiries</h2>
          </div>

          {inquiries.length === 0 ? (
            <p className="text-slate-400 text-sm">No submissions yet.</p>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="rounded-xl border border-white/10 bg-slate-800 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-white">{inquiry.name}</div>
                      <div className="text-sm text-slate-300">
                        <a href={`tel:${inquiry.phone}`} className="hover:underline">{inquiry.phone}</a>
                        {inquiry.email && (
                          <>
                            {' · '}
                            <a href={`mailto:${inquiry.email}`} className="hover:underline">{inquiry.email}</a>
                          </>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-blue-300">{inquiry.program}</div>
                      {inquiry.message && (
                        <p className="mt-2 text-sm text-slate-300 max-w-2xl">{inquiry.message}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-xs text-slate-500">
                        {new Date(inquiry.createdAt).toLocaleString()}
                      </span>
                      <button
                        onClick={() => deleteInquiry(inquiry.id)}
                        className="rounded-lg border border-red-400/40 px-3 py-1 text-xs text-red-300 hover:bg-red-400/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Hero Images</h2>
            <button
              onClick={addHeroImage}
              className="rounded-lg border border-blue-400 px-3 py-2 text-sm text-blue-300"
            >
              Add Hero Image
            </button>
          </div>
          <p className="mb-4 text-sm text-slate-400">
            The homepage banner rotates through these images. We recommend 3-6 wide/landscape photos.
          </p>

          {(content.heroImages ?? []).length === 0 ? (
            <p className="text-slate-400 text-sm">No hero images yet - add one to get started.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(content.heroImages ?? []).map((heroImage, index) => (
                <div key={heroImage.id} className="rounded-xl border border-white/10 bg-slate-800 p-4">
                  <div className="relative mb-3 h-40 overflow-hidden rounded-lg bg-slate-700 flex items-center justify-center">
                    {heroImage.src ? (
                      <Image src={heroImage.src} alt={`Hero image ${index + 1}`} fill className="object-cover" />
                    ) : (
                      <span className="text-sm text-slate-400">No image yet</span>
                    )}
                  </div>
                  <label className="mb-2 block text-sm text-slate-300">Upload image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) uploadAndUpdate(file, 'hero', index)
                    }}
                    className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                  />
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveHeroImage(index, -1)}
                        disabled={index === 0}
                        className="rounded-lg border border-white/20 px-3 py-1 text-xs text-slate-200 disabled:opacity-30"
                      >
                        Move Up
                      </button>
                      <button
                        onClick={() => moveHeroImage(index, 1)}
                        disabled={index === (content.heroImages ?? []).length - 1}
                        className="rounded-lg border border-white/20 px-3 py-1 text-xs text-slate-200 disabled:opacity-30"
                      >
                        Move Down
                      </button>
                    </div>
                    <button
                      onClick={() => removeHeroImage(index)}
                      className="rounded-lg border border-red-400/40 px-3 py-1 text-xs text-red-300 hover:bg-red-400/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Announcement</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm text-slate-300">Announcement Enabled</span>
              <select
                value={content.announcement?.enabled ? 'true' : 'false'}
                onChange={(e) =>
                  setContent({
                    ...content,
                    announcement: {
                      ...(content.announcement ?? defaultAnnouncement),
                      enabled: e.target.value === 'true',
                    },
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">Announcement Image Path</span>
              <input
                value={content.announcement?.image ?? ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    announcement: { ...(content.announcement ?? defaultAnnouncement), image: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">Upload Announcement Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) uploadAndUpdate(file, 'announcement', 0)
                }}
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
              />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-sm text-slate-300">Announcement Title</span>
              <input
                value={content.announcement?.title ?? ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    announcement: { ...(content.announcement ?? defaultAnnouncement), title: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
              />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-sm text-slate-300">Announcement Message</span>
              <textarea
                value={content.announcement?.message ?? ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    announcement: { ...(content.announcement ?? defaultAnnouncement), message: e.target.value },
                  })
                }
                className="min-h-24 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">CTA Text</span>
              <input
                value={content.announcement?.ctaText ?? ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    announcement: { ...(content.announcement ?? defaultAnnouncement), ctaText: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">CTA Link</span>
              <input
                value={content.announcement?.ctaUrl ?? ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    announcement: { ...(content.announcement ?? defaultAnnouncement), ctaUrl: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Founder</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm text-slate-300">Founder Photo Path</span>
              <input
                value={content.founderImage ?? ''}
                onChange={(e) => setContent({ ...content, founderImage: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">Upload Founder Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) uploadAndUpdate(file, 'founder', 0)
                }}
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Courses</h2>
            <button
              onClick={addProgram}
              className="rounded-lg border border-blue-400 px-3 py-2 text-sm text-blue-300"
            >
              Add Course
            </button>
          </div>

          <div className="space-y-4">
            {(content.programs ?? []).map((program, index) => (
              <div key={program.id} className="rounded-xl border border-white/10 bg-slate-800 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-sm text-slate-300">Course Name</span>
                    <input
                      value={program.name}
                      onChange={(e) => {
                        const next = [...(content.programs ?? [])]
                        next[index] = { ...program, name: e.target.value }
                        setContent({ ...content, programs: next })
                      }}
                      className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-sm text-slate-300">Image Path</span>
                    <input
                      value={program.image}
                      onChange={(e) => {
                        const next = [...(content.programs ?? [])]
                        next[index] = { ...program, image: e.target.value }
                        setContent({ ...content, programs: next })
                      }}
                      className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                    />
                  </label>
                  <label className="space-y-1 md:col-span-2">
                    <span className="text-sm text-slate-300">Description</span>
                    <textarea
                      value={program.description}
                      onChange={(e) => {
                        const next = [...(content.programs ?? [])]
                        next[index] = { ...program, description: e.target.value }
                        setContent({ ...content, programs: next })
                      }}
                      className="min-h-24 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                    />
                  </label>
                  <label className="space-y-1 md:col-span-2">
                    <span className="text-sm text-slate-300">Upload new image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          uploadAndUpdate(file, 'program', index)
                        }
                      }}
                      className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
