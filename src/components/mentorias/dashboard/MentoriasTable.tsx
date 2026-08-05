import { Fragment, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { MESES, getStatus, getTableRows } from "@/lib/mentorias/mentorias"
import type { GoalStatus } from "@/lib/mentorias/mentorias"
import type { Mentor } from "@/types/mentoria"

const STATUS_OPTIONS: { label: string; value: GoalStatus | "todos" }[] = [
  { label: "Todos os status", value: "todos" },
  { label: "Atingiu meta", value: "atingiu" },
  { label: "Não atingiu", value: "nao_atingiu" },
  { label: "Em andamento", value: "em_andamento" },
]

const CORES_LINHA = [
  "#4CC2CF",
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#d97706",
  "#0891b2",
  "#db2777",
  "#65a30d",
  "#4b5563",
  "#0d9488",
]

function SessoesBadge({ status, valor, semanas }: { status: GoalStatus; valor: number | null; semanas: (number | null)[] }) {
  if (status === "em_andamento") {
    const parcial = semanas.reduce((soma: number, s) => soma + (s ?? 0), 0)
    return (
      <Badge variant="outline" className="rounded-full font-medium text-muted-foreground">
        {parcial > 0 ? parcial : "—"}
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full font-medium",
        status === "atingiu"
          ? "border-emerald-600/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "border-destructive/30 bg-destructive/5 text-destructive",
      )}
    >
      {valor}
    </Badge>
  )
}

type Aba = "tabela" | "grafico"

export default function MentoriasTable({ mentores }: { mentores: Mentor[] }) {
  const rows = useMemo(() => getTableRows(mentores), [mentores])

  const [mentorFiltro, setMentorFiltro] = useState("todos")
  const [mesFiltro, setMesFiltro] = useState("todos")
  const [statusFiltro, setStatusFiltro] = useState<GoalStatus | "todos">("todos")
  const [busca, setBusca] = useState("")
  const [expandido, setExpandido] = useState<string | null>(null)
  const [aba, setAba] = useState<Aba>("tabela")

  const mentoresFiltrados = mentores.filter((mentor) => {
    if (mentorFiltro !== "todos" && mentor.id !== mentorFiltro) return false
    if (busca && !mentor.nome.toLowerCase().includes(busca.toLowerCase())) return false
    if (statusFiltro !== "todos") {
      if (mesFiltro !== "todos") {
        const mes = mentor.meses.find((m) => m.mes === mesFiltro)
        if (!mes || getStatus(mes, mentor.metaMensal) !== statusFiltro) return false
      } else {
        const algumMesBate = mentor.meses.some((mes) => getStatus(mes, mentor.metaMensal) === statusFiltro)
        if (!algumMesBate) return false
      }
    }
    return true
  })

  const chartData = MESES.map((mesNome) => {
    const ponto: Record<string, number | string | null> = { mes: mesNome }
    for (const mentor of mentoresFiltrados) {
      const row = rows.find((r) => r.mentorId === mentor.id && r.mes === mesNome)
      if (!row) {
        ponto[mentor.nome] = null
      } else if (row.sessoesRealizadas !== null) {
        ponto[mentor.nome] = row.sessoesRealizadas
      } else {
        const parcial = row.semanas.reduce((soma: number, s) => soma + (s ?? 0), 0)
        ponto[mentor.nome] = parcial
      }
    }
    return ponto
  })

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="border-b py-4 px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold">Detalhamento por mentor e mês</CardTitle>
          <div className="flex items-center gap-0.5 rounded-full bg-muted p-0.5">
            {(["tabela", "grafico"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setAba(option)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
                  aba === option ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="relative w-full max-w-[220px]">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar mentor..."
              className="h-9 pl-8 text-xs"
            />
          </div>
          <Select value={mentorFiltro} onValueChange={setMentorFiltro}>
            <SelectTrigger className="h-9 w-[160px] text-xs">
              <SelectValue placeholder="Mentor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os mentores</SelectItem>
              {mentores.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={mesFiltro} onValueChange={setMesFiltro}>
            <SelectTrigger className="h-9 w-[130px] text-xs">
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
          <Select value={statusFiltro} onValueChange={(v) => setStatusFiltro(v as GoalStatus | "todos")}>
            <SelectTrigger className="h-9 w-[150px] text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      {aba === "grafico" ? (
        <CardContent className="pt-5 px-5 pb-5">
          {mentoresFiltrados.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">Nenhum registro encontrado para os filtros selecionados.</p>
          ) : (
            <ResponsiveContainer width="100%" height={340}>
              <LineChart data={chartData}>
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
                {mentoresFiltrados.map((mentor, i) => (
                  <Line
                    key={mentor.id}
                    type="monotone"
                    dataKey={mentor.nome}
                    stroke={CORES_LINHA[i % CORES_LINHA.length]}
                    strokeWidth={2}
                    dot
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      ) : (
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-5 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Mentor</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Mentorados</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Meta</th>
                {MESES.map((mes) => (
                  <th key={mes} className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {mes}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mentoresFiltrados.map((mentor) => {
                const isExpandido = expandido === mentor.id
                return (
                  <Fragment key={mentor.id}>
                    <tr
                      onClick={() => setExpandido(isExpandido ? null : mentor.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setExpandido(isExpandido ? null : mentor.id)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isExpandido}
                      className="cursor-pointer hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    >
                      <td className="px-5 py-3 font-medium text-foreground whitespace-nowrap">{mentor.nome}</td>
                      <td className="px-3 py-3 text-center tabular-nums text-muted-foreground">{mentor.qtdeMentorados}</td>
                      <td className="px-3 py-3 text-center tabular-nums text-muted-foreground">{mentor.metaMensal}</td>
                      {mentor.meses.map((mes) => (
                        <td key={mes.mes} className="px-3 py-3 text-center">
                          <SessoesBadge status={getStatus(mes, mentor.metaMensal)} valor={mes.total} semanas={mes.semanas} />
                        </td>
                      ))}
                    </tr>
                    {isExpandido && (
                      <tr className="bg-muted/20">
                        <td colSpan={3 + MESES.length} className="px-5 py-3 text-xs text-muted-foreground">
                          <div className="flex flex-col gap-2">
                            {mentor.meses.map((mes) => (
                              <div key={mes.mes}>
                                <span className="font-semibold text-foreground">{mes.mes}:</span>{" "}
                                <span className="inline-flex flex-wrap gap-x-6 gap-y-1">
                                  {mes.semanas.map((s, i) => (
                                    <span key={i}>
                                      <span className="font-semibold text-foreground">Semana {i + 1}:</span> {s ?? "—"}
                                    </span>
                                  ))}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
          {mentoresFiltrados.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">Nenhum registro encontrado para os filtros selecionados.</p>
          )}
        </CardContent>
      )}
    </Card>
  )
}
