'use client'

import { useState } from 'react'
import Image from 'next/image'

export function CourseBannerImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setFailed(true)}
    />
  )
}
