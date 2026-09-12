export function RemotionUIMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" className="fill-foreground" />
      <path d="M9.5 7.75v8.5L16 12l-6.5-4.25Z" className="fill-background" />
    </svg>
  )
}
