"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Calendar, ExternalLink, Award } from "lucide-react"

interface CVPreviewProps {
  profileData: any
  template?: string
}

export default function CVPreview({ profileData, template = "modern" }: CVPreviewProps) {
  const { personalInfo, experiences, education, projects, skills, languages, certifications, awards } = profileData

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const groupSkillsByCategory = (skills: any[]) => {
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {})
  }

  const skillGroups = groupSkillsByCategory(skills)

  // Modern Template (Default)
  if (template === "modern") {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-2xl">
        <CardContent className="p-0">
          <div className="space-y-0">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={personalInfo.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    {personalInfo.firstName?.[0]}
                    {personalInfo.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-4xl font-bold mb-2">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </h1>
                  <p className="text-xl text-blue-100 mb-4">{personalInfo.title}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                    {personalInfo.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Professional Summary */}
              {personalInfo.summary && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{personalInfo.summary}</p>
                </div>
              )}

              {/* Experience Section */}
              {experiences.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">Experience</h2>
                  <div className="space-y-6">
                    {experiences.map((exp: any) => (
                      <div key={exp.id} className="border-l-4 border-blue-400 pl-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                            <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
                            {exp.location && <p className="text-gray-600">{exp.location}</p>}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 mt-2 sm:mt-0">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {education.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">Education</h2>
                  <div className="space-y-4">
                    {education.map((edu: any) => (
                      <div key={edu.id} className="border-l-4 border-green-400 pl-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                            <p className="text-green-600 font-semibold">{edu.institution}</p>
                            <p className="text-gray-600">{edu.field}</p>
                          </div>
                          <div className="text-gray-600 mt-1 sm:mt-0">
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </div>
                        </div>
                        {(edu.gpa || edu.honors) && (
                          <div className="flex gap-4 text-sm text-gray-600">
                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                            {edu.honors && <span>{edu.honors}</span>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {skills.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">Skills</h2>
                  <div className="space-y-6">
                    {Object.entries(skillGroups).map(([category, categorySkills]: [string, any]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{category}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categorySkills.map((skill: any) => (
                            <div key={skill.name} className="flex items-center justify-between">
                              <span className="font-medium text-gray-700">{skill.name}</span>
                              <div className="flex items-center gap-3">
                                <div className="w-24 bg-gray-200 rounded-full h-3">
                                  <div
                                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${(skill.level / 10) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-500 w-12">{skill.level}/10</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {projects.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">Projects</h2>
                  <div className="space-y-6">
                    {projects.map((project: any) => (
                      <div key={project.id} className="border-l-4 border-purple-400 pl-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                            {project.url && (
                              <a href={project.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-5 h-5 text-blue-600 hover:text-blue-700" />
                              </a>
                            )}
                          </div>
                          <div className="text-gray-600 mt-1 sm:mt-0">
                            {formatDate(project.startDate)} - {formatDate(project.endDate)}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="bg-purple-100 text-purple-800">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {languages.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">Languages</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {languages.map((lang: any) => (
                      <div key={lang.name} className="text-center p-4 bg-gray-50 rounded-lg border">
                        <p className="font-semibold text-gray-900">{lang.name}</p>
                        <p className="text-sm text-gray-600">{lang.proficiency}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Section */}
              {certifications.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                    Certifications
                  </h2>
                  <div className="space-y-4">
                    {certifications.map((cert: any) => (
                      <div
                        key={cert.name}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{cert.name}</p>
                            {cert.url && (
                              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 text-blue-600 hover:text-blue-700" />
                              </a>
                            )}
                          </div>
                          <p className="text-gray-600">{cert.issuer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{formatDate(cert.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards Section */}
              {awards.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                    Awards & Honors
                  </h2>
                  <div className="space-y-4">
                    {awards.map((award: any) => (
                      <div
                        key={award.name}
                        className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                      >
                        <Award className="w-6 h-6 text-yellow-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{award.name}</h3>
                            <span className="text-sm text-gray-600">{formatDate(award.date)}</span>
                          </div>
                          <p className="text-gray-700 mb-1">{award.issuer}</p>
                          {award.description && <p className="text-sm text-gray-600">{award.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Classic Template
  if (template === "classic") {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white shadow-2xl">
        <CardContent className="p-12">
          <div className="space-y-10">
            {/* Header - Classic Style */}
            <div className="text-center border-b-4 border-gray-800 pb-8">
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="text-2xl text-gray-700 font-serif mb-6">{personalInfo.title}</p>
              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                {personalInfo.email && <span className="font-serif">{personalInfo.email}</span>}
                {personalInfo.phone && <span className="font-serif">{personalInfo.phone}</span>}
                {personalInfo.location && <span className="font-serif">{personalInfo.location}</span>}
              </div>
            </div>

            {/* Professional Summary */}
            {personalInfo.summary && (
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 uppercase tracking-wider">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-loose font-serif text-lg">{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience - Classic Layout */}
            {experiences.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 uppercase tracking-wider">
                  Professional Experience
                </h2>
                <div className="space-y-8">
                  {experiences.map((exp: any) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-serif font-bold text-gray-900">{exp.position}</h3>
                          <p className="font-serif text-gray-700 text-lg">{exp.company}</p>
                        </div>
                        <div className="text-right text-gray-600">
                          <p className="font-serif">
                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          </p>
                          {exp.location && <p className="font-serif">{exp.location}</p>}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-loose font-serif">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education - Classic Style */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 uppercase tracking-wider">Education</h2>
                <div className="space-y-6">
                  {education.map((edu: any) => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif font-bold text-gray-900 text-lg">{edu.degree}</h3>
                        <p className="font-serif text-gray-700">{edu.institution}</p>
                        <p className="text-gray-600 font-serif">{edu.field}</p>
                      </div>
                      <div className="text-right text-gray-600">
                        <p className="font-serif">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                        {edu.gpa && <p className="font-serif">GPA: {edu.gpa}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills - Classic Style */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 uppercase tracking-wider">Skills</h2>
                <div className="space-y-4">
                  {Object.entries(skillGroups).map(([category, categorySkills]: [string, any]) => (
                    <div key={category}>
                      <h3 className="font-serif font-semibold text-gray-800 mb-2">{category}</h3>
                      <p className="font-serif text-gray-700">
                        {categorySkills.map((skill: any) => skill.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Creative Template
  if (template === "creative") {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl">
        <CardContent className="p-0">
          <div className="space-y-0">
            {/* Creative Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
              <div className="flex items-center gap-6">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={personalInfo.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl bg-purple-100 text-purple-600">
                    {personalInfo.firstName?.[0]}
                    {personalInfo.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </h1>
                  <p className="text-xl text-purple-100 mb-4">{personalInfo.title}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              {/* Left Column */}
              <div className="md:col-span-1 space-y-8">
                {/* Contact */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                  <div className="space-y-3">
                    {personalInfo.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-600" />
                        <span>{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-purple-600" />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
                    <div className="space-y-4">
                      {Object.entries(skillGroups).map(([category, categorySkills]: [string, any]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-gray-800 mb-2">{category}</h3>
                          <div className="flex flex-wrap gap-2">
                            {categorySkills.map((skill: any) => (
                              <Badge key={skill.name} className="bg-purple-200 text-purple-800">
                                {skill.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
                    <div className="space-y-2">
                      {languages.map((lang: any) => (
                        <div key={lang.name}>
                          <p className="font-semibold text-gray-900">{lang.name}</p>
                          <p className="text-sm text-gray-600">{lang.proficiency}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="md:col-span-2 space-y-8">
                {/* Summary */}
                {personalInfo.summary && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
                    <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                    <div className="space-y-6">
                      {experiences.map((exp: any) => (
                        <div key={exp.id}>
                          <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                          <p className="text-lg text-purple-600 font-semibold">{exp.company}</p>
                          <p className="text-gray-600 mb-2">
                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          </p>
                          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
                    <div className="space-y-4">
                      {education.map((edu: any) => (
                        <div key={edu.id}>
                          <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-purple-600 font-semibold">{edu.institution}</p>
                          <p className="text-gray-600">
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Minimal Template
  if (template === "minimal") {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white shadow-2xl">
        <CardContent className="p-12">
          <div className="space-y-10">
            {/* Minimal Header */}
            <div className="text-center">
              <h1 className="text-5xl font-light text-gray-900 mb-2">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{personalInfo.title}</p>
              <div className="flex justify-center gap-6 text-sm text-gray-500">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.location && <span>{personalInfo.location}</span>}
              </div>
            </div>

            <hr />

            {/* Minimal Summary */}
            {personalInfo.summary && (
              <div>
                <p className="text-gray-700 leading-relaxed text-center text-lg">{personalInfo.summary}</p>
              </div>
            )}

            {/* Minimal Experience */}
            {experiences.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center tracking-widest uppercase">
                  Experience
                </h2>
                <div className="space-y-8">
                  {experiences.map((exp: any) => (
                    <div key={exp.id} className="grid grid-cols-4 gap-6">
                      <div className="col-span-1 text-right">
                        <p className="font-semibold text-gray-800">{exp.company}</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </p>
                      </div>
                      <div className="col-span-3">
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Minimal Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center tracking-widest uppercase">
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu: any) => (
                    <div key={edu.id} className="grid grid-cols-4 gap-6">
                      <div className="col-span-1 text-right">
                        <p className="font-semibold text-gray-800">{edu.institution}</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                      </div>
                      <div className="col-span-3">
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-700">{edu.field}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Minimal Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center tracking-widest uppercase">
                  Skills
                </h2>
                <div className="text-center">
                  <p className="text-gray-700 leading-relaxed">{skills.map((skill: any) => skill.name).join(" • ")}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Tech Template
  if (template === "tech") {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gray-900 text-white shadow-2xl">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left Sidebar */}
            <div className="md:col-span-1 bg-gray-800 p-8 space-y-8">
              <div className="text-center">
                <Avatar className="w-32 h-32 mx-auto border-4 border-cyan-400 shadow-lg">
                  <AvatarImage src={personalInfo.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl bg-gray-700 text-cyan-300">
                    {personalInfo.firstName?.[0]}
                    {personalInfo.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold mt-4 mb-2">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="text-lg text-cyan-400">{personalInfo.title}</p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-xl font-bold text-cyan-400 mb-4">Contact</h2>
                <div className="space-y-3 text-gray-300">
                  {personalInfo.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-4">Skills</h2>
                  <div className="space-y-4">
                    {Object.entries(skillGroups).map(([category, categorySkills]: [string, any]) => (
                      <div key={category}>
                        <h3 className="font-semibold text-gray-200 mb-2">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill: any) => (
                            <Badge key={skill.name} className="bg-cyan-900 text-cyan-300 border-cyan-700">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content */}
            <div className="md:col-span-2 p-8 space-y-8">
              {/* Summary */}
              {personalInfo.summary && (
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400 mb-4">Summary</h2>
                  <p className="text-gray-300 leading-relaxed">{personalInfo.summary}</p>
                </div>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400 mb-6">Experience</h2>
                  <div className="space-y-6">
                    {experiences.map((exp: any) => (
                      <div key={exp.id}>
                        <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                        <p className="text-lg text-cyan-400 font-semibold">{exp.company}</p>
                        <p className="text-gray-400 mb-2">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </p>
                        <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400 mb-6">Education</h2>
                  <div className="space-y-4">
                    {education.map((edu: any) => (
                      <div key={edu.id}>
                        <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                        <p className="text-cyan-400 font-semibold">{edu.institution}</p>
                        <p className="text-gray-400">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Academic Template
  if (template === "academic") {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white shadow-2xl">
        <CardContent className="p-12">
          <div className="space-y-10">
            {/* Academic Header */}
            <div className="text-center border-b-2 border-gray-300 pb-6">
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="text-xl text-gray-700 font-serif mb-4">{personalInfo.title}</p>
              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.location && <span>{personalInfo.location}</span>}
              </div>
            </div>

            {/* Academic Summary/Research Statement */}
            {personalInfo.summary && (
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Research Statement</h2>
                <p className="text-gray-700 leading-loose font-serif">{personalInfo.summary}</p>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Education</h2>
                <div className="space-y-6">
                  {education.map((edu: any) => (
                    <div key={edu.id}>
                      <h3 className="font-serif font-bold text-gray-900 text-lg">{edu.degree}</h3>
                      <p className="font-serif text-gray-700">{edu.institution}</p>
                      <p className="text-gray-600 font-serif">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Research Experience */}
            {experiences.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Research Experience</h2>
                <div className="space-y-8">
                  {experiences.map((exp: any) => (
                    <div key={exp.id}>
                      <h3 className="text-lg font-serif font-bold text-gray-900">{exp.position}</h3>
                      <p className="font-serif text-gray-700">{exp.company}</p>
                      <p className="text-gray-700 leading-loose font-serif mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Publications/Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Publications</h2>
                <ul className="space-y-4 list-disc list-inside">
                  {projects.map((project: any) => (
                    <li key={project.id} className="font-serif text-gray-700">
                      {project.name}. {project.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Skills</h2>
                <div className="space-y-4">
                  {Object.entries(skillGroups).map(([category, categorySkills]: [string, any]) => (
                    <div key={category}>
                      <h3 className="font-serif font-semibold text-gray-800 mb-2">{category}:</h3>
                      <p className="font-serif text-gray-700">
                        {categorySkills.map((skill: any) => skill.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return <div>Template not found</div>
}
