"use client"

import { useProfileStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { GraduationCap, Plus, Trash2 } from "lucide-react"
import { SectionCard } from "./section-card"

export function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useProfileStore()

  return (
    <SectionCard title="Education" icon={<GraduationCap className="w-5 h-5" />}>
      <div className="space-y-6">
        {data.education.map((edu, index) => (
          <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative bg-background">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-slate-500 hover:text-red-600"
              onClick={() => removeEducation(edu.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                <Input
                  id={`field-${edu.id}`}
                  value={edu.field}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
              <Input
                id={`institution-${edu.id}`}
                value={edu.institution}
                onChange={(e) => updateEducation(index, "institution", e.target.value)}
              />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addEducation}>
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </div>
    </SectionCard>
  )
}
