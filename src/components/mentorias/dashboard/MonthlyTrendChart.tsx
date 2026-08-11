import { useState } from "react"
import { Bar, CartesianGrid, ComposedChart, Legend, Line, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { getMonthlyTrend } from "@/lib/mentorias/mentorias"
import type { Mentor } from "@/types/mentoria"

type Aba = "linhas" | "barras"

function TabToggle({ aba, onChange }: { aba: Aba; onChange: (aba: Aba) => void }) {
  return (
    <div className="flex items-center gap-0.5 rounded-full bg-muted p-0.5">
      {(["barras", "linhas"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
            aba === option ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default function MonthlyTrendChart({ mentores }: { mentores: Mentor[] }) {
  const metaTotal = mentores.reduce((soma, mentor) => soma + mentor.metaMensal, 0)
  const julhoParcial = mentores.reduce((soma, mentor) => {
    const julho = mentor.meses.find((m) => m.mes === "Julho")
    const parcial = julho ? julho.semanas.reduce((s: number, v) => s + (v ?? 0), 0) : 0
    return soma + parcial
  }, 0)
  const data = getMonthlyTrend(mentores).map((d) =>
    d.mes === "Julho" ? { ...d, sessoes: julhoParcial, meta: d.meta ?? metaTotal } : d,
  )
  const [aba, setAba] = useState<Aba>("barras")

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b py-4 px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">Sessões realizadas por mês</CardTitle>
            <CardDescription>Total de sessões concluídas em cada mês do período.</CardDescription>
          </div>
          <TabToggle aba={aba} onChange={setAba} />
        </div>
      </CardHeader>
      <CardContent className="pt-5 px-5 pb-4">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} allowDecimals={false} />
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
            {aba === "barras" ? (
              <Bar dataKey="sessoes" name="Sessões realizadas" fill="var(--chart-1)" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="sessoes" position="top" style={{ fontSize: 12, fill: "var(--foreground)" }} />
              </Bar>
            ) : (
              <Line type="monotone" dataKey="sessoes" name="Sessões realizadas" stroke="var(--chart-1)" strokeWidth={2} dot connectNulls>
                <LabelList dataKey="sessoes" position="top" style={{ fontSize: 12, fill: "var(--foreground)" }} />
              </Line>
            )}
            <Line
              type="monotone"
              dataKey="meta"
              name="Meta total do mês"
              stroke="var(--warning)"
              strokeWidth={2}
              dot
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
