import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { GoalStatus } from "@/lib/mentorias/mentorias"

const STATUS_LABEL: Record<GoalStatus, string> = {
  atingiu: "Atingiu meta",
  nao_atingiu: "Não atingiu",
  em_andamento: "Em andamento",
}

const STATUS_CLASSES: Record<GoalStatus, string> = {
  atingiu: "border-emerald-600/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  nao_atingiu: "border-destructive/30 bg-destructive/5 text-destructive",
  em_andamento: "border-warning/30 bg-warning-muted text-warning-muted-foreground",
}

export default function StatusBadge({ status }: { status: GoalStatus }) {
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium whitespace-nowrap", STATUS_CLASSES[status])}>
      {STATUS_LABEL[status]}
    </Badge>
  )
}
