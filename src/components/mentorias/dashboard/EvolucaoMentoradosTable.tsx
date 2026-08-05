import { Fragment, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { MESES_EVOLUCAO_MENTORADOS, getEvolucaoMentorados } from "@/lib/mentorias/mentorias"
import type { MesAdesao } from "@/types/mentoria"

type StatusFiltro = "todos" | "atingiu" | "nao_atingiu"

const STATUS_OPTIONS: { label: string; value: StatusFiltro }[] = [
  { label: "Todos os status", value: "todos" },
  { label: "Atingiu meta", value: "atingiu" },
  { label: "Não atingiu", value: "nao_atingiu" },
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
]

function formatAdesao(value: number): string {
  return Number.isInteger(value) ? `${value}%` : `${value.toFixed(2).replace(".", ",")}%`
}

function AdesaoBadge({ mes, meta }: { mes: MesAdesao; meta: number }) {
  if (mes.media === null) return null
  const atingiu = mes.media >= meta
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full font-medium",
        atingiu
          ? "border-emerald-600/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "border-destructive/30 bg-destructive/5 text-destructive",
      )}
    >
      {formatAdesao(mes.media)}
    </Badge>
  )
}

type Aba = "tabela" | "grafico"

export default function EvolucaoMentoradosTable() {
  const evolucao = getEvolucaoMentorados()

  const [aba, setAba] = useState<Aba>("tabela")
  const [busca, setBusca] = useState("")
  const [mentoradoFiltro, setMentoradoFiltro] = useState("todos")
  const [mesFiltro, setMesFiltro] = useState("todos")
  const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>("todos")
  const [expandido, setExpandido] = useState<string | null>(null)

  const filtrados = useMemo(
    () =>
      evolucao.filter((mentorado) => {
        if (mentoradoFiltro !== "todos" && mentorado.nome !== mentoradoFiltro) return false
        if (busca && !mentorado.nome.toLowerCase().includes(busca.toLowerCase())) return false
        if (statusFiltro !== "todos") {
          const valor =
            mesFiltro === "todos" ? mentorado.mediaTotal : mentorado.meses.find((m) => m.mes === mesFiltro)?.media ?? null
          if (valor === null) return false
          const atingiu = valor >= mentorado.meta
          if (statusFiltro === "atingiu" && !atingiu) return false
          if (statusFiltro === "nao_atingiu" && atingiu) return false
        }
        return true
      }),
    [evolucao, mentoradoFiltro, busca, mesFiltro, statusFiltro],
  )

  const mediasPorMes = useMemo(
    () =>
      MESES_EVOLUCAO_MENTORADOS.map((mesNome) => {
        const valores = filtrados
          .map((mentorado) => mentorado.meses.find((m) => m.mes === mesNome)?.media)
          .filter((v): v is number => v !== null && v !== undefined)
        if (valores.length === 0) return null
        return valores.reduce((soma, v) => soma + v, 0) / valores.length
      }),
    [filtrados],
  )

  const mediaGeralFiltrados =
    filtrados.length === 0 ? null : filtrados.reduce((soma, m) => soma + m.mediaTotal, 0) / filtrados.length

  const chartData = MESES_EVOLUCAO_MENTORADOS.map((mesNome) => {
    const ponto: Record<string, number | string | null> = { mes: mesNome }
    for (const mentorado of filtrados) {
      const mes = mentorado.meses.find((m) => m.mes === mesNome)
      ponto[mentorado.nome] = mes ? mes.media : null
    }
    return ponto
  })

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="border-b py-4 px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">Evolução dos mentorados na visão dos mentores</CardTitle>
            <CardDescription>Adesão mensal (% de semanas com mentoria realizada) por mentorado</CardDescription>
          </div>
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
              placeholder="Buscar mentorado..."
              className="h-9 pl-8 text-xs"
            />
          </div>
          <Select value={mentoradoFiltro} onValueChange={setMentoradoFiltro}>
            <SelectTrigger className="h-9 w-[170px] text-xs">
              <SelectValue placeholder="Mentorado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os mentorados</SelectItem>
              {evolucao.map((m) => (
                <SelectItem key={m.nome} value={m.nome}>
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
              {MESES_EVOLUCAO_MENTORADOS.map((mes) => (
                <SelectItem key={mes} value={mes}>
                  {mes}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFiltro} onValueChange={(v) => setStatusFiltro(v as StatusFiltro)}>
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

      {aba === "tabela" ? (
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-5 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Mentorado</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Meta</th>
                {MESES_EVOLUCAO_MENTORADOS.map((mes) => (
                  <th key={mes} className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {mes}
                  </th>
                ))}
                <th className="px-5 py-2.5 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Média total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtrados.map((mentorado) => {
                const isExpandido = expandido === mentorado.nome
                return (
                  <Fragment key={mentorado.nome}>
                    <tr
                      onClick={() => setExpandido(isExpandido ? null : mentorado.nome)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setExpandido(isExpandido ? null : mentorado.nome)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isExpandido}
                      className="cursor-pointer hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    >
                      <td className="px-5 py-3 font-medium text-foreground whitespace-nowrap">{mentorado.nome}</td>
                      <td className="px-3 py-3 text-center tabular-nums text-muted-foreground">{mentorado.meta}%</td>
                      {MESES_EVOLUCAO_MENTORADOS.map((mesNome) => {
                        const mes = mentorado.meses.find((m) => m.mes === mesNome)
                        return (
                          <td key={mesNome} className="px-3 py-3 text-center">
                            {mes ? <AdesaoBadge mes={mes} meta={mentorado.meta} /> : "—"}
                          </td>
                        )
                      })}
                      <td
                        className={cn(
                          "px-5 py-3 text-right font-semibold tabular-nums",
                          mentorado.mediaTotal >= mentorado.meta ? "text-emerald-700 dark:text-emerald-400" : "text-destructive",
                        )}
                      >
                        {formatAdesao(mentorado.mediaTotal)}
                      </td>
                    </tr>
                    {isExpandido && (
                      <tr className="bg-muted/20">
                        <td colSpan={2 + MESES_EVOLUCAO_MENTORADOS.length + 1} className="px-5 py-3">
                          <p className="mb-2 text-xs font-medium text-muted-foreground">
                            O mentorado evoluiu de forma clara com relação aos pontos discutidos nas semanas anteriores?
                          </p>
                          <div className="flex gap-6 text-xs text-muted-foreground">
                            <span>
                              Sim: <span className="font-semibold text-foreground">{mentorado.evolucaoClara?.sim ?? "—"}</span>
                            </span>
                            <span>
                              Não: <span className="font-semibold text-foreground">{mentorado.evolucaoClara?.nao ?? "—"}</span>
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
            {filtrados.length > 0 && (
              <tfoot>
                <tr className="border-t-2 border-border">
                  <td className="px-5 py-2.5 font-semibold text-foreground">Média geral</td>
                  <td className="px-3 py-2.5" />
                  {mediasPorMes.map((media, i) => (
                    <td key={MESES_EVOLUCAO_MENTORADOS[i]} className="px-3 py-2.5 text-center">
                      {media === null ? (
                        <span className="text-xs text-muted-foreground">—</span>
                      ) : (
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full font-semibold",
                            media >= 80
                              ? "border-emerald-600/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "border-destructive/30 bg-destructive/5 text-destructive",
                          )}
                        >
                          {formatAdesao(media)}
                        </Badge>
                      )}
                    </td>
                  ))}
                  <td
                    className={cn(
                      "px-5 py-2.5 text-right font-semibold tabular-nums",
                      mediaGeralFiltrados !== null && mediaGeralFiltrados >= 80
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-destructive",
                    )}
                  >
                    {mediaGeralFiltrados !== null && formatAdesao(mediaGeralFiltrados)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
          {filtrados.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">Nenhum mentorado encontrado para os filtros selecionados.</p>
          )}
        </CardContent>
      ) : filtrados.length === 0 ? (
        <CardContent className="pt-5 px-5 pb-5">
          <p className="py-6 text-center text-sm text-muted-foreground">Nenhum mentorado encontrado para os filtros selecionados.</p>
        </CardContent>
      ) : (
        <CardContent className="pt-5 px-5 pb-5">
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(value) => (typeof value === "number" ? `${value}%` : value)}
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 12,
                  color: "var(--popover-foreground)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }} />
              {filtrados.map((mentorado) => (
                <Line
                  key={mentorado.nome}
                  type="monotone"
                  dataKey={mentorado.nome}
                  stroke={CORES_LINHA[evolucao.indexOf(mentorado) % CORES_LINHA.length]}
                  strokeWidth={2}
                  dot
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  )
}
