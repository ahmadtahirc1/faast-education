export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">
      <span className="h-px w-8 bg-accent" aria-hidden />
      {children}
    </span>
  )
}
