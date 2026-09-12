"use client"

import { useRouter } from "next/navigation"
import { Button } from "@heroui/react"

export function BrowseButton() {
  const router = useRouter()
  return (
    <Button variant="secondary" onPress={() => router.push("/components")}>
      Browse components
    </Button>
  )
}
