"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Send, User, Lightbulb, TrendingUp, Target, Zap } from "lucide-react"

interface AIAssistantProps {
  profileData: any
  onSuggestion: (suggestion: any) => void
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: any[]
}

export default function AIAssistant({ profileData, onSuggestion }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI Career Assistant. I can help you improve your resume, suggest career paths, and provide personalized advice. What would you like to work on today?",
      timestamp: new Date(),
      suggestions: [
        { type: "improve_summary", text: "Improve my professional summary" },
        { type: "skill_gaps", text: "Identify skill gaps for my target role" },
        { type: "career_advice", text: "Get career advancement tips" },
        { type: "optimize_keywords", text: "Optimize for ATS keywords" },
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, profileData)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleSuggestionClick = (suggestion: any) => {
    setInputMessage(suggestion.text)
    handleSendMessage()
    onSuggestion(suggestion)
  }

  const generateAIResponse = (userInput: string, profile: any): Message => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("summary") || lowerInput.includes("professional")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: `Based on your profile, here's an improved professional summary:\n\n"${generateImprovedSummary(profile)}"\n\nThis version better highlights your key achievements and uses industry-relevant keywords that will help with ATS systems.`,
        timestamp: new Date(),
        suggestions: [
          { type: "apply_summary", text: "Apply this summary to my profile" },
          { type: "more_variations", text: "Show me more variations" },
        ],
      }
    }

    if (lowerInput.includes("skill") || lowerInput.includes("gap")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: `Based on your current role and industry trends, here are some skill gaps I've identified:\n\n• **Cloud Technologies**: AWS, Azure, or Google Cloud certifications\n• **DevOps Tools**: Docker, Kubernetes, CI/CD pipelines\n• **Data Analysis**: Python, SQL, or data visualization tools\n• **Soft Skills**: Leadership, project management, communication\n\nI recommend focusing on cloud technologies first, as they're in high demand in your field.`,
        timestamp: new Date(),
        suggestions: [
          { type: "learning_path", text: "Create a learning path for these skills" },
          { type: "certification_guide", text: "Show me relevant certifications" },
        ],
      }
    }

    if (lowerInput.includes("career") || lowerInput.includes("advancement")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: `Here are personalized career advancement strategies for you:\n\n🎯 **Short-term (6 months)**:\n• Complete a cloud certification\n• Lead a cross-functional project\n• Expand your network in the industry\n\n🚀 **Medium-term (1-2 years)**:\n• Transition to a senior role\n• Develop mentoring skills\n• Contribute to open-source projects\n\n💼 **Long-term (3-5 years)**:\n• Consider management or technical leadership\n• Build expertise in emerging technologies\n• Establish thought leadership through content`,
        timestamp: new Date(),
        suggestions: [
          { type: "action_plan", text: "Create a detailed action plan" },
          { type: "salary_insights", text: "Show salary insights for target roles" },
        ],
      }
    }

    if (lowerInput.includes("keyword") || lowerInput.includes("ats")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: `I've analyzed your resume for ATS optimization. Here are key improvements:\n\n✅ **Strong Keywords Found**:\n• Software Development, JavaScript, React\n• Project Management, Team Leadership\n\n⚠️ **Missing Keywords** (add these):\n• Agile/Scrum methodologies\n• API development and integration\n• Performance optimization\n• Cross-functional collaboration\n\n📈 **ATS Score**: 72/100 (Good, but can be improved)`,
        timestamp: new Date(),
        suggestions: [
          { type: "add_keywords", text: "Add these keywords to my resume" },
          { type: "ats_analysis", text: "Run full ATS analysis" },
        ],
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "assistant",
      content: `I understand you're asking about "${userInput}". Let me help you with that! Based on your profile, I can provide specific guidance on:\n\n• Resume optimization and keyword enhancement\n• Career path recommendations\n• Skill development priorities\n• Interview preparation\n• Salary negotiation strategies\n\nWhat specific area would you like to focus on?`,
      timestamp: new Date(),
      suggestions: [
        { type: "resume_review", text: "Review my entire resume" },
        { type: "interview_prep", text: "Help me prepare for interviews" },
        { type: "salary_negotiation", text: "Salary negotiation tips" },
      ],
    }
  }

  const generateImprovedSummary = (profile: any) => {
    const { personalInfo, experiences, skills } = profile
    const title = personalInfo.title || "Professional"
    const yearsExp = experiences.length > 0 ? `${experiences.length}+` : "Several"
    const topSkills = skills
      .slice(0, 3)
      .map((s: any) => s.name)
      .join(", ")

    return `Results-driven ${title} with ${yearsExp} years of experience delivering high-impact solutions in fast-paced environments. Proven expertise in ${topSkills} with a track record of leading cross-functional teams and driving digital transformation initiatives. Passionate about leveraging cutting-edge technologies to solve complex business challenges and deliver measurable results.`
  }

  return (
    <Card className="h-96">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          AI Career Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64 px-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
                {message.type === "assistant" && (
                  <Avatar className="w-8 h-8 bg-blue-100">
                    <AvatarFallback>
                      <Brain className="w-4 h-4 text-blue-600" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>

                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-7"
                        >
                          {suggestion.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <Avatar className="w-8 h-8 bg-gray-100">
                    <AvatarFallback>
                      <User className="w-4 h-4 text-gray-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 bg-blue-100">
                  <AvatarFallback>
                    <Brain className="w-4 h-4 text-blue-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about your career..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm" disabled={!inputMessage.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setInputMessage("Improve my professional summary")}
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Improve Summary
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setInputMessage("What skills should I learn?")}
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Skill Gaps
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setInputMessage("Career advancement advice")}
            >
              <Target className="w-3 h-3 mr-1" />
              Career Tips
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setInputMessage("Optimize for ATS")}
            >
              <Zap className="w-3 h-3 mr-1" />
              ATS Optimize
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
