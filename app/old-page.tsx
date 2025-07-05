"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Award,
  FileText,
  Download,
  Eye,
  Plus,
  Trash2,
  Globe,
  Star,
  Target,
  Zap,
  Brain,
  QrCode,
  Mic,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Palette,
  Camera,
  Edit,
  Save,
  X,
} from "lucide-react"

import CVPreview from "./cv-preview"
import ATSAnalyzer from "./ats-analyzer"
import AIAssistant from "./ai-assistant"
import AIContentGenerator from "./ai-content-generator"
import QRCodeGenerator from "../components/qr-code-generator"
import LanguageTranslator from "../components/language-translator"
import VoiceInput from "../components/voice-input"
import TemplateGallery from "../components/template-gallery"

// Predefined language lists for consistency
const WORLD_LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese (Mandarin)",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Polish",
  "Turkish",
  "Hebrew",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Malay",
  "Filipino",
  "Greek",
  "Czech",
  "Hungarian",
  "Romanian",
  "Bulgarian",
  "Croatian",
  "Serbian",
  "Slovak",
  "Slovenian",
  "Estonian",
  "Latvian",
  "Lithuanian",
  "Ukrainian",
  "Bengali",
  "Urdu",
  "Persian",
  "Swahili",
  "Amharic",
  "Yoruba",
  "Igbo",
  "Hausa",
  "Zulu",
  "Afrikaans",
]

const PROFICIENCY_LEVELS = ["Native", "Fluent", "Advanced", "Intermediate", "Basic"]

const SKILL_CATEGORIES = [
  "Technical",
  "Programming",
  "Design",
  "Management",
  "Communication",
  "Marketing",
  "Sales",
  "Finance",
  "Analytics",
  "Project Management",
  "Leadership",
  "Other",
]

const INDUSTRY_LIST = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Sales",
  "Engineering",
  "Design",
  "Consulting",
  "Manufacturing",
  "Retail",
  "Media",
  "Non-profit",
  "Government",
  "Real Estate",
  "Legal",
  "Other",
]

const JOB_LEVELS = [
  "Entry Level",
  "Associate",
  "Mid-Level",
  "Senior",
  "Lead",
  "Manager",
  "Director",
  "VP",
  "C-Level",
  "Founder",
  "Consultant",
  "Freelancer",
]

