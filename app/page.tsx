"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useProfileStore } from "@/lib/store"
import { useHotkeys } from "@/hooks/use-hotkeys"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditorTab from "@/app/editor-tab"
import PreviewTab from "@/app/preview-tab"
import AiToolsTab from "@/app/ai-tools-tab"
import { FileText, Eye, Sparkles, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumeModeToggle } from "@/components/resume-mode-toggle"
import { ProfileCompletion } from "@/components/profile-completion"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toggleResumeMode } = useProfileStore()

  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "editor")
  const [activeTemplate, setActiveTemplate] = useState("modern")

  useHotkeys(
    [
      ["Shift", "C"],
      ["ctrl", "b"],
    ],
    () => {
      toggleResumeMode()
    },
  )

  useEffect(() => {
    const currentTab = searchParams.get("tab")
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab)
    }
  }, [searchParams, activeTab])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/?tab=${value}`, { scroll: false })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col h-screen">
        <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">CV Builder</h1>
              </div>

              <div className="hidden lg:flex items-center gap-8">
                <ProfileCompletion />
                <ResumeModeToggle />
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center border-t pt-2 pb-1">
              <TabsList className="grid grid-cols-3 gap-2 h-10 w-full max-w-md">
                <TabsTrigger value="editor" className="h-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="preview" className="h-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Templates & Preview
                </TabsTrigger>
                <TabsTrigger value="ai-tools" className="h-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Tools
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto">
          <TabsContent value="editor" className="mt-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <EditorTab />
            </div>
          </TabsContent>
          <TabsContent value="preview" className="mt-0 bg-slate-100 dark:bg-slate-900">
            <div className="py-8">
              <PreviewTab activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate} />
            </div>
          </TabsContent>
          <TabsContent value="ai-tools" className="mt-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <AiToolsTab profileData={{}} setProfileData={() => {}} />
            </div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
