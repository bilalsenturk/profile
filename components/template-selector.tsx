"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

interface Template {
  id: string
  name: string
  preview: string
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern Professional",
    preview: "/placeholder.svg?height=200&width=140",
  },
  {
    id: "classic",
    name: "Classic Executive",
    preview: "/placeholder.svg?height=200&width=140",
  },
  {
    id: "creative",
    name: "Creative Designer",
    preview: "/placeholder.svg?height=200&width=140",
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    preview: "/placeholder.svg?height=200&width=140",
  },
  {
    id: "tech",
    name: "Tech Innovator",
    preview: "/placeholder.svg?height=200&width=140",
  },
  {
    id: "academic",
    name: "Academic Scholar",
    preview: "/placeholder.svg?height=200&width=140",
  },
]

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateSelect: (templateId: string) => void
}

export default function TemplateSelector({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) {
  return (
    <div className="w-full px-4 md:px-10">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {templates.map((template) => (
            <CarouselItem
              key={template.id}
              className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="p-1">
                <Card
                  onClick={() => onTemplateSelect(template.id)}
                  className={cn(
                    "cursor-pointer transition-all duration-200 group overflow-hidden",
                    selectedTemplate === template.id
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "hover:shadow-lg hover:-translate-y-1",
                  )}
                >
                  <CardContent className="p-0 relative aspect-[3/4]">
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={`${template.name} preview`}
                      className="w-full h-full object-cover bg-muted"
                    />
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-primary/70 flex items-center justify-center transition-all duration-300">
                        <CheckCircle className="w-10 h-10 text-primary-foreground" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 transition-all duration-300">
                      <p className="text-white text-sm font-semibold truncate">{template.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
}
