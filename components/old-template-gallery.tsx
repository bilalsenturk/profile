"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Eye, Palette, Star } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
  features: string[]
  color: string
  popular?: boolean
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean, contemporary design with blue accents and structured layout",
    category: "Professional",
    preview: "/placeholder.svg?height=300&width=200&text=Modern+Template",
    features: ["Clean typography", "Blue color scheme", "Structured sections", "ATS-friendly"],
    color: "bg-blue-500",
    popular: true,
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional, formal design perfect for corporate environments",
    category: "Traditional",
    preview: "/placeholder.svg?height=300&width=200&text=Classic+Template",
    features: ["Traditional layout", "Serif fonts", "Formal structure", "Corporate style"],
    color: "bg-gray-700",
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Bold, colorful design for creative professionals and designers",
    category: "Creative",
    preview: "/placeholder.svg?height=300&width=200&text=Creative+Template",
    features: ["Vibrant colors", "Creative layout", "Visual elements", "Portfolio focus"],
    color: "bg-purple-500",
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Ultra-clean, minimalist design with maximum white space",
    category: "Minimal",
    preview: "/placeholder.svg?height=300&width=200&text=Minimal+Template",
    features: ["Minimal design", "Lots of whitespace", "Simple typography", "Clean lines"],
    color: "bg-green-500",
    popular: true,
  },
  {
    id: "tech",
    name: "Tech Innovator",
    description: "Modern tech-focused design with dark theme and neon accents",
    category: "Technology",
    preview: "/placeholder.svg?height=300&width=200&text=Tech+Template",
    features: ["Dark theme", "Tech aesthetics", "Modern fonts", "Neon accents"],
    color: "bg-cyan-500",
  },
  {
    id: "academic",
    name: "Academic Scholar",
    description: "Professional academic template with publication focus",
    category: "Academic",
    preview: "/placeholder.svg?height=300&width=200&text=Academic+Template",
    features: ["Academic layout", "Publication focus", "Research emphasis", "Professional tone"],
    color: "bg-indigo-500",
  },
]

interface TemplateGalleryProps {
  selectedTemplate: string
  onTemplateSelect: (templateId: string) => void
  onPreviewTemplate?: (templateId: string) => void
}

export default function TemplateGallery({
  selectedTemplate,
  onTemplateSelect,
  onPreviewTemplate,
}: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(templates.map((t) => t.category)))]

  const filteredTemplates =
    selectedCategory === "All" ? templates : templates.filter((t) => t.category === selectedCategory)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="text-2xl flex items-center gap-3">
          <Palette className="w-7 h-7" />
          Choose Your CV Template
        </CardTitle>
        <p className="text-blue-100">Select from our professionally designed templates to make your CV stand out</p>
      </CardHeader>
      <CardContent className="p-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedTemplate === template.id ? "ring-2 ring-blue-500 shadow-xl scale-105" : "hover:shadow-lg"
              }`}
            >
              <CardContent className="p-0">
                {/* Template Preview */}
                <div className="relative">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={`${template.name} preview`}
                    className="w-full h-48 object-cover rounded-t-lg bg-gray-100"
                  />

                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <div className={`${template.color} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                      {template.category}
                    </div>
                    {template.popular && (
                      <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Selection indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-2">
                      <Check className="w-4 h-4" />
                    </div>
                  )}

                  {/* Preview overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                      {onPreviewTemplate && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            onPreviewTemplate(template.id)
                          }}
                          size="sm"
                          className="bg-white text-gray-900 hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.features.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {template.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.features.length - 2} more
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => onTemplateSelect(template.id)}
                    className={`w-full ${
                      selectedTemplate === template.id
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    {selectedTemplate === template.id ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      "Select Template"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Template Info */}
        {selectedTemplate && (
          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-4 h-4 rounded-full ${templates.find((t) => t.id === selectedTemplate)?.color} mt-1`}
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    {templates.find((t) => t.id === selectedTemplate)?.name}
                    {templates.find((t) => t.id === selectedTemplate)?.popular && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {templates.find((t) => t.id === selectedTemplate)?.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {templates
                      .find((t) => t.id === selectedTemplate)
                      ?.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Template Tips */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-2">💡 Template Selection Tips:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • <strong>Professional/Traditional:</strong> Best for corporate, finance, and formal industries
            </li>
            <li>
              • <strong>Creative:</strong> Perfect for design, marketing, and creative fields
            </li>
            <li>
              • <strong>Tech:</strong> Ideal for software development and technology roles
            </li>
            <li>
              • <strong>Minimal:</strong> Great for any industry, focuses on content over design
            </li>
            <li>
              • <strong>Academic:</strong> Designed for research, education, and academic positions
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
