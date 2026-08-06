import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MESES, getMentorRankingByMonth } from "@/lib/mentorias/mentorias"
import type { Mentor } from "@/types/mentoria"

export default function MentorRankingChart({ mentores }: { mentores: Mentor[] }) {
  const [mesFiltro, setMesFiltro] = useState<(typeof MESES)[number] | "todos">("todos")

  const data = useMemo(() => getMentorRankingByMonth(mentores, mesFiltro), [mentores, mesFiltro])
  const height = Math.max(240, data.length * 36)

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b py-4 px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">Ranking de mentores (total geral de sessões)</CardTitle>
            <CardDescription>Total de mentorias que cada mentor deu</CardDescription>
          </div>
          <Select value={mesFiltro} onValueChange={(v) => setMesFiltro(v as typeof mesFiltro)}>
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
      <CardContent className="pt-5 px-5 pb-5">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} layout="vertical" margin={{ left: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} allowDecimals={false} />
            <YAxis type="category" dataKey="nome" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={90} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                color: "var(--popover-foreground)",
              }}
            />
            <Bar dataKey="totalGeral" name="Sessões" fill="#4CC2CF" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="totalGeral" position="right" style={{ fontSize: 12, fill: "var(--foreground)" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
