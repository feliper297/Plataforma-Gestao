import StatusBadge from "./StatusBadge"
import type { MenteeAdherenceRow } from "./types"

const DEFAULT_DATA: MenteeAdherenceRow[] = [
  { name: "Ryan", goal: 80, abr: 100, mai: 100, jun: 100, jul: 100, average: 100, status: "atingiu" },
  { name: "Minoro", goal: 80, abr: 50, mai: 50, jun: 0, jul: 0, average: 25, status: "nao_atingiu" },
  { name: "Viana", goal: 80, abr: 66.67, mai: 83.33, jun: 100, jul: 100, average: 87.5, status: "atingiu" },
  { name: "Felipe", goal: 80, abr: 80, mai: 90, jun: 70, jul: 85, average: 81.25, status: "atingiu" },
  { name: "Bruna", goal: 80, abr: 60, mai: 70, jun: 75, jul: 65, average: 67.5, status: "em_andamento" },
]

function pct(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(2)}%`
}

interface MenteeAdherenceTableProps {
  data?: MenteeAdherenceRow[]
  goal?: number
}

export default function MenteeAdherenceTable({ data = DEFAULT_DATA, goal = 80 }: MenteeAdherenceTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="border-b border-border py-4 px-5">
        <h3 className="text-base font-semibold text-card-foreground">Aderência dos mentorados</h3>
        <p className="text-sm text-muted-foreground">
          Percentual de participação semanal em relação à meta de {pct(goal)}.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Mentorado", "Meta", "Abr", "Mai", "Jun", "Jul", "Média total", "Status"].map((h, i) => (
                <th
                  key={h}
                  className={`py-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground ${
                    i === 0 ? "px-5 text-left" : i === 7 ? "px-5 text-right" : "px-3 text-center"
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
                <td className="px-3 py-3 text-center tabular-nums text-muted-foreground">{pct(row.goal)}</td>
                <td className="px-3 py-3 text-center tabular-nums">{pct(row.abr)}</td>
                <td className="px-3 py-3 text-center tabular-nums">{pct(row.mai)}</td>
                <td className="px-3 py-3 text-center tabular-nums">{pct(row.jun)}</td>
                <td className="px-3 py-3 text-center tabular-nums">{pct(row.jul)}</td>
                <td className="px-3 py-3 text-center font-semibold tabular-nums">{pct(row.average)}</td>
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
