import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getGoalAdherence } from "@/lib/mentorias/mentorias"
import type { GoalStatus } from "@/lib/mentorias/mentorias"
import type { Mentor } from "@/types/mentoria"

const COLORS: Record<GoalStatus, string> = {
  atingiu: "#059669",
  nao_atingiu: "var(--destructive)",
  em_andamento: "var(--muted-foreground)",
}

function renderValueLabel({ cx, cy, midAngle, outerRadius, value }: any) {
  const RADIAN = Math.PI / 180
  const radius = outerRadius + 18
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" className="fill-foreground text-xs font-bold tabular-nums">
      {value}
    </text>
  )
}

export default function GoalAdherenceChart({ mentores }: { mentores: Mentor[] }) {
  const data = getGoalAdherence(mentores)

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b py-4 px-5">
        <CardTitle className="text-base font-semibold">Aderência à meta (mentor × mês)</CardTitle>
      </CardHeader>
      <CardContent className="pt-5 px-5 pb-5">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 30, right: 40, bottom: 30, left: 40 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              label={renderValueLabel}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell key={entry.statusKey} fill={COLORS[entry.statusKey]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                color: "var(--popover-foreground)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
