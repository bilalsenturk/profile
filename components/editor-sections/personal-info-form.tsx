"use client"

import type React from "react"

import { useProfileStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { User, Upload } from "lucide-react"
import { SectionCard } from "./section-card"

export function PersonalInfoForm() {
  const { data, resumeMode, updatePersonalInfo } = useProfileStore()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        updatePersonalInfo("profileImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <SectionCard title="Personal Information" icon={<User className="w-5 h-5" />}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
            {data.personalInfo.profileImage ? (
              <img
                src={data.personalInfo.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-slate-400" />
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="profile-upload" />
          <Button variant="outline" onClick={() => document.getElementById("profile-upload")?.click()}>
            <Upload className="w-4 h-4 mr-2" /> Upload Photo
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={data.personalInfo.firstName}
              onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={data.personalInfo.lastName}
              onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
            />
          </div>
        </div>
        {resumeMode && (
          <div className="pt-4 border-t space-y-6">
            <h3 className="text-md font-semibold text-muted-foreground">CV-Specific Information</h3>
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={data.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                rows={5}
                placeholder="A brief, powerful summary for your CV."
              />
            </div>
            <div>
              <Label htmlFor="hobbies">Hobbies & Interests</Label>
              <Input
                id="hobbies"
                value={data.personalInfo.hobbies}
                onChange={(e) => updatePersonalInfo("hobbies", e.target.value)}
                placeholder="e.g., Chess, Photography, Hiking"
              />
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  )
}
