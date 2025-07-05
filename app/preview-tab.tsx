"use client"

import type { Dispatch, SetStateAction } from "react"
import TemplateSelector from "@/components/template-selector"
import { CVPreview } from "./cv-preview"

interface PreviewTabProps {
  activeTemplate: string
  setActiveTemplate: Dispatch<SetStateAction<string>>
}

export default function PreviewTab({ activeTemplate, setActiveTemplate }: PreviewTabProps) {
  return (
    <div className="w-full space-y-12">
      <TemplateSelector selectedTemplate={activeTemplate} onTemplateSelect={setActiveTemplate} />

      <div className="flex justify-center items-start px-4" style={{ perspective: "1000px" }}>
        <div className="w-full max-w-4xl transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-2">
          <div className="shadow-2xl rounded-lg overflow-hidden">
            <CVPreview template={activeTemplate} />
          </div>
        </div>
      </div>
    </div>
  )
}
