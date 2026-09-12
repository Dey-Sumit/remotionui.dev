/**
 * The two-line heading from the HeroUI Pro site: a statement in foreground,
 * its completion dropped back to muted. Optional eyebrow above in the accent.
 */
export function SectionHeading({
  eyebrow,
  lead,
  trail,
}: {
  eyebrow?: string
  lead: string
  trail: string
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      {eyebrow ? (
        <p className="text-sm font-medium text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="text-center text-4xl font-medium tracking-[-0.72px] sm:text-5xl">
        <span className="block text-balance">{lead}</span>
        <span className="block text-balance text-muted/60">{trail}</span>
      </h2>
    </div>
  )
}
