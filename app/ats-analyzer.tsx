"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, CheckCircle, AlertTriangle, XCircle, TrendingUp, Target, Zap, Eye } from "lucide-react"

interface ATSAnalyzerProps {
  profileData: any
}

interface ATSScore {
  overall: number
  categories: {
    keywords: number
    formatting: number
    sections: number
    length: number
    readability: number
  }
}

interface ATSFeedback {
  strengths: string[]
  improvements: string[]
  criticalIssues: string[]
  missingKeywords: string[]
  recommendations: string[]
}

export default function ATSAnalyzer({ profileData }: ATSAnalyzerProps) {
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null)
  const [feedback, setFeedback] = useState<ATSFeedback | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedJobTitle, setSelectedJobTitle] = useState("")

  const jobTitles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager",
    "UX/UI Designer",
    "Marketing Manager",
    "Sales Representative",
  ]

  const analyzeATS = async () => {
    setIsAnalyzing(true)

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const analysis = performATSAnalysis(profileData, selectedJobTitle)
    setAtsScore(analysis.score)
    setFeedback(analysis.feedback)
    setIsAnalyzing(false)
  }

  const performATSAnalysis = (profile: any, jobTitle: string) => {
    const { personalInfo, experiences, education, skills, projects } = profile

    // Calculate scores for different categories
    const keywordScore = calculateKeywordScore(profile, jobTitle)
    const formattingScore = calculateFormattingScore(profile)
    const sectionsScore = calculateSectionsScore(profile)
    const lengthScore = calculateLengthScore(profile)
    const readabilityScore = calculateReadabilityScore(profile)

    const overallScore = Math.round(
      (keywordScore + formattingScore + sectionsScore + lengthScore + readabilityScore) / 5,
    )

    const score: ATSScore = {
      overall: overallScore,
      categories: {
        keywords: keywordScore,
        formatting: formattingScore,
        sections: sectionsScore,
        length: lengthScore,
        readability: readabilityScore,
      },
    }

    const feedback: ATSFeedback = {
      strengths: generateStrengths(profile, score),
      improvements: generateImprovements(profile, score),
      criticalIssues: generateCriticalIssues(profile, score),
      missingKeywords: generateMissingKeywords(profile, jobTitle),
      recommendations: generateRecommendations(profile, score, jobTitle),
    }

    return { score, feedback }
  }

  const calculateKeywordScore = (profile: any, jobTitle: string) => {
    const jobKeywords = getJobKeywords(jobTitle)
    const profileText = JSON.stringify(profile).toLowerCase()
    const foundKeywords = jobKeywords.filter((keyword) => profileText.includes(keyword.toLowerCase()))
    return Math.round((foundKeywords.length / jobKeywords.length) * 100)
  }

  const calculateFormattingScore = (profile: any) => {
    let score = 100

    // Check for common formatting issues
    if (!profile.personalInfo.email) score -= 20
    if (!profile.personalInfo.phone) score -= 15
    if (!profile.personalInfo.location) score -= 10
    if (profile.experiences.length === 0) score -= 25
    if (profile.education.length === 0) score -= 15
    if (profile.skills.length === 0) score -= 15

    return Math.max(0, score)
  }

  const calculateSectionsScore = (profile: any) => {
    const requiredSections = ["personalInfo", "experiences", "education", "skills"]
    const optionalSections = ["projects", "certifications", "languages", "awards"]

    let score = 0

    // Required sections (70% of score)
    requiredSections.forEach((section) => {
      if (
        profile[section] &&
        (Array.isArray(profile[section]) ? profile[section].length > 0 : Object.keys(profile[section]).length > 0)
      ) {
        score += 17.5
      }
    })

    // Optional sections (30% of score)
    optionalSections.forEach((section) => {
      if (profile[section] && profile[section].length > 0) {
        score += 7.5
      }
    })

    return Math.round(Math.min(100, score))
  }

  const calculateLengthScore = (profile: any) => {
    const summaryLength = profile.personalInfo.summary?.length || 0
    const totalExperience = profile.experiences.reduce(
      (acc: number, exp: any) => acc + (exp.description?.length || 0),
      0,
    )

    const totalLength = summaryLength + totalExperience

    if (totalLength < 200) return 30
    if (totalLength < 500) return 60
    if (totalLength < 1000) return 90
    if (totalLength < 1500) return 100
    if (totalLength < 2000) return 85
    return 70 // Too long
  }

  const calculateReadabilityScore = (profile: any) => {
    // Simple readability check based on sentence structure and word choice
    const text = profile.personalInfo.summary || ""
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
    const words = text.split(/\s+/).filter((w) => w.length > 0)

    if (sentences.length === 0) return 0

    const avgWordsPerSentence = words.length / sentences.length
    const complexWords = words.filter((w) => w.length > 6).length
    const complexWordRatio = complexWords / words.length

    let score = 100
    if (avgWordsPerSentence > 20) score -= 20
    if (complexWordRatio > 0.3) score -= 15

    return Math.max(0, score)
  }

  const getJobKeywords = (jobTitle: string) => {
    const keywordMap: Record<string, string[]> = {
      "Software Engineer": [
        "JavaScript",
        "Python",
        "Java",
        "React",
        "Node.js",
        "Git",
        "API",
        "Database",
        "Agile",
        "Testing",
      ],
      "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Vue",
        "Angular",
        "Responsive",
        "UI/UX",
        "Webpack",
        "TypeScript",
      ],
      "Backend Developer": [
        "Node.js",
        "Python",
        "Java",
        "API",
        "Database",
        "SQL",
        "MongoDB",
        "Express",
        "REST",
        "GraphQL",
      ],
      "Full Stack Developer": [
        "JavaScript",
        "React",
        "Node.js",
        "Database",
        "API",
        "Git",
        "Agile",
        "MongoDB",
        "SQL",
        "TypeScript",
      ],
      "DevOps Engineer": [
        "AWS",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Jenkins",
        "Terraform",
        "Linux",
        "Monitoring",
        "Automation",
        "Cloud",
      ],
      "Data Scientist": [
        "Python",
        "R",
        "Machine Learning",
        "SQL",
        "Statistics",
        "Pandas",
        "NumPy",
        "Visualization",
        "Analytics",
        "AI",
      ],
      "Product Manager": [
        "Product Strategy",
        "Roadmap",
        "Agile",
        "Scrum",
        "Analytics",
        "User Research",
        "Stakeholder",
        "KPIs",
        "A/B Testing",
        "Leadership",
      ],
      "UX/UI Designer": [
        "Figma",
        "Sketch",
        "Adobe",
        "Prototyping",
        "User Research",
        "Wireframing",
        "Design Systems",
        "Usability",
        "Visual Design",
        "Interaction Design",
      ],
      "Marketing Manager": [
        "Digital Marketing",
        "SEO",
        "SEM",
        "Analytics",
        "Campaign",
        "Brand",
        "Content",
        "Social Media",
        "Lead Generation",
        "ROI",
      ],
      "Sales Representative": [
        "Sales",
        "CRM",
        "Lead Generation",
        "Negotiation",
        "Customer Relations",
        "Pipeline",
        "Quota",
        "B2B",
        "Prospecting",
        "Closing",
      ],
    }

    return keywordMap[jobTitle] || []
  }

  const generateStrengths = (profile: any, score: ATSScore) => {
    const strengths = []

    if (score.categories.keywords > 70) strengths.push("Strong keyword optimization for your target role")
    if (score.categories.formatting > 80) strengths.push("Well-structured resume format")
    if (score.categories.sections > 80) strengths.push("Comprehensive sections coverage")
    if (profile.experiences.length > 2) strengths.push("Solid work experience history")
    if (profile.skills.length > 5) strengths.push("Diverse skill set")
    if (profile.personalInfo.summary && profile.personalInfo.summary.length > 100)
      strengths.push("Detailed professional summary")

    return strengths.length > 0 ? strengths : ["Resume has basic structure in place"]
  }

  const generateImprovements = (profile: any, score: ATSScore) => {
    const improvements = []

    if (score.categories.keywords < 70) improvements.push("Add more industry-relevant keywords")
    if (score.categories.formatting < 80) improvements.push("Improve resume formatting and structure")
    if (score.categories.length < 70) improvements.push("Optimize resume length for better readability")
    if (score.categories.readability < 80) improvements.push("Simplify language and improve readability")
    if (!profile.personalInfo.linkedin) improvements.push("Add LinkedIn profile URL")
    if (profile.projects.length === 0) improvements.push("Include relevant projects or portfolio")

    return improvements
  }

  const generateCriticalIssues = (profile: any, score: ATSScore) => {
    const issues = []

    if (!profile.personalInfo.email) issues.push("Missing email address")
    if (!profile.personalInfo.phone) issues.push("Missing phone number")
    if (profile.experiences.length === 0) issues.push("No work experience listed")
    if (profile.skills.length === 0) issues.push("No skills section")
    if (score.overall < 50) issues.push("Overall ATS compatibility is low")

    return issues
  }

  const generateMissingKeywords = (profile: any, jobTitle: string) => {
    const jobKeywords = getJobKeywords(jobTitle)
    const profileText = JSON.stringify(profile).toLowerCase()

    return jobKeywords.filter((keyword) => !profileText.includes(keyword.toLowerCase())).slice(0, 8) // Return top 8 missing keywords
  }

  const generateRecommendations = (profile: any, score: ATSScore, jobTitle: string) => {
    const recommendations = []

    if (score.categories.keywords < 70) {
      recommendations.push("Incorporate more job-specific keywords throughout your resume")
    }
    if (score.categories.formatting < 80) {
      recommendations.push("Use consistent formatting and clear section headers")
    }
    if (!profile.personalInfo.summary || profile.personalInfo.summary.length < 100) {
      recommendations.push("Add a compelling professional summary at the top")
    }
    if (profile.experiences.some((exp: any) => !exp.description || exp.description.length < 50)) {
      recommendations.push("Expand job descriptions with specific achievements and metrics")
    }
    if (profile.skills.length < 8) {
      recommendations.push("Add more relevant technical and soft skills")
    }

    recommendations.push("Quantify achievements with specific numbers and percentages")
    recommendations.push("Use action verbs to start bullet points in experience section")

    return recommendations
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    return <XCircle className="w-5 h-5 text-red-600" />
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-600" />
          ATS Compatibility Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Title Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Target Job Title (Optional)</label>
          <div className="flex flex-wrap gap-2">
            {jobTitles.map((title) => (
              <Badge
                key={title}
                variant={selectedJobTitle === title ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedJobTitle(selectedJobTitle === title ? "" : title)}
              >
                {title}
              </Badge>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <Button onClick={analyzeATS} disabled={isAnalyzing} className="w-full bg-orange-600 hover:bg-orange-700">
          {isAnalyzing ? (
            <>
              <Eye className="w-4 h-4 mr-2 animate-pulse" />
              Analyzing Resume...
            </>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" />
              Analyze ATS Compatibility
            </>
          )}
        </Button>

        {/* Analysis Results */}
        {atsScore && feedback && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {getScoreIcon(atsScore.overall)}
                    <h3 className="text-2xl font-bold">ATS Compatibility Score</h3>
                  </div>
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(atsScore.overall)}`}>
                    {atsScore.overall}/100
                  </div>
                  <Progress value={atsScore.overall} className="w-full h-3 mb-2" />
                  <p className="text-sm text-gray-600">
                    {atsScore.overall >= 80
                      ? "Excellent ATS compatibility"
                      : atsScore.overall >= 60
                        ? "Good ATS compatibility with room for improvement"
                        : "Needs significant improvement for ATS systems"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Scores */}
            <Tabs defaultValue="scores" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="scores">Scores</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="scores" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(atsScore.categories).map(([category, score]) => (
                    <Card key={category}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">{category}</span>
                          <span className={`font-bold ${getScoreColor(score)}`}>{score}/100</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-4">
                {feedback.strengths.length > 0 && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription>
                      <strong className="text-green-800">Strengths:</strong>
                      <ul className="mt-2 space-y-1">
                        {feedback.strengths.map((strength, index) => (
                          <li key={index} className="text-green-700">
                            • {strength}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {feedback.improvements.length > 0 && (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription>
                      <strong className="text-yellow-800">Areas for Improvement:</strong>
                      <ul className="mt-2 space-y-1">
                        {feedback.improvements.map((improvement, index) => (
                          <li key={index} className="text-yellow-700">
                            • {improvement}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {feedback.criticalIssues.length > 0 && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Critical Issues:</strong>
                      <ul className="mt-2 space-y-1">
                        {feedback.criticalIssues.map((issue, index) => (
                          <li key={index}>• {issue}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="keywords" className="space-y-4">
                {selectedJobTitle && (
                  <>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Missing Keywords for {selectedJobTitle}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {feedback.missingKeywords.map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-red-600 border-red-200">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Alert className="border-blue-200 bg-blue-50">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>Keyword Optimization Tip:</strong> Naturally incorporate these missing keywords into
                        your resume content, especially in your professional summary, skills section, and job
                        descriptions where relevant.
                      </AlertDescription>
                    </Alert>
                  </>
                )}
              </TabsContent>

              <TabsContent value="tips" className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Personalized Recommendations:</h4>
                  {feedback.recommendations.map((recommendation, index) => (
                    <Alert key={index} className="border-blue-200 bg-blue-50">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">{recommendation}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* General ATS Tips */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">🎯 ATS Optimization Tips:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Use standard section headings (Experience, Education, Skills)</li>
            <li>• Include relevant keywords naturally throughout your resume</li>
            <li>• Use simple, clean formatting without complex graphics</li>
            <li>• Save and submit your resume as a .docx or .pdf file</li>
            <li>• Quantify achievements with specific numbers and metrics</li>
            <li>• Tailor your resume for each job application</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
