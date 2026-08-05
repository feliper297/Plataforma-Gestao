import OverviewCards from "@/components/mentorias/dashboard/OverviewCards"
import MonthlyTrendChart from "@/components/mentorias/dashboard/MonthlyTrendChart"
import GoalAdherenceChart from "@/components/mentorias/dashboard/GoalAdherenceChart"
import InactiveMentorsAlert from "@/components/mentorias/dashboard/InactiveMentorsAlert"
import MentorRankingChart from "@/components/mentorias/dashboard/MentorRankingChart"
import MentoriasTable from "@/components/mentorias/dashboard/MentoriasTable"
import EvolucaoMentoradosTable from "@/components/mentorias/dashboard/EvolucaoMentoradosTable"
import { getMentores } from "@/lib/mentorias/mentorias"

export default function RelatorioMentorias() {
  const mentores = getMentores()

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Relatório de Mentorias</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhamento de sessões realizadas vs. meta, por mentor · Março a Julho
        </p>
      </div>

      <OverviewCards mentores={mentores} />

      <InactiveMentorsAlert mentores={mentores} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px] items-stretch">
        <MonthlyTrendChart mentores={mentores} />
        <GoalAdherenceChart mentores={mentores} />
      </div>

      <MentorRankingChart mentores={mentores} />

      <MentoriasTable mentores={mentores} />

      <EvolucaoMentoradosTable />
    </div>
  )
}
