import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SectionCardProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

export const SectionCard = ({ title, icon, children }: SectionCardProps) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow bg-card overflow-hidden">
    <CardHeader className="border-b">
      <CardTitle className="flex items-center gap-3 text-lg text-primary font-semibold">
        {icon} {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">{children}</CardContent>
  </Card>
)
