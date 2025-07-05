import { Card, CardContent } from "@/components/ui/card"
import { CVHeader } from "./cv-header"
import { CVSection } from "./cv-section"

const formatDate = (dateString: string) => {
  if (!dateString) return ""
  const date = new Date(dateString + "-01")
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

export const CVDocument = ({ data, template }: { data: any; template: string }) => {
  const { personalInfo, experiences, education, projects, skills, languages, certificates } = data

  if (template === "modern") {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-white text-slate-900">
        <CardContent className="p-0">
          <div className="flex">
            <div className="w-1/3 bg-slate-800 text-white p-8 space-y-8">
              <CVHeader personalInfo={personalInfo} />
              <CVSection title="Skills">
                {skills.map((skill: any) => (
                  <p key={skill.id}>{skill.name}</p>
                ))}
              </CVSection>
              <CVSection title="Languages">
                {languages.map((lang: any) => (
                  <p key={lang.id}>
                    {lang.name} ({lang.proficiency})
                  </p>
                ))}
              </CVSection>
            </div>
            <div className="w-2/3 p-8 space-y-8">
              <CVSection title="Summary">
                <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
              </CVSection>
              <CVSection title="Experience">
                {experiences.map((exp: any) => (
                  <div key={exp.id} className="mb-6">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                      <p className="text-sm text-slate-500">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    <p className="text-md text-primary font-semibold">{exp.company}</p>
                    <p className="text-slate-700 leading-relaxed mt-2">{exp.description}</p>
                  </div>
                ))}
              </CVSection>
              <CVSection title="Certificates & Achievements">
                {certificates.map((cert: any) => (
                  <div key={cert.id} className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{cert.name}</h3>
                    <p className="text-md text-primary font-semibold">
                      {cert.issuer} - {cert.date}
                    </p>
                  </div>
                ))}
              </CVSection>
              <CVSection title="Education">
                {education.map((edu: any) => (
                  <div key={edu.id} className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-md text-primary font-semibold">{edu.institution}</p>
                  </div>
                ))}
              </CVSection>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Return other templates here...
  return <div>Template {template} not found</div>
}
