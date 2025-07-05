// This is a placeholder for the projects form.
"use client"
import { Code } from "lucide-react"
import { SectionCard } from "./section-card"

export function ProjectsForm() {
  return (
    <SectionCard title="Projects" icon={<Code className="w-5 h-5" />}>
      <p className="text-muted-foreground">Projects form will be implemented here.</p>
    </SectionCard>
  )
}
