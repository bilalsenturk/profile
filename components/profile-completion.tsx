"use client"

import { useProfileStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { useMemo } from "react"

export function ProfileCompletion() {
  const data = useProfileStore((state) => state.data)

  const completionPercentage = useMemo(() => {
    let completed = 0
    const total = 7 // Number of fields/sections to check
    if (data.personalInfo.summary) completed++
    if (data.experiences.length > 0) completed++
    if (data.education.length > 0) completed++
    if (data.skills.length > 0) completed++
    if (data.projects.length > 0) completed++
    if (data.certificates.some((c) => !c.isLocked)) completed++
    if (data.personalInfo.profileImage) completed++

    return Math.round((completed / total) * 100)
  }, [data])

  return (
    <div className="w-full max-w-xs flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Profil Tamamlama</span>
      <Progress value={completionPercentage} className="w-full h-2" />
      <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
    </div>
  )
}
