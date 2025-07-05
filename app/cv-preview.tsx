"use client"

import React from "react"
import { useResumeData } from "@/lib/store"
import { CVDocument } from "@/components/cv/cv-document"

interface CVPreviewProps {
  template?: string
}

const CVPreviewInternal = ({ template = "modern" }: CVPreviewProps) => {
  const resumeData = useResumeData()

  // You can add a loading state here while resumeData is being hydrated
  if (!resumeData) {
    return <div>Loading Preview...</div>
  }

  return <CVDocument data={resumeData} template={template} />
}

export const CVPreview = React.memo(CVPreviewInternal)
