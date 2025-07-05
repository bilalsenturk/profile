"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Copy, RefreshCw, Wand2, FileText, Briefcase, Star, Award } from "lucide-react"

interface AIContentGeneratorProps {
  onContentGenerated: (content: string, type: string) => void
}

export default function AIContentGenerator({ onContentGenerated }: AIContentGeneratorProps) {
  const [selectedType, setSelectedType] = useState("summary")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [customPrompt, setCustomPrompt] = useState("")
  const [selectedTone, setSelectedTone] = useState("professional")
  const [selectedLength, setSelectedLength] = useState("medium")

  const contentTypes = [
    { id: "summary", label: "Professional Summary", icon: FileText },
    { id: "experience", label: "Job Description", icon: Briefcase },
    { id: "skills", label: "Skills Description", icon: Star },
    { id: "achievement", label: "Achievement Statement", icon: Award },
  ]

  const tones = [
    { id: "professional", label: "Professional" },
    { id: "confident", label: "Confident" },
    { id: "creative", label: "Creative" },
    { id: "technical", label: "Technical" },
    { id: "friendly", label: "Friendly" },
  ]

  const lengths = [
    { id: "short", label: "Short (50-100 words)" },
    { id: "medium", label: "Medium (100-200 words)" },
    { id: "long", label: "Long (200-300 words)" },
  ]

  const generateContent = async () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const content = mockGenerateContent(selectedType, selectedTone, selectedLength, customPrompt)
    setGeneratedContent(content)
    setIsGenerating(false)
  }

  const mockGenerateContent = (type: string, tone: string, length: string, prompt: string) => {
    const templates = {
      summary: {
        professional: {
          short:
            "Results-driven professional with 5+ years of experience in software development. Proven track record of delivering high-quality solutions and leading cross-functional teams. Expertise in modern technologies and agile methodologies.",
          medium:
            "Accomplished software engineer with over 5 years of experience developing scalable web applications and leading technical initiatives. Demonstrated expertise in full-stack development, cloud technologies, and agile project management. Proven ability to collaborate effectively with cross-functional teams and deliver innovative solutions that drive business growth. Passionate about leveraging cutting-edge technologies to solve complex problems and optimize user experiences.",
          long: "Highly motivated and results-oriented software engineer with 5+ years of comprehensive experience in full-stack web development, cloud architecture, and team leadership. Proven track record of successfully delivering complex projects from conception to deployment, with expertise in modern JavaScript frameworks, microservices architecture, and DevOps practices. Demonstrated ability to lead cross-functional teams, mentor junior developers, and drive technical innovation while maintaining focus on business objectives. Strong background in agile methodologies, continuous integration, and performance optimization. Passionate about creating scalable, maintainable solutions that enhance user experience and drive organizational success.",
        },
        confident: {
          short:
            "Dynamic technology leader with a proven ability to transform ideas into successful products. Expert in cutting-edge development practices with a track record of exceeding project goals and driving innovation.",
          medium:
            "Visionary software engineer who consistently delivers exceptional results through innovative problem-solving and technical excellence. With 5+ years of hands-on experience, I've successfully led multiple high-impact projects, mentored development teams, and implemented solutions that have generated significant business value. My expertise spans the full technology stack, from frontend user experiences to backend infrastructure and cloud deployment.",
          long: "Accomplished technology professional with an exceptional track record of turning complex challenges into breakthrough solutions. Over the past 5+ years, I've established myself as a go-to expert for high-stakes projects, consistently delivering results that exceed expectations and drive measurable business impact. My comprehensive skill set encompasses advanced full-stack development, cloud architecture, and strategic technical leadership. I excel at building and mentoring high-performing teams while maintaining hands-on involvement in critical development initiatives. Known for my ability to bridge the gap between technical complexity and business objectives, I've successfully launched multiple products that have transformed user experiences and generated substantial revenue growth.",
        },
      },
      experience: {
        professional: {
          medium:
            "Led development of a comprehensive e-commerce platform serving 100K+ users, resulting in 40% increase in conversion rates. Collaborated with cross-functional teams including design, product, and marketing to deliver features on schedule. Implemented automated testing and CI/CD pipelines, reducing deployment time by 60%. Mentored 3 junior developers and established coding standards that improved code quality and maintainability.",
        },
      },
      skills: {
        professional: {
          medium:
            "Proficient in modern web technologies including React, Node.js, and TypeScript, with extensive experience building scalable applications. Strong background in cloud platforms (AWS, Azure) and containerization technologies (Docker, Kubernetes). Experienced in database design and optimization (PostgreSQL, MongoDB). Skilled in agile development practices, test-driven development, and continuous integration/deployment workflows.",
        },
      },
      achievement: {
        professional: {
          medium:
            "Architected and implemented a microservices-based system that improved application performance by 50% and reduced server costs by 30%. Led a team of 5 developers through the migration process, ensuring zero downtime during the transition. The new architecture now serves as the foundation for all new product features and has enabled the company to scale to 10x more users.",
        },
      },
    }

    const typeTemplates = templates[type as keyof typeof templates] || templates.summary
    const toneTemplates = typeTemplates[tone as keyof typeof typeTemplates] || typeTemplates.professional
    const content = toneTemplates[length as keyof typeof toneTemplates] || toneTemplates.medium

    // If custom prompt is provided, modify the content
    if (prompt) {
      return `${content}\n\nCustomized for: ${prompt}`
    }

    return content
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
  }

  const applyContent = () => {
    onContentGenerated(generatedContent, selectedType)
  }

  const regenerateContent = () => {
    generateContent()
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="w-5 h-5 text-green-600" />
          AI Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList className="grid w-full grid-cols-4">
            {contentTypes.map((type) => (
              <TabsTrigger key={type.id} value={type.id} className="text-xs">
                <type.icon className="w-3 h-3 mr-1" />
                {type.label.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {contentTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tone</label>
                  <Select value={selectedTone} onValueChange={setSelectedTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((tone) => (
                        <SelectItem key={tone.id} value={tone.id}>
                          {tone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Length</label>
                  <Select value={selectedLength} onValueChange={setSelectedLength}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {lengths.map((length) => (
                        <SelectItem key={length.id} value={length.id}>
                          {length.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={generateContent}
                    disabled={isGenerating}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Custom Instructions (Optional)</label>
                <Textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={`Add specific details for your ${type.label.toLowerCase()}...`}
                  rows={2}
                  className="text-sm"
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {generatedContent && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Generated Content:</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={regenerateContent} disabled={isGenerating}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button size="sm" onClick={applyContent} className="bg-blue-600 hover:bg-blue-700">
                  Apply to CV
                </Button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-gray-700 leading-relaxed text-sm">{generatedContent}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                {selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)} Tone
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {selectedLength.charAt(0).toUpperCase() + selectedLength.slice(1)} Length
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {contentTypes.find((t) => t.id === selectedType)?.label}
              </Badge>
            </div>
          </div>
        )}

        {/* Content Examples */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Content Generation Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be specific in your custom instructions for better results</li>
            <li>• Try different tones to match your industry and role</li>
            <li>• Use the regenerate button to get alternative versions</li>
            <li>• Combine generated content with your personal touch</li>
            <li>• Review and edit the content to ensure accuracy</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
