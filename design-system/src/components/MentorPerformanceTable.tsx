import StatusBadge from "./StatusBadge"
import type { MentorPerformanceRow } from "./types"

const DEFAULT_DATA: MentorPerformanceRow[] = [
  { name: "Alexandre", mentees: 4, goal: 8, mar: 2, abr: 0, mai: 7, jun: 8, jul: 7, status: "em_andamento" },
  { name: "Davi", mentees: 3, goal: 6, mar: 3, abr: 7, mai: 6, jun: 6, jul: 3, status: "nao_atingiu" },
  { name: "João", mentees: 2, goal: 4, mar: 4, abr: 4, mai: 4, jun: 0, jul: 2, status: "nao_atingiu" },
  { name: "Marina", mentees: 5, goal: 10, mar: 8, abr: 9, mai: 10, jun: 10, jul: 10, status: "atingiu" },
  { name: "Pedro", mentees: 3, goal: 6, mar: 6, abr: 6, mai: 5, jun: 6, jul: 6, status: "atingiu" },
]

interface MentorPerformanceTableProps {
  data?: MentorPerformanceRow[]
}

export default function MentorPerformanceTable({ data = DEFAULT_DATA }: MentorPerformanceTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="border-b border-border py-4 px-5">
        <h3 className="text-base font-semibold text-card-foreground">Desempenho por mentor</h3>
        <p className="text-sm text-muted-foreground">Sessões realizadas por mês em relação à meta.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Mentor", "Mentorados", "Meta", "Mar", "Abr", "Mai", "Jun", "Jul", "Status"].map((h, i) => (
                <th
                  key={h}
                  className={`py-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground ${
                    i === 0 ? "px-5 text-left" : i === 8 ? "px-5 text-right" : "px-3 text-center"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row) => (
              <tr key={row.name} className="hover:bg-accent/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground whitespace-nowrap">{row.name}</td>
                <td className="px-3 py-3 text-center tabular-nums text-muted-foreground">{row.mentees}</td>
                <td className="px-3 py-3 text-center tabular-nums text-muted-foreground">{row.goal}</td>
                <td className="px-3 py-3 text-center tabular-nums">{row.mar}</td>
                <td className="px-3 py-3 text-center tabular-nums">{row.abr}</td>
                <td className="px-3 py-3 text-center tabular-nums">{row.mai}</td>
                <td className="px-3 py-3 text-center tabular-nums">{row.jun}</td>
                <td className="px-3 py-3 text-center tabular-nums">{row.jul}</td>
                <td className="px-5 py-3 text-right">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
