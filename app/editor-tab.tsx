"use client"

import type React from "react"
import { useProfileStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalInfoForm } from "@/components/editor-sections/personal-info-form"
import { ExperienceForm } from "@/components/editor-sections/experience-form"
import { EducationForm } from "@/components/editor-sections/education-form"
import { CertificatesForm } from "@/components/editor-sections/certificates-form"
import { SkillsForm } from "@/components/editor-sections/skills-form"
import { ProjectsForm } from "@/components/editor-sections/projects-form"
import { LanguagesForm } from "@/components/editor-sections/languages-form"

const WORLD_LANGUAGES = ["English", "Spanish", "French", "German", "Chinese (Mandarin)", "Japanese", "Arabic", "Hindi"]
const PROFICIENCY_LEVELS = ["Native", "Fluent", "Advanced", "Intermediate", "Basic"]
const SKILL_CATEGORIES = [
  "Technical",
  "Programming",
  "Design",
  "Management",
  "Communication",
  "Marketing",
  "Leadership",
]

const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow bg-card">
    <CardHeader className="border-b">
      <CardTitle className="flex items-center gap-3 text-lg text-primary font-semibold">
        {icon} {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">{children}</CardContent>
  </Card>
)

export default function EditorTab() {
  const { data, resumeMode, updatePersonalInfo, updateField, addItem, removeItem } = useProfileStore()

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PersonalInfoForm />
      <CertificatesForm />
      <ExperienceForm />
      <EducationForm />
      <SkillsForm />
      <ProjectsForm />
      <LanguagesForm />
    </div>
  )
}
