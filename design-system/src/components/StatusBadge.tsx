import type { GoalStatus } from "./types"

const STATUS_LABEL: Record<GoalStatus, string> = {
  atingiu: "Atingiu meta",
  nao_atingiu: "Não atingiu",
  em_andamento: "Em andamento",
}

const STATUS_CLASSES: Record<GoalStatus, string> = {
  atingiu: "border border-emerald-600/20 bg-emerald-50 text-emerald-700",
  nao_atingiu: "border border-red-300/30 bg-red-50 text-red-600",
  em_andamento: "border border-yellow-400/30 bg-yellow-50 text-yellow-700",
}

export default function StatusBadge({ status }: { status: GoalStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${STATUS_CLASSES[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  )
}
