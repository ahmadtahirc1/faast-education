export function DecorativeBlobs({ variant = 'primary' }: { variant?: 'primary' | 'accent' }) {
  const color = variant === 'accent' ? 'bg-accent' : 'bg-primary'
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className={`absolute -top-24 -right-24 h-72 w-72 rounded-full ${color}/10 blur-3xl`} />
      <div className={`absolute -bottom-24 -left-24 h-72 w-72 rounded-full ${color}/5 blur-3xl`} />
    </div>
  )
}
