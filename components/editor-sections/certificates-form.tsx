"use client"

import { useProfileStore } from "@/lib/store"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Award, Lock, Unlock, BadgeCheck } from "lucide-react"
import { SectionCard } from "./section-card"

export function CertificatesForm() {
  const { data, updateCertificate } = useProfileStore()

  return (
    <SectionCard title="Certificates" icon={<Award className="w-5 h-5" />}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          These are the certificates you have earned or can unlock. Unlocked certificates will be prominently displayed
          on your CV.
        </p>
        <div className="space-y-6">
          {data.certificates.map((cert, index) => (
            <div
              key={cert.id}
              className={`p-4 border rounded-lg flex gap-6 items-start relative transition-all ${
                cert.isLocked
                  ? "bg-slate-50 dark:bg-slate-800/50"
                  : "bg-green-50/50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
              }`}
            >
              <div className="absolute top-3 right-3">
                {cert.isLocked ? (
                  <Badge variant="secondary" className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> Locked
                  </Badge>
                ) : (
                  <Badge variant="default" className="bg-primary hover:bg-primary/90 flex items-center gap-1.5">
                    <Unlock className="w-3 h-3" /> Unlocked
                  </Badge>
                )}
              </div>
              <img
                src={cert.imageUrl || "/placeholder.svg"}
                alt={`${cert.name} certificate`}
                className="w-28 h-20 object-cover rounded-md border-2 border-slate-200 dark:border-slate-700 mt-1"
              />
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-card-foreground">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Issued by {cert.issuer} • {cert.date}
                  </p>
                </div>
                {cert.isVerified && !cert.isLocked && (
                  <Badge variant="outline" className="border-primary text-primary flex items-center gap-1.5 w-fit">
                    <BadgeCheck className="w-4 h-4" /> Verified
                  </Badge>
                )}
                <div>
                  <Label htmlFor={`description-${cert.id}`} className="text-sm font-semibold">
                    What I learned
                  </Label>
                  <Textarea
                    id={`description-${cert.id}`}
                    value={cert.description}
                    onChange={(e) => updateCertificate(index, "description", e.target.value)}
                    rows={3}
                    placeholder="Describe what you learned..."
                    disabled={cert.isLocked}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}
