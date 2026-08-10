export function RuleDivider({
  orientation = 'horizontal',
  color = 'primary',
  className = '',
}: {
  orientation?: 'horizontal' | 'vertical'
  color?: 'primary' | 'accent'
  className?: string
}) {
  const borderColor = color === 'accent' ? 'border-accent' : 'border-primary/15'

  if (orientation === 'vertical') {
    return <div className={`self-stretch border-l-2 ${borderColor} ${className}`} aria-hidden />
  }

  return <div className={`w-full border-t-2 ${borderColor} ${className}`} aria-hidden />
}
