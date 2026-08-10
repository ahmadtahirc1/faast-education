export function IndexNumeral({ index, className = '' }: { index: number; className?: string }) {
  const label = String(index + 1).padStart(2, '0')
  return (
    <span
      aria-hidden
      className={`font-[family-name:var(--font-sora)] text-[clamp(3rem,6vw,6rem)] font-bold leading-none text-primary/10 ${className}`}
    >
      {label}
    </span>
  )
}
