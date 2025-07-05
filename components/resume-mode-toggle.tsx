"use client"

import { useProfileStore } from "@/lib/store"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Wand2 } from "lucide-react"

export function ResumeModeToggle() {
  const { resumeMode, toggleResumeMode } = useProfileStore()

  return (
    <div className="flex items-center space-x-3">
      <Wand2 className={`w-5 h-5 transition-colors ${resumeMode ? "text-primary" : "text-muted-foreground"}`} />
      <Label htmlFor="resume-mode" className="font-semibold text-muted-foreground cursor-pointer">
        {resumeMode ? "CV Modu Aktif" : "Profil Modu"}
      </Label>
      <Switch
        id="resume-mode"
        checked={resumeMode}
        onCheckedChange={toggleResumeMode}
        aria-label="CV modunu aç/kapat"
      />
      <span className="text-xs text-muted-foreground">(Shift + C)</span>
    </div>
  )
}
