/**
 * The glass preset ships an ambient gradient token but never paints it. It is a
 * marketing flourish, so it is scoped to the landing page instead of the body —
 * docs routes sit on the plain HeroUI background.
 *
 * Negative z-index paints above the canvas background but below page content.
 */
export function AmbientGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[image:var(--background-gradient)] bg-cover bg-no-repeat"
    />
  )
}
