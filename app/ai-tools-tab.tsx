"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import AIAssistant from "./ai-assistant"
import AIContentGenerator from "./ai-content-generator"
import ATSAnalyzer from "./ats-analyzer"
import QRCodeGenerator from "../components/qr-code-generator"
import { Brain, Zap, FileText, QrCode } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

interface AiToolsTabProps {
  profileData: any
  setProfileData: Dispatch<SetStateAction<any>>
}

const aiTools = [
  { id: "assistant", name: "AI Career Assistant", icon: Brain, component: AIAssistant },
  { id: "generator", name: "AI Content Generator", icon: Zap, component: AIContentGenerator },
  { id: "analyzer", name: "ATS Analyzer", icon: FileText, component: ATSAnalyzer },
  { id: "qr", name: "QR Code Generator", icon: QrCode, component: QRCodeGenerator },
]

export default function AiToolsTab({ profileData, setProfileData }: AiToolsTabProps) {
  const [activeTool, setActiveTool] = useState("assistant")

  const handleContentGenerated = (content: string, type: string) => {
    if (type === "summary") {
      setProfileData((prev: any) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, summary: content },
      }))
    }
  }

  const handleParsedContent = (parsedData: any) => {
    setProfileData((prev: any) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...parsedData.personalInfo },
      experiences: [...prev.experiences, ...parsedData.experiences],
      education: [...prev.education, ...parsedData.education],
      skills: [...prev.skills, ...parsedData.skills],
    }))
  }

  const activeToolDetails = aiTools.find((tool) => tool.id === activeTool)
  const ActiveToolComponent = activeToolDetails?.component

  const getComponentProps = (toolId: string) => {
    switch (toolId) {
      case "assistant":
        return { profileData, onSuggestion: () => {} }
      case "generator":
        return { onContentGenerated: handleContentGenerated }
      case "analyzer":
        return { profileData }
      case "qr":
        return { cvUrl: "https://example.com", profileData }
      default:
        return {}
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <ToggleGroup
          type="single"
          value={activeTool}
          onValueChange={(value) => {
            if (value) setActiveTool(value)
          }}
          className="flex-wrap justify-center"
        >
          {aiTools.map((tool) => (
            <ToggleGroupItem key={tool.id} value={tool.id} className="flex items-center gap-2 px-4 py-2 h-12 text-base">
              <tool.icon className="w-5 h-5" />
              {tool.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <Card className="min-h-[60vh] max-w-4xl mx-auto">
        {activeToolDetails && (
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-3 text-primary text-xl">
              <activeToolDetails.icon className="w-6 h-6" />
              {activeToolDetails.name}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-6">
          {ActiveToolComponent && <ActiveToolComponent {...getComponentProps(activeTool)} />}
        </CardContent>
      </Card>
    </div>
  )
}
