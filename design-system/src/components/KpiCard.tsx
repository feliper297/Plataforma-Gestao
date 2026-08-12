import type { ReactNode } from "react"

interface KpiCardProps {
  label: string
  value: string
  valueClass?: string
  subtext: string
  icon: ReactNode
}

export default function KpiCard({ label, value, valueClass = "text-foreground", subtext, icon }: KpiCardProps) {
  return (
    <div className="flex-1 rounded-lg border border-border bg-card shadow-sm">
      <div className="px-5 pt-5 pb-2 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-muted-foreground [&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
      </div>
      <div className="px-5 pb-5 space-y-1.5">
        <p className={`text-4xl font-bold tracking-tight tabular-nums ${valueClass}`}>{value}</p>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </div>
    </div>
  )
}