export default function CVBuilder() {
  const [showPreview, setShowPreview] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [availableLanguages, setAvailableLanguages] = useState([{ code: "en", name: "English", flag: "🇺🇸" }])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [showVoiceInput, setShowVoiceInput] = useState(false)

  // Profile data state
  const [profileData, setProfileData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      title: "",
      industry: "",
      level: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
      summary: "",
      profileImage: "",
    },
    experiences: [] as any[],
    education: [] as any[],
    projects: [] as any[],
    skills: [] as any[],
    languages: [] as any[],
    certifications: [] as any[],
    awards: [] as any[],
  })

  // Form states for adding new items
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: [] as string[],
  })

  const [newEducation, setNewEducation] = useState({
    degree: "",
    field: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    gpa: "",
    honors: "",
  })

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    technologies: [] as string[],
    url: "",
    startDate: "",
    endDate: "",
  })

  const [newSkill, setNewSkill] = useState({
    name: "",
    level: 5,
    category: "Technical",
  })

  const [newLanguage, setNewLanguage] = useState({
    name: "",
    proficiency: "Intermediate",
  })

  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    url: "",
  })

  const [newAward, setNewAward] = useState({
    name: "",
    issuer: "",
    date: "",
    description: "",
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("cvBuilderData")
    const savedTemplate = localStorage.getItem("selectedTemplate")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setProfileData(parsedData)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate)
    }
  }, [])

  // Save data to localStorage whenever profileData changes
  useEffect(() => {
    localStorage.setItem("cvBuilderData", JSON.stringify(profileData))
  }, [profileData])

  // Save selected template
  useEffect(() => {
    localStorage.setItem("selectedTemplate", selectedTemplate)
  }, [selectedTemplate])

  // Voice input handlers
  const handleVoiceTranscript = (text: string) => {
    console.log("Voice transcript:", text)
  }

  const handleVoiceComplete = (text: string) => {
    console.log("Voice complete:", text)
  }

  const handleParsedContent = (parsedData: any) => {
    // Merge parsed data with existing profile data
    setProfileData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...parsedData.personalInfo,
      },
      experiences: [...prev.experiences, ...parsedData.experiences],
      education: [...prev.education, ...parsedData.education],
      skills: [...prev.skills, ...parsedData.skills],
    }))
    setShowVoiceInput(false)
  }

  // Helper functions
  const addExperience = () => {
    if (newExperience.position && newExperience.company) {
      setProfileData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, { ...newExperience, id: Date.now() }],
      }))
      setNewExperience({
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        achievements: [],
      })
    }
  }

  const removeExperience = (id: number) => {
    setProfileData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setProfileData((prev) => ({
        ...prev,
        education: [...prev.education, { ...newEducation, id: Date.now() }],
      }))
      setNewEducation({
        degree: "",
        field: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
        honors: "",
      })
    }
  }

  const removeEducation = (id: number) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addProject = () => {
    if (newProject.name && newProject.description) {
      setProfileData((prev) => ({
        ...prev,
        projects: [...prev.projects, { ...newProject, id: Date.now() }],
      }))
      setNewProject({
        name: "",
        description: "",
        technologies: [],
        url: "",
        startDate: "",
        endDate: "",
      })
    }
  }

  const removeProject = (id: number) => {
    setProfileData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }))
  }

  const addSkill = () => {
    if (newSkill.name) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill, id: Date.now() }],
      }))
      setNewSkill({
        name: "",
        level: 5,
        category: "Technical",
      })
    }
  }

  const removeSkill = (id: number) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const addLanguage = () => {
    if (newLanguage.name) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, { ...newLanguage, id: Date.now() }],
      }))
      setNewLanguage({
        name: "",
        proficiency: "Intermediate",
      })
    }
  }

  const removeLanguage = (id: number) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }))
  }

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setProfileData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, { ...newCertification, id: Date.now() }],
      }))
      setNewCertification({
        name: "",
        issuer: "",
        date: "",
        url: "",
      })
    }
  }

  const removeCertification = (id: number) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }))
  }

  const addAward = () => {
    if (newAward.name && newAward.issuer) {
      setProfileData((prev) => ({
        ...prev,
        awards: [...prev.awards, { ...newAward, id: Date.now() }],
      }))
      setNewAward({
        name: "",
        issuer: "",
        date: "",
        description: "",
      })
    }
  }

  const removeAward = (id: number) => {
    setProfileData((prev) => ({
      ...prev,
      awards: prev.awards.filter((award) => award.id !== id),
    }))
  }

  const handleAISuggestion = (suggestion: any) => {
    console.log("AI Suggestion:", suggestion)
  }

  const handleContentGenerated = (content: string, type: string) => {
    if (type === "summary") {
      setProfileData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, summary: content },
      }))
    }
    console.log("Generated content:", content, type)
  }

  const handleTranslationComplete = (translationResult: any) => {
    setAvailableLanguages((prev) => {
      const exists = prev.find((lang) => lang.code === translationResult.languageCode)
      if (!exists) {
        return [
          ...prev,
          {
            code: translationResult.languageCode,
            name: translationResult.language,
            flag: translationResult.language.split(" ")[0],
          },
        ]
      }
      return prev
    })
    console.log("Translation completed:", translationResult)
  }

  const exportCV = () => {
    const dataStr = JSON.stringify(profileData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "cv-data.json"
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileData((prev) => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, profileImage: result },
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handlePreviewTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    setShowPreview(true)
  }

  const saveSection = (section: string) => {
    setIsEditing(null)
    // Auto-save is handled by useEffect
  }

  const cancelEdit = (section: string) => {
    setIsEditing(null)
    // Could implement revert logic here if needed
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Professional Profile Builder</h1>
                <p className="text-sm text-gray-500">Create your dynamic resume</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Voice Input Toggle */}
              <Button
                onClick={() => setShowVoiceInput(!showVoiceInput)}
                variant={showVoiceInput ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />
                Voice Input
              </Button>

              {/* Language Selector */}
              {availableLanguages.length > 1 && (
                <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                  <SelectTrigger className="w-auto min-w-[120px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Template Indicator */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                <Palette className="w-4 h-4" />
                <span className="capitalize">{selectedTemplate}</span>
              </div>

              {/* Preview Button */}
              <Button onClick={() => setShowPreview(true)} size="sm" className="bg-green-600 hover:bg-green-700">
                <Eye className="w-4 h-4 mr-2" />
                Preview CV
              </Button>

              {/* Export Button */}
              <Button onClick={exportCV} size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showPreview ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">CV Preview</h2>
              <Button onClick={() => setShowPreview(false)} variant="outline" className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Close Preview
              </Button>
            </div>
            <CVPreview profileData={profileData} template={selectedTemplate} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Template Selection */}
              <TemplateGallery
                selectedTemplate={selectedTemplate}
                onTemplateSelect={handleTemplateSelect}
                onPreviewTemplate={handlePreviewTemplate}
              />

              {/* Voice Input Section */}
              {showVoiceInput && (
                <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Mic className="w-5 h-5 text-purple-600" />
                        Voice Profile Builder
                      </CardTitle>
                      <Button onClick={() => setShowVoiceInput(false)} variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <VoiceInput
                      onTranscript={handleVoiceTranscript}
                      onComplete={handleVoiceComplete}
                      onParsedContent={handleParsedContent}
                      continuousMode={true}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              )}

              {/* Profile Header */}
              <Card className="overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <CardContent className="relative px-6 pb-6">
                  {/* Profile Picture */}
                  <div className="absolute -top-16 left-6">
                    <div className="relative">
                      <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                        {profileData.personalInfo.profileImage ? (
                          <img
                            src={profileData.personalInfo.profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <User className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profile-upload"
                      />
                      <Button
                        onClick={() => document.getElementById("profile-upload")?.click()}
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="pt-20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {isEditing === "header" ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Input
                                value={profileData.personalInfo.firstName}
                                onChange={(e) =>
                                  setProfileData((prev) => ({
                                    ...prev,
                                    personalInfo: { ...prev.personalInfo, firstName: e.target.value },
                                  }))
                                }
                                placeholder="First Name"
                              />
                              <Input
                                value={profileData.personalInfo.lastName}
                                onChange={(e) =>
                                  setProfileData((prev) => ({
                                    ...prev,
                                    personalInfo: { ...prev.personalInfo, lastName: e.target.value },
                                  }))
                                }
                                placeholder="Last Name"
                              />
                            </div>
                            <Input
                              value={profileData.personalInfo.title}
                              onChange={(e) =>
                                setProfileData((prev) => ({
                                  ...prev,
                                  personalInfo: { ...prev.personalInfo, title: e.target.value },
                                }))
                              }
                              placeholder="Professional Title"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Select
                                value={profileData.personalInfo.industry}
                                onValueChange={(value) =>
                                  setProfileData((prev) => ({
                                    ...prev,
                                    personalInfo: { ...prev.personalInfo, industry: value },
                                  }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Industry" />
                                </SelectTrigger>
                                <SelectContent>
                                  {INDUSTRY_LIST.map((industry) => (
                                    <SelectItem key={industry} value={industry}>
                                      {industry}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select
                                value={profileData.personalInfo.level}
                                onValueChange={(value) =>
                                  setProfileData((prev) => ({
                                    ...prev,
                                    personalInfo: { ...prev.personalInfo, level: value },
                                  }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Experience Level" />
                                </SelectTrigger>
                                <SelectContent>
                                  {JOB_LEVELS.map((level) => (
                                    <SelectItem key={level} value={level}>
                                      {level}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => saveSection("header")} size="sm">
                                <Save className="w-4 h-4 mr-2" />
                                Save
                              </Button>
                              <Button onClick={() => cancelEdit("header")} variant="outline" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h1 className="text-3xl font-bold text-gray-900">
                                {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
                              </h1>
                              <Button
                                onClick={() => setIsEditing("header")}
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-xl text-gray-600 mb-2">{profileData.personalInfo.title}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              {profileData.personalInfo.industry && <span>{profileData.personalInfo.industry}</span>}
                              {profileData.personalInfo.level && <span>• {profileData.personalInfo.level}</span>}
                            </div>
                          </div>
                        )}
                      </div>
                      {!isEditing && (
                        <Button
                          onClick={() => setIsEditing("header")}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Contact Information
                    </CardTitle>
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing("contact")}
                        variant="outline"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing === "contact" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            Email
                          </Label>
                          <Input
                            type="email"
                            value={profileData.personalInfo.email}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, email: e.target.value },
                              }))
                            }
                            placeholder="john.doe@example.com"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            Phone
                          </Label>
                          <Input
                            value={profileData.personalInfo.phone}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, phone: e.target.value },
                              }))
                            }
                            placeholder="+1 (555) 123-4567"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Location
                        </Label>
                        <Input
                          value={profileData.personalInfo.location}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, location: e.target.value },
                            }))
                          }
                          placeholder="San Francisco, CA"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label className="flex items-center gap-1">
                            <Linkedin className="w-3 h-3" />
                            LinkedIn
                          </Label>
                          <Input
                            value={profileData.personalInfo.linkedin}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, linkedin: e.target.value },
                              }))
                            }
                            placeholder="https://linkedin.com/in/johndoe"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            GitHub
                          </Label>
                          <Input
                            value={profileData.personalInfo.github}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, github: e.target.value },
                              }))
                            }
                            placeholder="https://github.com/johndoe"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            Website
                          </Label>
                          <Input
                            value={profileData.personalInfo.website}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, website: e.target.value },
                              }))
                            }
                            placeholder="https://johndoe.com"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => saveSection("contact")} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={() => cancelEdit("contact")} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profileData.personalInfo.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{profileData.personalInfo.email}</span>
                        </div>
                      )}
                      {profileData.personalInfo.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{profileData.personalInfo.phone}</span>
                        </div>
                      )}
                      {profileData.personalInfo.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{profileData.personalInfo.location}</span>
                        </div>
                      )}
                      {profileData.personalInfo.linkedin && (
                        <div className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4 text-gray-500" />
                          <a
                            href={profileData.personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                      {profileData.personalInfo.github && (
                        <div className="flex items-center gap-2">
                          <Github className="w-4 h-4 text-gray-500" />
                          <a
                            href={profileData.personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            GitHub Profile
                          </a>
                        </div>
                      )}
                      {profileData.personalInfo.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <a
                            href={profileData.personalInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Personal Website
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Professional Summary */}
              <Card className="group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      About
                    </CardTitle>
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing("summary")}
                        variant="outline"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing === "summary" ? (
                    <div className="space-y-4">
                      <Textarea
                        value={profileData.personalInfo.summary}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, summary: e.target.value },
                          }))
                        }
                        placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
                        rows={6}
                        className="resize-none"
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {profileData.personalInfo.summary.length}/500 characters
                        </p>
                        <div className="flex gap-2">
                          <Button onClick={() => saveSection("summary")} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button onClick={() => cancelEdit("summary")} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {profileData.personalInfo.summary ? (
                        <p className="text-gray-700 leading-relaxed">{profileData.personalInfo.summary}</p>
                      ) : (
                        <p className="text-gray-500 italic">
                          Add a professional summary to highlight your key achievements and career objectives.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Experience Section */}
              <Card className="group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      Experience
                    </CardTitle>
                    <Button
                      onClick={() => setIsEditing("add-experience")}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Experience
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Experience Form */}
                  {isEditing === "add-experience" && (
                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            value={newExperience.position}
                            onChange={(e) => setNewExperience((prev) => ({ ...prev, position: e.target.value }))}
                            placeholder="Position Title"
                          />
                          <Input
                            value={newExperience.company}
                            onChange={(e) => setNewExperience((prev) => ({ ...prev, company: e.target.value }))}
                            placeholder="Company Name"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Input
                            value={newExperience.location}
                            onChange={(e) => setNewExperience((prev) => ({ ...prev, location: e.target.value }))}
                            placeholder="Location"
                          />
                          <Input
                            type="month"
                            value={newExperience.startDate}
                            onChange={(e) => setNewExperience((prev) => ({ ...prev, startDate: e.target.value }))}
                            placeholder="Start Date"
                          />
                          <div className="space-y-2">
                            <Input
                              type="month"
                              value={newExperience.endDate}
                              onChange={(e) => setNewExperience((prev) => ({ ...prev, endDate: e.target.value }))}
                              placeholder="End Date"
                              disabled={newExperience.current}
                            />
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={newExperience.current}
                                onCheckedChange={(checked) =>
                                  setNewExperience((prev) => ({ ...prev, current: checked }))
                                }
                              />
                              <Label className="text-sm">Current role</Label>
                            </div>
                          </div>
                        </div>
                        <Textarea
                          value={newExperience.description}
                          onChange={(e) => setNewExperience((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your role, responsibilities, and key achievements..."
                          rows={4}
                        />
                        <div className="flex gap-2">
                          <Button onClick={addExperience} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Add Experience
                          </Button>
                          <Button onClick={() => setIsEditing(null)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Experiences */}
                  <div className="space-y-4">
                    {profileData.experiences.map((exp) => (
                      <Card key={exp.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg">{exp.position}</h3>
                              <p className="text-blue-600 font-medium">{exp.company}</p>
                              {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                              <p className="text-sm text-gray-500 mb-3">
                                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                              </p>
                              <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {profileData.experiences.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No work experience added yet.</p>
                      <p className="text-sm">Click "Add Experience" to get started.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Education Section */}
              <Card className="group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      Education
                    </CardTitle>
                    <Button
                      onClick={() => setIsEditing("add-education")}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Education
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Education Form */}
                  {isEditing === "add-education" && (
                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            value={newEducation.degree}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, degree: e.target.value }))}
                            placeholder="Degree"
                          />
                          <Input
                            value={newEducation.field}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, field: e.target.value }))}
                            placeholder="Field of Study"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            value={newEducation.institution}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, institution: e.target.value }))}
                            placeholder="Institution"
                          />
                          <Input
                            value={newEducation.location}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, location: e.target.value }))}
                            placeholder="Location"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <Input
                            type="month"
                            value={newEducation.startDate}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, startDate: e.target.value }))}
                            placeholder="Start Date"
                          />
                          <Input
                            type="month"
                            value={newEducation.endDate}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, endDate: e.target.value }))}
                            placeholder="End Date"
                          />
                          <Input
                            value={newEducation.gpa}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, gpa: e.target.value }))}
                            placeholder="GPA (Optional)"
                          />
                          <Input
                            value={newEducation.honors}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, honors: e.target.value }))}
                            placeholder="Honors (Optional)"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addEducation} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Add Education
                          </Button>
                          <Button onClick={() => setIsEditing(null)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Education */}
                  <div className="space-y-4">
                    {profileData.education.map((edu) => (
                      <Card key={edu.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg">{edu.degree}</h3>
                              <p className="text-green-600 font-medium">{edu.institution}</p>
                              <p className="text-gray-600">{edu.field}</p>
                              {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
                              <p className="text-sm text-gray-500 mt-1">
                                {edu.startDate} - {edu.endDate}
                              </p>
                              <div className="flex gap-4 text-sm text-gray-600 mt-2">
                                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                {edu.honors && <span>{edu.honors}</span>}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {profileData.education.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No education added yet.</p>
                      <p className="text-sm">Click "Add Education" to get started.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Skills Section */}
              <Card className="group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      Skills
                    </CardTitle>
                    <Button
                      onClick={() => setIsEditing("add-skill")}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Skill
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Skill Form */}
                  {isEditing === "add-skill" && (
                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Input
                            value={newSkill.name}
                            onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Skill Name"
                          />
                          <Select
                            value={newSkill.category}
                            onValueChange={(value) => setNewSkill((prev) => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {SKILL_CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div>
                            <Label className="text-sm">Proficiency: {newSkill.level}/10</Label>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={newSkill.level}
                              onChange={(e) =>
                                setNewSkill((prev) => ({ ...prev, level: Number.parseInt(e.target.value) }))
                              }
                              className="w-full mt-1"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addSkill} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Add Skill
                          </Button>
                          <Button onClick={() => setIsEditing(null)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Skills */}
                  <div className="space-y-4">
                    {Object.entries(
                      profileData.skills.reduce(
                        (acc, skill) => {
                          if (!acc[skill.category]) acc[skill.category] = []
                          acc[skill.category].push(skill)
                          return acc
                        },
                        {} as Record<string, any[]>,
                      ),
                    ).map(([category, skills]) => (
                      <div key={category}>
                        <h3 className="font-medium text-gray-800 mb-3">{category}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {skills.map((skill) => (
                            <Card key={skill.id} className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900">{skill.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">{skill.level}/10</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSkill(skill.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(skill.level / 10) * 100}%` }}
                                />
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {profileData.skills.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No skills added yet.</p>
                      <p className="text-sm">Click "Add Skill" to showcase your abilities.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Languages Section */}
              <Card className="group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Languages className="w-5 h-5 text-blue-600" />
                      Languages
                    </CardTitle>
                    <Button
                      onClick={() => setIsEditing("add-language")}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Language
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Language Form */}
                  {isEditing === "add-language" && (
                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Select
                            value={newLanguage.name}
                            onValueChange={(value) => setNewLanguage((prev) => ({ ...prev, name: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                              {WORLD_LANGUAGES.map((language) => (
                                <SelectItem key={language} value={language}>
                                  {language}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={newLanguage.proficiency}
                            onValueChange={(value) => setNewLanguage((prev) => ({ ...prev, proficiency: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Proficiency Level" />
                            </SelectTrigger>
                            <SelectContent>
                              {PROFICIENCY_LEVELS.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addLanguage} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Add Language
                          </Button>
                          <Button onClick={() => setIsEditing(null)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Languages */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profileData.languages.map((lang) => (
                      <Card key={lang.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{lang.name}</h3>
                            <p className="text-sm text-gray-600">{lang.proficiency}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLanguage(lang.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {profileData.languages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Languages className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No languages added yet.</p>
                      <p className="text-sm">Click "Add Language" to showcase your language skills.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Projects Section */}
              <Card className="group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Code className="w-5 h-5 text-blue-600" />
                      Projects
                    </CardTitle>
                    <Button
                      onClick={() => setIsEditing("add-project")}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Project Form */}
                  {isEditing === "add-project" && (
                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            value={newProject.name}
                            onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Project Name"
                          />
                          <Input
                            value={newProject.url}
                            onChange={(e) => setNewProject((prev) => ({ ...prev, url: e.target.value }))}
                            placeholder="Project URL (Optional)"
                          />
                        </div>
                        <Textarea
                          value={newProject.description}
                          onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe the project, your role, and key achievements..."
                          rows={3}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            type="month"
                            value={newProject.startDate}
                            onChange={(e) => setNewProject((prev) => ({ ...prev, startDate: e.target.value }))}
                            placeholder="Start Date"
                          />
                          <Input
                            type="month"
                            value={newProject.endDate}
                            onChange={(e) => setNewProject((prev) => ({ ...prev, endDate: e.target.value }))}
                            placeholder="End Date"
                          />
                        </div>
                        <Input
                          value={newProject.technologies.join(", ")}
                          onChange={(e) =>
                            setNewProject((prev) => ({
                              ...prev,
                              technologies: e.target.value
                                .split(",")
                                .map((tech) => tech.trim())
                                .filter((tech) => tech),
                            }))
                          }
                          placeholder="Technologies (comma-separated)"
                        />
                        <div className="flex gap-2">
                          <Button onClick={addProject} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Add Project
                          </Button>
                          <Button onClick={() => setIsEditing(null)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Projects */}
                  <div className="space-y-4">
                    {profileData.projects.map((project) => (
                      <Card key={project.id} className="border-l-4 border-l-purple-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
                                {project.url && (
                                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                                    <Globe className="w-4 h-4 text-blue-600 hover:text-blue-700" />
                                  </a>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mb-2">
                                {project.startDate} - {project.endDate}
                              </p>
                              <p className="text-gray-700 leading-relaxed mb-3">{project.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech: string) => (
                                  <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProject(project.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {profileData.projects.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No projects added yet.</p>
                      <p className="text-sm">Click "Add Project" to showcase your work.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Certifications Section */}
              <Card className="group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      Certifications
                    </CardTitle>
                    <Button
                      onClick={() => setIsEditing("add-certification")}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Certification
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Certification Form */}
                  {isEditing === "add-certification" && (
                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            value={newCertification.name}
                            onChange={(e) => setNewCertification((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Certification Name"
                          />
                          <Input
                            value={newCertification.issuer}
                            onChange={(e) => setNewCertification((prev) => ({ ...prev, issuer: e.target.value }))}
                            placeholder="Issuing Organization"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            type="month"
                            value={newCertification.date}
                            onChange={(e) => setNewCertification((prev) => ({ ...prev, date: e.target.value }))}
                            placeholder="Date Obtained"
                          />
                          <Input
                            value={newCertification.url}
                            onChange={(e) => setNewCertification((prev) => ({ ...prev, url: e.target.value }))}
                            placeholder="Credential URL (Optional)"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addCertification} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Add Certification
                          </Button>
                          <Button onClick={() => setIsEditing(null)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Certifications */}
                  <div className="space-y-4">
                    {profileData.certifications.map((cert) => (
                      <Card key={cert.id} className="border-l-4 border-l-orange-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                                {cert.url && (
                                  <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                    <Globe className="w-4 h-4 text-blue-600 hover:text-blue-700" />
                                  </a>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{cert.issuer}</p>
                              <p className="text-sm text-gray-500">{cert.date}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCertification(cert.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {profileData.certifications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No certifications added yet.</p>
                      <p className="text-sm">Click "Add Certification" to showcase your credentials.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Awards Section */}
              <Card className="group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Awards & Honors
                    </CardTitle>
                    <Button
                      onClick={() => setIsEditing("add-award")}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Award
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Award Form */}
                  {isEditing === "add-award" && (
                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            value={newAward.name}
                            onChange={(e) => setNewAward((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Award Name"
                          />
                          <Input
                            value={newAward.issuer}
                            onChange={(e) => setNewAward((prev) => ({ ...prev, issuer: e.target.value }))}
                            placeholder="Issuing Organization"
                          />
                        </div>
                        <Input
                          type="month"
                          value={newAward.date}
                          onChange={(e) => setNewAward((prev) => ({ ...prev, date: e.target.value }))}
                          placeholder="Date Received"
                        />
                        <Textarea
                          value={newAward.description}
                          onChange={(e) => setNewAward((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Brief description of the award and why it was received..."
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <Button onClick={addAward} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Add Award
                          </Button>
                          <Button onClick={() => setIsEditing(null)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Awards */}
                  <div className="space-y-4">
                    {profileData.awards.map((award) => (
                      <Card key={award.id} className="border-l-4 border-l-yellow-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <Award className="w-5 h-5 text-yellow-600 mt-0.5" />
                              <div>
                                <h3 className="font-semibold text-gray-900">{award.name}</h3>
                                <p className="text-sm text-gray-600">{award.issuer}</p>
                                <p className="text-sm text-gray-500">{award.date}</p>
                                {award.description && <p className="text-sm text-gray-700 mt-2">{award.description}</p>}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAward(award.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {profileData.awards.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No awards added yet.</p>
                      <p className="text-sm">Click "Add Award" to highlight your achievements.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Tools Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="sticky top-24">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900">AI-Powered Tools</h2>
                  </div>
                  <p className="text-sm text-gray-600">Enhance your profile with cutting-edge AI technology</p>
                </div>

                {/* AI Assistant */}
                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 mb-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      AI Career Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AIAssistant profileData={profileData} onSuggestion={handleAISuggestion} />
                  </CardContent>
                </Card>

                {/* AI Content Generator */}
                <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 mb-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-600" />
                      AI Content Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AIContentGenerator onContentGenerated={handleContentGenerated} />
                  </CardContent>
                </Card>

                {/* ATS Analyzer */}
                <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 mb-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-orange-600" />
                      ATS Analyzer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ATSAnalyzer profileData={profileData} />
                  </CardContent>
                </Card>

                {/* QR Code Generator */}
                <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 mb-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-indigo-600" />
                      QR Code Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QRCodeGenerator
                      cvUrl={`https://cv-builder.example.com/cv/${profileData.personalInfo.firstName}-${profileData.personalInfo.lastName}`}
                      profileData={profileData}
                    />
                  </CardContent>
                </Card>

                {/* Language Translator */}
                <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Languages className="w-5 h-5 text-pink-600" />
                      Language Translator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LanguageTranslator profileData={profileData} onTranslationComplete={handleTranslationComplete} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
