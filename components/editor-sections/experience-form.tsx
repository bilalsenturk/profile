"use client"

import { useProfileStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Briefcase, Plus, Trash2 } from "lucide-react"
import { SectionCard } from "./section-card"

export function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } = useProfileStore()

  return (
    <SectionCard title="Work Experience" icon={<Briefcase className="w-5 h-5" />}>
      <div className="space-y-6">
        {data.experiences.map((exp, index) => (
          <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative bg-background">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-slate-500 hover:text-red-600"
              onClick={() => removeExperience(exp.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor={`position-${exp.id}`}>Position</Label>
                <Input
                  id={`position-${exp.id}`}
                  value={exp.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                <Input
                  id={`company-${exp.id}`}
                  value={exp.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Switch
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) => updateExperience(index, "current", checked)}
              />
              <Label htmlFor={`current-${exp.id}`}>I am currently working in this role</Label>
            </div>
            <div>
              <Label htmlFor={`description-${exp.id}`}>Description</Label>
              <Textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) => updateExperience(index, "description", e.target.value)}
              />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addExperience}>
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </Button>
      </div>
    </SectionCard>
  )
}
