"use client"

import { useRouter } from "next/navigation"
import { Button } from "@heroui/react"
import { SectionHeading } from "@/components/site/section-heading"

export function CtaBand({ count }: { count: number }) {
  const router = useRouter()

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-5 pb-32 sm:px-8">
      <SectionHeading
        lead={`${count} components, no design system.`}
        trail="Nothing to theme around."
      />
      <Button size="lg" onPress={() => router.push("/components")}>
        Browse components
      </Button>
    </section>
  )
}
