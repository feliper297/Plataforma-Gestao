import {
  Bell,
  Calendar,
  GitCompareArrows,
  TrendingUp,
  TriangleAlert,
  Users,
  ChevronRight,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function KpiCard({
  label,
  value,
  valueClass = "text-foreground",
  subtext,
  icon,
}: {
  label: string
  value: string
  valueClass?: string
  subtext: string
  icon: React.ReactNode
}) {
  return (
    <Card className="flex-1 shadow-sm">
      <CardHeader className="space-y-0 px-5 pb-2 pt-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </CardTitle>
          <span className="text-muted-foreground [&_svg]:size-3.5">{icon}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5 px-5 pb-5">
        <p className={`text-4xl font-bold tabular-nums tracking-tight ${valueClass}`}>{value}</p>
        <CardDescription className="text-xs">{subtext}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function MentorDashboardExport() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Bom te ver, Mentor</h1>
        <p className="text-sm text-muted-foreground">
          1 pessoa contam com você este mês.{" "}
          <span className="font-medium text-destructive">1 precisa de atenção</span>.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          label="Sua nota como mentor"
          value="—"
          valueClass="text-primary"
          subtext="0 avaliações nos últimos 30d"
          icon={<TrendingUp />}
        />
        <KpiCard
          label="Mentorados ativos"
          value="1"
          subtext="1 com alerta"
          icon={<Users />}
        />
        <KpiCard
          label="Reuniões concluídas (30d)"
          value="0"
          valueClass="text-destructive"
          subtext="Meta do mês: 2"
          icon={<Calendar />}
        />
        <KpiCard
          label="Aderência (como mentor)"
          value="—"
          subtext="30d · —% em 12m"
          icon={<TrendingUp />}
        />
      </div>

      <div className="grid grid-cols-[1fr_360px] items-start gap-4">
        <Card className="overflow-hidden shadow-sm">
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="text-base font-semibold">Seus mentorados</CardTitle>
            <CardDescription>Clique pra ver o detalhe e abrir uma reunião.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex w-full items-center justify-between px-5 py-3.5 text-left">
              <div className="flex items-center gap-3">
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback className="bg-warning text-xs font-bold text-warning-foreground">
                    M
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium leading-none text-foreground">Mentorado</span>
                    <Badge variant="warning" className="h-4 gap-1 rounded-full px-1.5 text-[10px] leading-none">
                      <TriangleAlert className="size-2.5" />
                      Atenção
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">Execução</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-sm font-bold tabular-nums leading-none text-foreground">—</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    nota
                  </span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-sm font-bold tabular-nums leading-none text-foreground">0</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    reun./30d
                  </span>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-warning/20 bg-warning-muted text-warning-muted-foreground">
                  <GitCompareArrows className="size-4" />
                </div>
                <div className="space-y-0.5">
                  <CardTitle className="text-base font-semibold">Divergências</CardTitle>
                  <CardDescription className="text-xs leading-tight">
                    onde sua avaliação diverge da maioria
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="h-6 min-w-6 shrink-0 justify-center font-mono text-xs tabular-nums">
                0
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-5 py-5">
            <p className="text-sm text-muted-foreground">Nenhuma divergência relevante no momento.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
