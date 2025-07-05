import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const CVHeader = ({ personalInfo }: { personalInfo: any }) => {
  return (
    <div className="text-center">
      <Avatar className="w-32 h-32 mx-auto border-4 border-primary shadow-lg">
        <AvatarImage src={personalInfo.profileImage || "/placeholder.svg"} />
        <AvatarFallback className="text-2xl bg-slate-700 text-primary">
          {personalInfo.firstName?.[0]}
          {personalInfo.lastName?.[0]}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-3xl font-bold mt-4">{personalInfo.firstName}</h1>
      <h1 className="text-3xl font-bold mb-2">{personalInfo.lastName}</h1>
      <p className="text-lg text-primary/90">{personalInfo.title}</p>
    </div>
  )
}
