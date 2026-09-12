import { Card } from "@heroui/react"

const steps = [
  {
    n: "01",
    title: "Pick a Component",
    body: "Browse the catalog, watch it play, read the source before you commit to it.",
  },
  {
    n: "02",
    title: "Run One Command",
    body: "The shadcn CLI copies the file into your project and adds remotion if it is missing.",
  },
  {
    n: "03",
    title: "Own the Code",
    body: "It is plain Remotion in your repo. Change the springs, the colours, anything.",
  },
]

export function HowItWorks() {
  return (
    <div className="grid gap-5 pt-14 sm:grid-cols-3">
      {steps.map((s) => (
        <Card key={s.n}>
          <Card.Content className="flex flex-col items-start gap-2">
            <span className="font-mono text-xs tabular-nums text-accent">{s.n}</span>
            <Card.Title className="text-sm">{s.title}</Card.Title>
            <Card.Description className="text-pretty text-sm leading-relaxed">
              {s.body}
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </div>
  )
}
