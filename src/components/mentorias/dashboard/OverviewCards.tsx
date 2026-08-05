import { Calendar, GraduationCap, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getOverview } from "@/lib/mentorias/mentorias"
import { formatPercent } from "@/lib/mentorias/format"
import type { Mentor } from "@/types/mentoria"

interface KpiCardProps {
  label: string
  value: string
  valueClass?: string
  subtext?: string
  icon: React.ReactNode
}

function KpiCard({ label, value, valueClass = "text-foreground", subtext, icon }: KpiCardProps) {
  return (
    <Card className="flex-1 shadow-sm">
      <CardHeader className="pb-2 pt-5 px-5 space-y-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </CardTitle>
          <span className="text-muted-foreground [&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-5 px-5 space-y-1.5">
        <p className={`text-4xl font-bold tracking-tight tabular-nums ${valueClass}`}>{value}</p>
        {subtext && <CardDescription className="text-xs">{subtext}</CardDescription>}
      </CardContent>
    </Card>
  )
}

export default function OverviewCards({ mentores }: { mentores: Mentor[] }) {
  const { totalSessoes, mentoresAtivos, mentoradosAtendidos, taxaAtingimento } = getOverview(mentores)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard
        label="Sessões realizadas"
        value={String(totalSessoes)}
        subtext="Total no período (Mar–Jul)"
        icon={<Calendar />}
      />
      <KpiCard label="Mentores ativos" value={String(mentoresAtivos)} icon={<Users />} />
      <KpiCard label="Mentorados atendidos" value={String(mentoradosAtendidos)} icon={<GraduationCap />} />
      <KpiCard
        label="Taxa de atingimento de meta"
        value={formatPercent(taxaAtingimento)}
        valueClass="text-primary"
        subtext="Meses fechados"
        icon={<TrendingUp />}
      />
    </div>
  )
}
