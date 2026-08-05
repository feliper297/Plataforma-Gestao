import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMentorRanking } from "@/lib/mentorias/mentorias"
import type { Mentor } from "@/types/mentoria"

export default function MentorRankingChart({ mentores }: { mentores: Mentor[] }) {
  const data = getMentorRanking(mentores)
  const height = Math.max(240, data.length * 36)

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b py-4 px-5">
        <CardTitle className="text-base font-semibold">Ranking de mentores (total geral de sessões)</CardTitle>
        <CardDescription>Inclui sessões parciais do mês em andamento (Julho)</CardDescription>
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
