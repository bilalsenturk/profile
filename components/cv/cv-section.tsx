import type React from "react"
export const CVSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">{title}</h2>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  )
}
