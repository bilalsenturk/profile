// This is a placeholder for the languages form.
"use client"
import { Languages } from "lucide-react"
import { SectionCard } from "./section-card"

export function LanguagesForm() {
  return (
    <SectionCard title="Languages" icon={<Languages className="w-5 h-5" />}>
      <p className="text-muted-foreground">Languages form will be implemented here.</p>
    </SectionCard>
  )
}
