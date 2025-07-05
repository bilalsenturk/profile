import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist, createJSONStorage } from "zustand/middleware"
import { createSelector } from "reselect"

// --- Type Definitions ---
type PersonalInfo = {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
  summary: string
  profileImage: string
  hobbies?: string
  references?: string
}

type Experience = {
  id: number
  position: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

type Education = {
  id: number
  degree: string
  field: string
  institution: string
  startDate: string
  endDate: string
}

type Certificate = {
  id: number
  name: string
  issuer: string
  date: string
  description: string
  skills: string[]
  imageUrl: string
  isVerified: boolean
  isLocked: boolean
}

type Skill = {
  id: number
  name: string
  level: number
  category: string
}

type Project = {
  id: number
  name: string
  description: string
  technologies: string[]
  url: string
}

type Language = {
  id: number
  name: string
  proficiency: string
}

export type ProfileData = {
  personalInfo: PersonalInfo
  experiences: Experience[]
  education: Education[]
  certificates: Certificate[]
  skills: Skill[]
  projects: Project[]
  languages: Language[]
}

// --- Store State and Actions ---
type ProfileState = {
  data: ProfileData
  resumeMode: boolean
  toggleResumeMode: () => void
  updatePersonalInfo: (field: keyof PersonalInfo, value: string) => void
  // Experience Actions
  addExperience: () => void
  updateExperience: (index: number, field: keyof Experience, value: any) => void
  removeExperience: (id: number) => void
  // Education Actions
  addEducation: () => void
  updateEducation: (index: number, field: keyof Education, value: any) => void
  removeEducation: (id: number) => void
  // Certificate Actions
  updateCertificate: (index: number, field: keyof Certificate, value: any) => void
}

const initialData: ProfileData = {
  personalInfo: {
    firstName: "Alan",
    lastName: "Turing",
    title: "Senior Software Engineer",
    email: "alan.turing@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alanturing",
    github: "github.com/alanturing",
    website: "alanturing.com",
    summary:
      "Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
    profileImage: "/placeholder.svg?width=128&height=128",
    hobbies: "Chess, Cryptography, Marathon Running",
    references: "Available upon request.",
  },
  experiences: [
    {
      id: 1,
      position: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "Mountain View, CA",
      startDate: "2020-01",
      endDate: "",
      current: true,
      description:
        "Developed and maintained critical components of the company's flagship product, leading to a 15% increase in performance.",
    },
  ],
  education: [
    {
      id: 1,
      degree: "Master of Science",
      field: "Computer Science",
      institution: "Stanford University",
      startDate: "2018-09",
      endDate: "2019-12",
    },
  ],
  certificates: [
    {
      id: 1,
      name: "Advanced React Development",
      issuer: "Vercel Academy",
      date: "2024-05",
      description:
        "Deep dived into React Server Components, advanced state management patterns, and performance optimization techniques.",
      skills: ["React", "Next.js", "Performance Optimization"],
      imageUrl: "/placeholder.svg?width=120&height=80",
      isVerified: true,
      isLocked: false,
    },
    {
      id: 2,
      name: "AI-Powered Application Design",
      issuer: "Vercel Academy",
      date: "2024-07",
      description: "",
      skills: ["AI/ML Integration", "UI/UX for AI"],
      imageUrl: "/placeholder.svg?width=120&height=80",
      isVerified: false,
      isLocked: true,
    },
  ],
  skills: [{ id: 1, name: "React", level: 9, category: "Technical" }],
  projects: [
    {
      id: 1,
      name: "AI-Powered CV Analyzer",
      description: "Built a tool that analyzes resumes against job descriptions.",
      technologies: ["Python", "NLTK", "React"],
      url: "github.com/alanturing/cv-analyzer",
    },
  ],
  languages: [{ id: 1, name: "English", proficiency: "Native" }],
}

export const useProfileStore = create<ProfileState>()(
  persist(
    immer((set) => ({
      data: initialData,
      resumeMode: false,
      toggleResumeMode: () =>
        set((state) => {
          state.resumeMode = !state.resumeMode
        }),
      updatePersonalInfo: (field, value) =>
        set((state) => {
          state.data.personalInfo[field] = value
        }),

      // Experience Actions
      addExperience: () =>
        set((state) => {
          state.data.experiences.push({
            id: Date.now(),
            position: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
          })
        }),
      updateExperience: (index, field, value) =>
        set((state) => {
          state.data.experiences[index][field] = value
        }),
      removeExperience: (id) =>
        set((state) => {
          state.data.experiences = state.data.experiences.filter((exp) => exp.id !== id)
        }),

      // Education Actions
      addEducation: () =>
        set((state) => {
          state.data.education.push({
            id: Date.now(),
            degree: "",
            field: "",
            institution: "",
            startDate: "",
            endDate: "",
          })
        }),
      updateEducation: (index, field, value) =>
        set((state) => {
          state.data.education[index][field] = value
        }),
      removeEducation: (id) =>
        set((state) => {
          state.data.education = state.data.education.filter((edu) => edu.id !== id)
        }),

      // Certificate Actions
      updateCertificate: (index, field, value) =>
        set((state) => {
          state.data.certificates[index][field] = value
        }),
    })),
    {
      name: "cv-builder-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

// --- Selectors ---
const selectCertificates = (state: ProfileState) => state.data.certificates

// Renamed from useVerifiedCertificates to reflect it's a selector function, not a hook.
export const selectVerifiedCertificates = createSelector([selectCertificates], (certificates) => {
  // Add a guard clause to prevent errors if certificates is not an array
  if (!Array.isArray(certificates)) return []
  return certificates.filter((c) => c.isVerified && !c.isLocked)
})

export const useResumeData = () => {
  // Get the entire state object reactively from the store.
  const state = useProfileStore()
  const { data, resumeMode } = state

  // Pass the state object to the memoized selector to get the derived data.
  const verifiedCertificates = selectVerifiedCertificates(state)

  if (!resumeMode) {
    // When not in resume mode, return a subset of the data.
    const { hobbies, references, ...profileData } = data.personalInfo
    return { ...data, personalInfo: profileData, certificates: [] }
  }

  // In resume mode, return the full data but with only the verified certificates.
  return { ...data, certificates: verifiedCertificates }
}
