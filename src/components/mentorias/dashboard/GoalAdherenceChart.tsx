import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MESES, getGoalAdherenceByMonth } from "@/lib/mentorias/mentorias"
import type { Mentor } from "@/types/mentoria"

const COLOR_ATINGIU = "#059669"
const COLOR_NAO_ATINGIU = "var(--destructive)"

export default function GoalAdherenceChart({ mentores }: { mentores: Mentor[] }) {
  const [mesFiltro, setMesFiltro] = useState("todos")

  const pontos = useMemo(() => getGoalAdherenceByMonth(mentores), [mentores])
  const pontosPct = useMemo(
    () =>
      pontos.map((p) => {
        const total = p.atingiu + p.naoAtingiu
        return {
          mes: p.mes,
          atingiuPct: total > 0 ? Number(((p.atingiu / total) * 100).toFixed(1)) : 0,
          naoAtingiuPct: total > 0 ? Number(((p.naoAtingiu / total) * 100).toFixed(1)) : 0,
        }
      }),
    [pontos],
  )
  const data = mesFiltro === "todos" ? pontosPct : pontosPct.filter((p) => p.mes === mesFiltro)

  return (
    <Card className="flex h-full flex-col shadow-sm">
      <CardHeader className="border-b py-4 px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold">Aderência à meta (mentor × mês)</CardTitle>
          <Select value={mesFiltro} onValueChange={setMesFiltro}>
            <SelectTrigger className="h-9 w-[150px] text-xs">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os meses</SelectItem>
              {MESES.map((mes) => (
                <SelectItem key={mes} value={mes}>
                  {mes}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center pt-5 px-5 pb-5">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
            <YAxis
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip
              formatter={(value: number) => `${value}%`}
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                color: "var(--popover-foreground)",
              }}
            />
            <Legend
              payload={[
                { value: "Atingiu meta", type: "square", color: COLOR_ATINGIU },
                { value: "Não atingiu", type: "square", color: COLOR_NAO_ATINGIU },
              ]}
              wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
            />
            <Bar dataKey="atingiuPct" name="Atingiu meta" stackId="status" fill={COLOR_ATINGIU} radius={[0, 0, 0, 0]} />
            <Bar dataKey="naoAtingiuPct" name="Não atingiu" stackId="status" fill={COLOR_NAO_ATINGIU} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
