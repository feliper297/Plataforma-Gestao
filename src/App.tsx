import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  Check,
  Folder,
  GitCompareArrows,
  GraduationCap,
  Info,
  ListChecks,
  Lock,
  Megaphone,
  Moon,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  TrendingUp,
  TriangleAlert,
  Users,
  ChevronRight,
  X,
  type LucideIcon,
} from "lucide-react"

import LoginPage from "@/components/LoginPage"
import SignUpPage from "@/components/SignUpPage"
import { Sidebar } from "@/components/Sidebar"
import { UserMenu } from "@/components/UserMenu"
import FigmaExport, { type FigmaExportScreen } from "@/pages/FigmaExport"
import RelatorioMentorias from "@/pages/RelatorioMentorias"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// ── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string
  value: string
  valueClass?: string
  subtext: string
  icon: React.ReactNode
}

function KpiCard({ label, value, valueClass = "text-foreground", subtext, icon }: KpiCardProps) {
  return (
    <Card className="flex-1 shadow-sm">
      <CardHeader className="pb-2 pt-5 px-5 space-y-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </CardTitle>
          <span className="text-muted-foreground [&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-5 px-5 space-y-1.5">
        <p className={`text-4xl font-bold tracking-tight tabular-nums ${valueClass}`}>{value}</p>
        <CardDescription className="text-xs">{subtext}</CardDescription>
      </CardContent>
    </Card>
  )
}

// ── Mentee Row ───────────────────────────────────────────────────────────────

function MenteeRow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-accent transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-warning text-warning-foreground text-xs font-bold">M</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-foreground leading-none">Mentorado</span>
            <Badge variant="warning" className="gap-1 px-1.5 h-4 text-[10px] rounded-full leading-none">
              <TriangleAlert className="h-2.5 w-2.5" />
              Atenção
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">Execução</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-bold text-foreground tabular-nums leading-none">—</span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">nota</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-bold text-foreground tabular-nums leading-none">0</span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">reun./30d</span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </button>
  )
}

// ── Mentee Detail Sheet ────────────────────────────────────────────────────────

interface Combinado {
  id: number
  texto: string
  tag?: string
  status: "ativo" | "concluído"
}

const INITIAL_COMBINADOS: Combinado[] = [
  {
    id: 1,
    texto:
      "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    status: "ativo",
  },
  { id: 2, texto: "teste", tag: "tt", status: "ativo" },
]

function CombinadoTab() {
  const [combinados, setCombinados] = useState<Combinado[]>(INITIAL_COMBINADOS)
  const [texto, setTexto] = useState("")
  const [tag, setTag] = useState("")

  function handleRemove(id: number) {
    setCombinados((prev) => prev.filter((item) => item.id !== id))
  }

  function handleAdd() {
    if (!texto.trim()) return
    setCombinados((prev) => [
      ...prev,
      { id: (prev.at(-1)?.id ?? 0) + 1, texto: texto.trim(), tag: tag.trim() || undefined, status: "ativo" },
    ])
    setTexto("")
    setTag("")
  }

  return (
    <div className="space-y-3">
      {combinados.map((item, index) => (
        <div key={item.id} className="relative rounded-lg bg-muted/40 px-4 py-3.5 pr-10">
          <button
            onClick={() => handleRemove(item.id)}
            className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Remover</span>
          </button>
          <p className="text-sm text-foreground break-words">
            <span className="mr-1.5 text-muted-foreground">{index + 1}.</span>
            {item.texto}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {item.tag && (
              <Badge variant="warning" className="rounded-full font-medium">
                {item.tag}
              </Badge>
            )}
            <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-medium">
              {item.status}
            </Badge>
          </div>
        </div>
      ))}

      <Card className="shadow-none bg-muted/40 border-0">
        <CardContent className="p-4 space-y-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Novo combinado</p>
          <Textarea
            placeholder="Descreva o combinado..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="bg-background"
          />
          <Input
            placeholder="Tag (opcional)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="bg-background"
          />
          <Button className="w-full" disabled={!texto.trim()} onClick={handleAdd}>
            Adicionar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function MenteeDetailSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col p-0">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="bg-warning text-warning-foreground text-sm font-bold">FR</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>Felipe Rodrigues</SheetTitle>
              <SheetDescription>feliper297@gmail.com</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Tabs
          defaultValue={new URLSearchParams(window.location.search).get("menteeTab") ?? "visao-geral"}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="px-6 pt-4">
            <TabsList>
              <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
              <TabsTrigger value="combinado">Combinado</TabsTrigger>
              <TabsTrigger value="feedbacks">Feedbacks</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-5">
            <TabsContent value="visao-geral" className="mt-0 space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 shrink-0">
                    <AvatarFallback className="bg-warning text-warning-foreground text-sm font-bold">FR</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold leading-none text-foreground">Felipe Rodrigues</p>
                    <p className="text-xs text-muted-foreground">feliper297@gmail.com</p>
                    <Badge
                      variant="outline"
                      className="rounded-full border-primary/30 bg-primary/5 text-primary font-medium"
                    >
                      test2
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <span className="text-2xl font-bold tracking-tight tabular-nums text-foreground">3.3</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">nota</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-muted/40 px-3 py-3.5 text-center">
                  <p className="text-xl font-bold tracking-tight tabular-nums text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Reuniões (30d)</p>
                </div>
                <div className="rounded-lg bg-muted/40 px-3 py-3.5 text-center">
                  <p className="text-xl font-bold tracking-tight tabular-nums text-foreground">1</p>
                  <p className="text-xs text-muted-foreground">Mentores</p>
                </div>
                <div className="rounded-lg bg-muted/40 px-3 py-3.5 text-center">
                  <p className="text-xl font-bold tracking-tight tabular-nums text-foreground">04/ago</p>
                  <p className="text-xs text-muted-foreground">Próxima reunião</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="combinado" className="mt-0">
              <CombinadoTab />
            </TabsContent>

            <TabsContent value="feedbacks" className="mt-0 space-y-5">
              <div className="space-y-1.5">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Exemplos destacados desta mentalidade
                </p>
                <p className="text-sm text-muted-foreground">Nenhum item registrado.</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Pontos a melhorar
                </p>
                <p className="text-sm text-muted-foreground">Nenhum item registrado.</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

// ── Analytics Dashboard ─────────────────────────────────────────────────────

const INACTIVE_MENTORS = ["Alejandro", "Daniel", "Davi", "Matheus", "Tonny"]

const MONTHLY_SESSIONS = [
  { month: "Março", value: 32 },
  { month: "Abril", value: 37 },
  { month: "Maio", value: 48 },
  { month: "Junho", value: 38 },
  { month: "Julho", value: 20 },
]

const MONTHLY_GOAL = 53

const ADHERENCE_SEGMENTS = [
  { label: "Atingiu meta", value: 22, color: "#059669" },
  { label: "Não atingiu", value: 18, color: "var(--destructive)" },
  { label: "Em andamento", value: 10, color: "#9ca3af" },
]

type GoalStatus = "atingiu" | "andamento" | "nao-atingiu"

const STATUS_LABEL: Record<GoalStatus, string> = {
  atingiu: "Atingiu meta",
  andamento: "Em andamento",
  "nao-atingiu": "Não atingiu",
}

const STATUS_BADGE_CLASS: Record<GoalStatus, string> = {
  atingiu: "border-emerald-600/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  andamento: "border-warning/30 bg-warning-muted text-warning-muted-foreground",
  "nao-atingiu": "border-destructive/30 bg-destructive/5 text-destructive",
}

function StatusBadge({ status }: { status: GoalStatus }) {
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium whitespace-nowrap", STATUS_BADGE_CLASS[status])}>
      {STATUS_LABEL[status]}
    </Badge>
  )
}

interface MentorPerformanceRow {
  name: string
  mentees: number
  goal: number
  mar: number
  abr: number
  mai: number
  jun: number
  jul: number
  status: GoalStatus
}

const MENTOR_PERFORMANCE: MentorPerformanceRow[] = [
  { name: "Alexandre", mentees: 4, goal: 8, mar: 2, abr: 0, mai: 7, jun: 8, jul: 7, status: "andamento" },
  { name: "Davi", mentees: 3, goal: 6, mar: 3, abr: 7, mai: 6, jun: 6, jul: 3, status: "nao-atingiu" },
  { name: "João", mentees: 2, goal: 4, mar: 4, abr: 4, mai: 4, jun: 0, jul: 2, status: "nao-atingiu" },
  { name: "Marina", mentees: 5, goal: 10, mar: 8, abr: 9, mai: 10, jun: 10, jul: 10, status: "atingiu" },
  { name: "Pedro", mentees: 3, goal: 6, mar: 6, abr: 6, mai: 5, jun: 6, jul: 6, status: "atingiu" },
]

interface MenteeAdherenceRow {
  name: string
  goal: number
  abr: number
  mai: number
  jun: number
  jul: number
  average: number
  status: GoalStatus
}

const MENTEE_ADHERENCE: MenteeAdherenceRow[] = [
  { name: "Ryan", goal: 80, abr: 100, mai: 100, jun: 100, jul: 100, average: 100, status: "atingiu" },
  { name: "Minoro", goal: 80, abr: 50, mai: 50, jun: 0, jul: 0, average: 25, status: "nao-atingiu" },
  { name: "Viana", goal: 80, abr: 66.67, mai: 83.33, jun: 100, jul: 100, average: 87.5, status: "atingiu" },
  { name: "Felipe", goal: 80, abr: 80, mai: 90, jun: 70, jul: 85, average: 81.25, status: "atingiu" },
  { name: "Bruna", goal: 80, abr: 60, mai: 70, jun: 75, jul: 65, average: 67.5, status: "andamento" },
]

function pct(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(2)}%`
}

const CHART_MARGIN = { top: 16, right: 16, bottom: 30, left: 34 }
const CHART_WIDTH = 620
const CHART_HEIGHT = 260
const CHART_Y_MAX = 60
const CHART_Y_TICKS = [0, 15, 30, 45, 60]

function SessionsChart({ mode }: { mode: "barras" | "linhas" }) {
  const plotWidth = CHART_WIDTH - CHART_MARGIN.left - CHART_MARGIN.right
  const plotHeight = CHART_HEIGHT - CHART_MARGIN.top - CHART_MARGIN.bottom
  const bandWidth = plotWidth / MONTHLY_SESSIONS.length
  const barWidth = 34

  const yFor = (value: number) => CHART_MARGIN.top + plotHeight - (value / CHART_Y_MAX) * plotHeight
  const xFor = (index: number) => CHART_MARGIN.left + bandWidth * index + bandWidth / 2

  const sessionsPoints = MONTHLY_SESSIONS.map((item, index) => ({
    x: xFor(index),
    y: yFor(item.value),
    value: item.value,
  }))
  const goalPoints = MONTHLY_SESSIONS.map((_, index) => ({ x: xFor(index), y: yFor(MONTHLY_GOAL) }))

  const linePath = (points: { x: number; y: number }[]) =>
    points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="w-full h-auto" role="img" aria-label="Sessões realizadas por mês">
      {CHART_Y_TICKS.map((tick) => (
        <g key={tick}>
          <line
            x1={CHART_MARGIN.left}
            x2={CHART_WIDTH - CHART_MARGIN.right}
            y1={yFor(tick)}
            y2={yFor(tick)}
            stroke="currentColor"
            className="text-border"
            strokeDasharray="3 3"
          />
          <text x={CHART_MARGIN.left - 8} y={yFor(tick)} textAnchor="end" dominantBaseline="middle" className="fill-muted-foreground text-[10px]">
            {tick}
          </text>
        </g>
      ))}

      {mode === "barras" &&
        sessionsPoints.map((p) => (
          <rect
            key={p.x}
            x={p.x - barWidth / 2}
            y={p.y}
            width={barWidth}
            height={CHART_MARGIN.top + plotHeight - p.y}
            rx={3}
            className="fill-primary"
          />
        ))}

      {mode === "linhas" && (
        <>
          <path d={linePath(sessionsPoints)} fill="none" className="stroke-primary" strokeWidth={2.5} />
          {sessionsPoints.map((p) => (
            <circle key={p.x} cx={p.x} cy={p.y} r={4} className="fill-primary" />
          ))}
        </>
      )}

      <path d={linePath(goalPoints)} fill="none" stroke="var(--warning)" strokeWidth={2} strokeDasharray="5 4" />
      {goalPoints.map((p) => (
        <circle key={p.x} cx={p.x} cy={p.y} r={3.5} fill="white" stroke="var(--warning)" strokeWidth={2} />
      ))}

      {sessionsPoints.map((p) => (
        <text
          key={`v-${p.x}`}
          x={p.x}
          y={p.y - 10}
          textAnchor="middle"
          className="fill-foreground text-[11px] font-bold tabular-nums"
        >
          {p.value}
        </text>
      ))}

      {MONTHLY_SESSIONS.map((item, index) => (
        <text
          key={item.month}
          x={xFor(index)}
          y={CHART_HEIGHT - 8}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
        >
          {item.month}
        </text>
      ))}
    </svg>
  )
}

function SessionsChartCard() {
  const [mode, setMode] = useState<"barras" | "linhas">("barras")

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b py-4 px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">Sessões realizadas por mês</CardTitle>
            <CardDescription>Total de sessões concluídas em cada mês do período.</CardDescription>
          </div>
          <div className="flex items-center gap-0.5 rounded-full bg-muted p-0.5">
            <button
              onClick={() => setMode("barras")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                mode === "barras" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Barras
            </button>
            <button
              onClick={() => setMode("linhas")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                mode === "linhas" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Linhas
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5 px-5 pb-4 space-y-3">
        <SessionsChart mode={mode} />
        <div className="flex flex-wrap items-center justify-center gap-5">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
            Sessões realizadas
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: "var(--warning)" }} />
            Meta total do mês
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function AdherenceDonut() {
  const total = ADHERENCE_SEGMENTS.reduce((sum, seg) => sum + seg.value, 0)
  const cx = 110
  const cy = 110
  const r = 72
  const strokeWidth = 26
  const circumference = 2 * Math.PI * r
  const gap = 6

  let cumulative = 0
  const arcs = ADHERENCE_SEGMENTS.map((seg) => {
    const fraction = seg.value / total
    const length = Math.max(fraction * circumference - gap, 0)
    const offset = -cumulative * circumference
    const midAngleDeg = cumulative * 360 + fraction * 180 - 90
    const midAngleRad = (midAngleDeg * Math.PI) / 180
    const labelR = r + strokeWidth / 2 + 16
    cumulative += fraction
    return {
      ...seg,
      dasharray: `${length} ${circumference - length}`,
      dashoffset: offset,
      labelX: cx + labelR * Math.cos(midAngleRad),
      labelY: cy + labelR * Math.sin(midAngleRad),
    }
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 220 220" className="h-52 w-52">
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {arcs.map((arc) => (
            <circle
              key={arc.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeDasharray={arc.dasharray}
              strokeDashoffset={arc.dashoffset}
              strokeLinecap="round"
            />
          ))}
        </g>
        {arcs.map((arc) => (
          <text
            key={`label-${arc.label}`}
            x={arc.labelX}
            y={arc.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-sm font-bold tabular-nums"
          >
            {arc.value}
          </text>
        ))}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {ADHERENCE_SEGMENTS.map((seg) => (
          <span key={seg.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
            {seg.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function AdherenceDonutCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b py-4 px-5">
        <CardTitle className="text-base font-semibold">Aderência à meta (mentor × mês)</CardTitle>
      </CardHeader>
      <CardContent className="pt-5 px-5 pb-5">
        <AdherenceDonut />
      </CardContent>
    </Card>
  )
}

function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Relatório de Mentorias</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhamento de sessões realizadas vs. meta, por mentor · Março a Julho
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="Sessões realizadas" value="175" subtext="Março a julho" icon={<Calendar />} />
        <KpiCard label="Mentores ativos" value="10" subtext="No período" icon={<Users />} />
        <KpiCard label="Mentorados atendidos" value="9" subtext="No período" icon={<GraduationCap />} />
        <KpiCard
          label="Taxa de atingimento de meta"
          value="55%"
          valueClass="text-primary"
          subtext="Mentores dentro da meta"
          icon={<TrendingUp />}
        />
      </div>

      <Card className="shadow-sm border-warning/30 bg-warning-muted/40">
        <CardHeader className="py-4 px-5">
          <div className="flex items-start gap-2.5">
            <TriangleAlert className="h-4 w-4 shrink-0 text-warning-muted-foreground mt-0.5" />
            <div className="space-y-0.5">
              <CardTitle className="text-sm font-semibold text-warning-muted-foreground">
                Mentores sem sessão nas últimas 2 semanas
              </CardTitle>
              <CardDescription className="text-xs">
                Considere reagendar ou verificar a disponibilidade desses mentores.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4 px-5 pt-0">
          <div className="flex flex-wrap gap-1.5 pl-6">
            {INACTIVE_MENTORS.map((name) => (
              <Badge key={name} variant="outline" className="rounded-full border-warning/30 bg-background font-medium">
                {name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-stretch">
        <SessionsChartCard />
        <AdherenceDonutCard />
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b py-4 px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Filtros</CardTitle>
              <CardDescription>Refine os dados exibidos nas tabelas abaixo.</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue="todos">
                <SelectTrigger className="h-9 w-[160px] text-xs">
                  <SelectValue placeholder="Mentor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os mentores</SelectItem>
                  {MENTOR_PERFORMANCE.map((m) => (
                    <SelectItem key={m.name} value={m.name}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="todos">
                <SelectTrigger className="h-9 w-[160px] text-xs">
                  <SelectValue placeholder="Mentorado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os mentorados</SelectItem>
                  {MENTEE_ADHERENCE.map((m) => (
                    <SelectItem key={m.name} value={m.name}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="todos">
                <SelectTrigger className="h-9 w-[130px] text-xs">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os meses</SelectItem>
                  {MONTHLY_SESSIONS.map((m) => (
                    <SelectItem key={m.month} value={m.month}>
                      {m.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="todos">
                <SelectTrigger className="h-9 w-[150px] text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="atingiu">Atingiu meta</SelectItem>
                  <SelectItem value="andamento">Em andamento</SelectItem>
                  <SelectItem value="nao-atingiu">Não atingiu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="border-b py-4 px-5">
          <CardTitle className="text-base font-semibold">Desempenho por mentor</CardTitle>
          <CardDescription>Sessões realizadas por mês em relação à meta.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-5 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Mentor
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Mentorados
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Meta
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Mar
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Abr
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Mai
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Jun
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Jul
                </th>
                <th className="px-5 py-2.5 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MENTOR_PERFORMANCE.map((row) => (
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
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="border-b py-4 px-5">
          <CardTitle className="text-base font-semibold">Aderência dos mentorados</CardTitle>
          <CardDescription>Percentual de participação semanal em relação à meta de {pct(80)}.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-5 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Mentorado
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Meta
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Abr
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Mai
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Jun
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Jul
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Média total
                </th>
                <th className="px-5 py-2.5 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MENTEE_ADHERENCE.map((row) => (
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
        </CardContent>
      </Card>
    </div>
  )
}

// ── Dashboard tabs ────────────────────────────────────────────────────────────

const MENTOR_PERIOD_OPTIONS = [
  { value: "15d", label: "Últimos 15 dias" },
  { value: "Março", label: "Março" },
  { value: "Abril", label: "Abril" },
  { value: "Maio", label: "Maio" },
  { value: "Junho", label: "Junho" },
  { value: "Julho", label: "Julho" },
] as const

const MENTOR_PERIOD_DATA: Record<(typeof MENTOR_PERIOD_OPTIONS)[number]["value"], { reunioes: number; meta: number }> = {
  "15d": { reunioes: 0, meta: 2 },
  Março: { reunioes: 2, meta: 2 },
  Abril: { reunioes: 1, meta: 2 },
  Maio: { reunioes: 3, meta: 2 },
  Junho: { reunioes: 2, meta: 2 },
  Julho: { reunioes: 0, meta: 2 },
}

function MentorDashboard() {
  const [menteeDetailOpen, setMenteeDetailOpen] = useState(
    () => new URLSearchParams(window.location.search).get("modal") === "mentee-detalhe",
  )
  const [periodo, setPeriodo] = useState<(typeof MENTOR_PERIOD_OPTIONS)[number]["value"]>("15d")

  const periodoLabel = MENTOR_PERIOD_OPTIONS.find((option) => option.value === periodo)?.label ?? periodo
  const { reunioes, meta } = MENTOR_PERIOD_DATA[periodo]
  const atingiuMeta = reunioes >= meta

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Bom te ver, Mentor</h1>
          <p className="text-sm text-muted-foreground">
            1 pessoa contam com você este mês.{" "}
            <span className="text-destructive font-medium">1 precisa de atenção</span>.
          </p>
        </div>

        <Select value={periodo} onValueChange={(value) => setPeriodo(value as typeof periodo)}>
          <SelectTrigger className="h-9 w-[180px] text-xs">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            {MENTOR_PERIOD_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="Sua nota como mentor"
          value="—"
          valueClass="text-primary"
          subtext="0 avaliações nos últimos 30d"
          icon={<TrendingUp />}
        />
        <KpiCard
          label="Mentorados ativos"
          value="1"
          subtext="1 com alerta"
          icon={<Users />}
        />
        <KpiCard
          label="Reuniões concluídas"
          value={String(reunioes)}
          valueClass={atingiuMeta ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}
          subtext={periodo === "15d" ? `Meta do período: ${meta}` : `Meta do mês: ${meta}`}
          icon={<Calendar />}
        />
        <KpiCard
          label="Aderência (como mentor)"
          value="—"
          subtext="Sem dados suficientes ainda"
          icon={<TrendingUp />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-start">
        <Card className="shadow-sm overflow-hidden">
          <CardHeader className="border-b py-4 px-5">
            <CardTitle className="text-base font-semibold">Seus mentorados</CardTitle>
            <CardDescription>Clique pra ver o detalhe e abrir uma reunião.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <MenteeRow onClick={() => setMenteeDetailOpen(true)} />
          </CardContent>
        </Card>

        <MenteeDetailSheet open={menteeDetailOpen} onOpenChange={setMenteeDetailOpen} />

        <Card className="shadow-sm">
          <CardHeader className="border-b py-4 px-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-warning/20 bg-warning-muted text-warning-muted-foreground">
                  <GitCompareArrows className="size-4" />
                </div>
                <div className="space-y-0.5">
                  <CardTitle className="text-base font-semibold">Divergências</CardTitle>
                  <CardDescription className="text-xs leading-tight">
                    onde sua avaliação diverge da maioria
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="shrink-0 tabular-nums font-mono text-xs h-6 min-w-6 justify-center">
                0
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="py-5 px-5">
            <p className="text-sm text-muted-foreground">
              Nenhuma divergência relevante no momento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FilterPills({
  options,
  active,
  onSelect,
}: {
  options: string[]
  active: string
  onSelect: (option: string) => void
}) {
  return (
    <div className="flex items-center gap-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium leading-none transition-colors",
            option === active
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

interface MeetingRowProps {
  date: string
  month: string
  name: string
  time: string
  role: string
  status?: "late"
  onClick?: () => void
}

function MeetingRow({ date, month, name, time, role, status, onClick }: MeetingRowProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-accent transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center justify-center h-10 w-10 shrink-0 rounded-lg border border-border bg-muted/40">
          <span className="text-sm font-bold leading-none tabular-nums">{date}</span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground leading-none mt-0.5">
            {month}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground leading-none">
            {name} <span className="text-muted-foreground font-normal">· {time}</span>
          </span>
          {status === "late" && (
            <span className="flex items-center gap-1 text-xs text-destructive font-medium">
              <TriangleAlert className="h-3 w-3" />
              atrasada hoje
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
          {role}
        </Badge>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </button>
  )
}

function HistoryRow({
  date,
  name,
  role,
  score,
  onClick,
}: {
  date: string
  name: string
  role: string
  score: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <span className="text-sm text-foreground">
        <span className="text-muted-foreground">{date}</span> · {name}
      </span>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
          {role}
        </Badge>
        <span className="text-sm font-bold text-primary tabular-nums">{score}</span>
      </div>
    </button>
  )
}

const MEETING_TYPES = ["mentoria", "feedback", "feedback formal", "acompanhamento de projeto"] as const

function ScheduleMeetingDialog() {
  const [open, setOpen] = useState(
    () => new URLSearchParams(window.location.search).get("modal") === "agendar-reuniao",
  )
  const [type, setType] = useState<(typeof MEETING_TYPES)[number]>("mentoria")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5 shrink-0">
          <Plus className="h-4 w-4" />
          Agendar reunião
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0">
        <DialogHeader>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Calendar className="h-4.5 w-4.5" />
          </span>
          <DialogTitle>Agendar reunião</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Com quem
            </Label>
            <Select defaultValue="felipe">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="felipe">Felipe Rodrigues</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="meeting-date" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Data
              </Label>
              <Input id="meeting-date" type="date" defaultValue="2026-08-04" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="meeting-time" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Horário
              </Label>
              <Input id="meeting-time" type="time" defaultValue="10:00" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Tipo</Label>
            <div className="flex flex-wrap gap-1.5">
              {MEETING_TYPES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setType(option)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    option === type
                      ? "border-primary/30 bg-primary/10 text-primary font-medium"
                      : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setOpen(false)}>Agendar reunião</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface MeetingDetail {
  dateLabel: string
  menteeName: string
  menteeProject: string
  stage: string
}

interface FeedbackPoint {
  tag: string
  description: string
}

const FEEDBACK_TAG_SUGGESTION = "Foco, Comunicação, Iniciativa..."
const FEEDBACK_DESCRIPTION_SUGGESTION = "Perdeu oportunidades de crescer em um projeto, por conta da comunicação"

function InlineFeedbackForm({
  kind,
  onCancel,
  onAdd,
}: {
  kind: "positivo" | "melhorar"
  onCancel: () => void
  onAdd: (point: FeedbackPoint) => void
}) {
  const [tag, setTag] = useState("")
  const [description, setDescription] = useState("")
  const isPositive = kind === "positivo"

  return (
    <div
      className={cn(
        "space-y-3 rounded-lg border border-dashed px-4 py-4",
        isPositive ? "border-emerald-300 bg-emerald-50/50 dark:bg-emerald-500/5" : "border-amber-300 bg-amber-50/50 dark:bg-amber-500/5",
      )}
    >
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className={cn(
            "rounded-full font-mono text-[10px] font-medium",
            isPositive
              ? "border-amber-300 bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
              : "border-amber-300 bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
          )}
        >
          novo {kind}
        </Badge>
        <button
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Tag (ponto de feedback)
        </Label>
        <Input placeholder={FEEDBACK_TAG_SUGGESTION} value={tag} onChange={(e) => setTag(e.target.value)} />
      </div>

      <button
        type="button"
        onClick={() => setDescription(FEEDBACK_DESCRIPTION_SUGGESTION)}
        className="inline-flex rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground hover:bg-accent transition-colors"
      >
        {FEEDBACK_DESCRIPTION_SUGGESTION}
      </button>

      <div className="space-y-1.5">
        <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Descrição</Label>
        <Textarea
          placeholder="O que aconteceu, com exemplo concreto."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          size="sm"
          disabled={!tag.trim()}
          onClick={() => {
            onAdd({ tag, description })
            onCancel()
          }}
        >
          Adicionar
        </Button>
      </div>
    </div>
  )
}

function MeetingDetailView({ meeting, onBack }: { meeting: MeetingDetail; onBack: () => void }) {
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [positives, setPositives] = useState<FeedbackPoint[]>([])
  const [improvements, setImprovements] = useState<FeedbackPoint[]>([])
  const [addingKind, setAddingKind] = useState<"positivo" | "melhorar" | null>(null)

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Reuniões
      </button>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Reunião — {meeting.dateLabel}</h1>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="rounded-full font-medium">
              mentoria
            </Badge>
            <Badge variant="outline" className="rounded-full font-medium">
              agendada
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            alterar data
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Pencil className="h-3.5 w-3.5" />
            salvar rascunho
          </Button>
          <Button size="sm" className="gap-1.5">
            <Check className="h-3.5 w-3.5" />
            concluir
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-orange-500 text-xs font-bold text-white">A</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Mentor (você)</p>
          </div>
        </div>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-amber-500 text-xs font-bold text-white">
              {initials(meeting.menteeName)}
            </AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="text-sm font-medium text-foreground">{meeting.menteeName}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Mentorado · {meeting.menteeProject}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3">
        <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground mt-0.5" />
        <p className="text-xs text-muted-foreground">
          Ao concluir, esta reunião vira um <span className="font-semibold text-foreground">snapshot imutável</span> —
          não dá pra editar depois.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-stretch">
        <Card className="shadow-sm">
          <CardHeader className="pb-0 pt-5 px-5">
            <div className="flex items-center gap-1.5">
              <CardTitle className="text-sm font-semibold">Avaliação global</CardTitle>
              <span className="text-xs text-muted-foreground">(1 a 4)</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 py-5 px-5">
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 1, label: "muito ruim" },
                { value: 2, label: "ruim" },
                { value: 3, label: "bom" },
                { value: 4, label: "muito bom" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedScore(option.value)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 rounded-lg border py-3 transition-colors",
                    selectedScore === option.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/30 text-muted-foreground hover:bg-accent",
                  )}
                >
                  <span className="text-lg font-bold tabular-nums">{option.value}</span>
                  <span className="text-[10px] font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Estágio de evolução
              </Label>
              <Select defaultValue={meeting.stage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BACKOFFICE_STAGES.map((stage) => (
                    <SelectItem key={stage.name} value={stage.name}>
                      {stage.name}
                    </SelectItem>
                  ))}
                  <SelectItem value={meeting.stage}>{meeting.stage}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Comentário visível ao mentorado
              </Label>
              <Textarea placeholder="" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Nota privada (apenas admin)
              </Label>
              <Textarea placeholder="—" className="min-h-9" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm h-full">
          <CardHeader className="pb-0 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Sugerir promoção</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 py-5 px-5">
            <p className="text-xs text-muted-foreground">
              Estágio atual: <span className="font-semibold text-foreground">{meeting.stage}</span> · apenas o admin
              altera o estágio oficial.
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="outline" className="rounded-full font-medium cursor-pointer hover:bg-accent">
                não sugerir
              </Badge>
              <Badge variant="outline" className="rounded-full font-medium gap-1 cursor-pointer hover:bg-accent">
                <Star className="h-3 w-3" />
                {meeting.stage}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-0 pt-5 px-5">
          <div className="flex items-center gap-1.5">
            <CardTitle className="text-sm font-semibold">Pontos de feedback</CardTitle>
            <span className="text-xs text-muted-foreground">máx 2 positivos · 2 a melhorar</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 py-5 px-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              positivos · {positives.length}/2
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
              a melhorar · {improvements.length}/2
            </span>
          </div>

          {(positives.length > 0 || improvements.length > 0) && (
            <div className="space-y-2">
              {positives.map((point, index) => (
                <div key={`pos-${index}`} className="flex items-start gap-2.5 rounded-lg border border-border px-3.5 py-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 mt-1.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{point.tag}</p>
                    {point.description && <p className="text-xs text-muted-foreground">{point.description}</p>}
                  </div>
                </div>
              ))}
              {improvements.map((point, index) => (
                <div key={`imp-${index}`} className="flex items-start gap-2.5 rounded-lg border border-border px-3.5 py-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-destructive mt-1.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{point.tag}</p>
                    {point.description && <p className="text-xs text-muted-foreground">{point.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {addingKind ? (
            <InlineFeedbackForm
              kind={addingKind}
              onCancel={() => setAddingKind(null)}
              onAdd={(point) => {
                if (addingKind === "positivo") {
                  setPositives((prev) => [...prev, point])
                } else {
                  setImprovements((prev) => [...prev, point])
                }
              }}
            />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={positives.length >= 2}
                onClick={() => setAddingKind("positivo")}
              >
                <Plus className="h-3.5 w-3.5" />
                positivo
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={improvements.length >= 2}
                onClick={() => setAddingKind("melhorar")}
              >
                <Plus className="h-3.5 w-3.5" />
                a melhorar
              </Button>
            </div>
          )}

          {positives.length === 0 && improvements.length === 0 && !addingKind && (
            <p className="text-sm text-muted-foreground">Nenhum ponto adicionado ainda.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const ADERENCIA_BY_ROLE: Record<"Todas" | "Como mentor" | "Como mentorado", { d30: number; d12m: number }> = {
  Todas: { d30: 75, d12m: 75 },
  "Como mentor": { d30: 80, d12m: 78 },
  "Como mentorado": { d30: 70, d12m: 72 },
}

const HISTORICO_REUNIOES = [
  {
    date: "05/ago",
    name: "Felipe Rodrigues",
    role: "Mentor" as const,
    score: "4.0",
    dateLabel: "5 de ago. de 2026, 10:00",
    menteeProject: "test2",
    stage: "test2",
  },
  {
    date: "04/ago",
    name: "Felipe Rodrigues",
    role: "Mentor" as const,
    score: "3.0",
    dateLabel: "4 de ago. de 2026, 10:00",
    menteeProject: "test2",
    stage: "test2",
  },
  {
    date: "03/ago",
    name: "Felipe Rodrigues",
    role: "Mentor" as const,
    score: "3.0",
    dateLabel: "3 de ago. de 2026, 10:00",
    menteeProject: "test2",
    stage: "test2",
  },
]

function ReunioesDashboard() {
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDetail | null>(() =>
    new URLSearchParams(window.location.search).get("modal") === "detalhe-reuniao"
      ? { dateLabel: "5 de ago. de 2026, 10:00", menteeName: "Felipe Rodrigues", menteeProject: "test2", stage: "test2" }
      : null,
  )
  const [aderenciaFiltro, setAderenciaFiltro] = useState<"Todas" | "Como mentor" | "Como mentorado">("Todas")
  const [agendadasFiltro, setAgendadasFiltro] = useState<"Todas" | "Mentor" | "Mentorado">("Todas")
  const [historicoFiltro, setHistoricoFiltro] = useState<"Todas" | "Mentor" | "Mentorado">("Todas")

  if (selectedMeeting) {
    return <MeetingDetailView meeting={selectedMeeting} onBack={() => setSelectedMeeting(null)} />
  }

  const aderencia = ADERENCIA_BY_ROLE[aderenciaFiltro]
  const historicoFiltrado = HISTORICO_REUNIOES.filter(
    (item) => historicoFiltro === "Todas" || item.role === historicoFiltro,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Próximas conversas</h1>
          <p className="text-sm text-muted-foreground">
            Suas reuniões agendadas, as que ficaram pra trás e o histórico.
          </p>
        </div>
        <ScheduleMeetingDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-stretch">
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-5 px-5 space-y-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                <CardTitle className="text-sm font-semibold">Aderência</CardTitle>
              </div>
              <FilterPills
                options={["Todas", "Como mentor", "Como mentorado"]}
                active={aderenciaFiltro}
                onSelect={(option) => setAderenciaFiltro(option as typeof aderenciaFiltro)}
              />
            </div>
          </CardHeader>
          <CardContent className="pb-5 px-5">
            <div className="flex items-end gap-6">
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-4xl font-bold tracking-tight tabular-nums">{aderencia.d30}%</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  30 dias
                </span>
              </div>
              <div className="flex flex-col items-start gap-0.5 pb-1">
                <span className="text-2xl font-bold tracking-tight tabular-nums text-muted-foreground">
                  {aderencia.d12m}%
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  12 meses
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-5 px-5 space-y-0">
            <CardTitle className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Reuniões concluídas (30d)
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-5 px-5 space-y-1.5">
            <p className="text-4xl font-bold tracking-tight tabular-nums">3</p>
            <CardDescription className="text-xs">3 no ciclo · 1 atrasada</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-destructive/30 bg-destructive/5">
        <CardHeader className="py-4 px-5">
          <div className="flex items-start gap-2.5">
            <TriangleAlert className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
            <div className="space-y-0.5">
              <CardTitle className="text-sm font-semibold text-destructive">1 reuniões não concluídas</CardTitle>
              <CardDescription className="text-xs">
                Conclua, cancele com justificativa, ou reagende.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 border-t border-destructive/20">
          <MeetingRow
            date="04"
            month="ago"
            name="Felipe Rodrigues"
            time="13:00"
            role="Mentor"
            status="late"
            onClick={() =>
              setSelectedMeeting({
                dateLabel: "4 de ago. de 2026, 10:00",
                menteeName: "Felipe Rodrigues",
                menteeProject: "test2",
                stage: "test2",
              })
            }
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="border-b py-4 px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold">Agendadas</CardTitle>
              <Badge variant="outline" className="tabular-nums font-mono text-xs h-5 min-w-5 justify-center rounded-full">
                0
              </Badge>
            </div>
            <FilterPills
              options={["Todas", "Mentor", "Mentorado"]}
              active={agendadasFiltro}
              onSelect={(option) => setAgendadasFiltro(option as typeof agendadasFiltro)}
            />
          </div>
        </CardHeader>
        <CardContent className="py-12 px-5">
          <p className="text-center text-sm text-muted-foreground">Nada pra exibir nesse filtro.</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="border-b py-4 px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold">Histórico recente</CardTitle>
              <Badge variant="secondary" className="text-xs font-medium rounded-full">
                {historicoFiltrado.length} concluídas
              </Badge>
            </div>
            <FilterPills
              options={["Todas", "Mentor", "Mentorado"]}
              active={historicoFiltro}
              onSelect={(option) => setHistoricoFiltro(option as typeof historicoFiltro)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-border">
          {historicoFiltrado.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Nada pra exibir nesse filtro.</p>
          ) : (
            historicoFiltrado.map((item) => (
              <HistoryRow
                key={item.date}
                date={item.date}
                name={item.name}
                role={item.role}
                score={item.score}
                onClick={() =>
                  setSelectedMeeting({
                    dateLabel: item.dateLabel,
                    menteeName: item.name,
                    menteeProject: item.menteeProject,
                    stage: item.stage,
                  })
                }
              />
            ))
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="border-b py-4 px-5">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">Séries recorrentes</CardTitle>
            <span className="text-xs text-muted-foreground">Google Calendar + Meet</span>
          </div>
        </CardHeader>
        <CardContent className="py-12 px-5">
          <p className="text-center text-sm text-muted-foreground">
            Integração com Google Calendar não configurada neste ambiente.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

const MENTORADO_PERIOD_OPTIONS = [
  { value: "15d", label: "Últimos 15 dias" },
  { value: "Março", label: "Março" },
  { value: "Abril", label: "Abril" },
  { value: "Maio", label: "Maio" },
  { value: "Junho", label: "Junho" },
  { value: "Julho", label: "Julho" },
] as const

const MENTORADO_PERIOD_DATA: Record<(typeof MENTORADO_PERIOD_OPTIONS)[number]["value"], { nota: number; meta: number }> = {
  "15d": { nota: 2.5, meta: 3 },
  Março: { nota: 3.2, meta: 3 },
  Abril: { nota: 2.8, meta: 3 },
  Maio: { nota: 3.5, meta: 3 },
  Junho: { nota: 3, meta: 3 },
  Julho: { nota: 2.6, meta: 3 },
}

function MentoradoDashboard() {
  const [periodo, setPeriodo] = useState<(typeof MENTORADO_PERIOD_OPTIONS)[number]["value"]>("15d")

  const periodoLabel = MENTORADO_PERIOD_OPTIONS.find((option) => option.value === periodo)?.label ?? periodo
  const { nota, meta } = MENTORADO_PERIOD_DATA[periodo]
  const atingiuMeta = nota >= meta

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Sua evolução</h1>
          <p className="text-sm text-muted-foreground">
            Onde você está, o que combinou, e o que tem aparecido nos seus feedbacks.
          </p>
        </div>

        <Select value={periodo} onValueChange={(value) => setPeriodo(value as typeof periodo)}>
          <SelectTrigger className="h-9 w-[180px] text-xs">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            {MENTORADO_PERIOD_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-5 px-5 space-y-0">
            <CardTitle className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Estágio atual
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-5 px-5 space-y-3">
            <p className="text-3xl font-bold tracking-tight">Execução</p>
            <Badge variant="outline" className="font-normal text-muted-foreground">
              test2
            </Badge>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-5 px-5 space-y-0">
            <CardTitle className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Sua nota como mentorado
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-5 px-5 space-y-1.5">
            <p
              className={cn(
                "text-4xl font-bold tracking-tight tabular-nums",
                atingiuMeta ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
              )}
            >
              {nota.toFixed(1)}
            </p>
            <CardDescription className="text-xs">
              {periodoLabel} · meta: {meta.toFixed(1)}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b py-4 px-5">
            <div className="flex items-center gap-1.5">
              <CardTitle className="text-base font-semibold">Cadência</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Info className="h-3.5 w-3.5" />
                    <span className="sr-only">O que é cadência</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-64">
                  Compara quantas reuniões foram realizadas nos últimos 30 dias com a quantidade mínima esperada
                  nesse período.
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent className="py-4 px-5 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Reuniões últ. 30d
              </p>
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="tabular-nums">0 de 0 esperadas</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Aderência (mentorado)
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                      <Info className="h-3 w-3" />
                      <span className="sr-only">O que é aderência</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-64">
                    Percentual de reuniões que o mentorado efetivamente compareceu em relação ao total agendado, nos
                    últimos 30 dias e nos últimos 12 meses.
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-lg font-bold tabular-nums leading-none">—%</span>
                  <span className="text-[10px] text-muted-foreground">30d</span>
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-lg font-bold tabular-nums leading-none">—%</span>
                  <span className="text-[10px] text-muted-foreground">12m</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="border-b py-4 px-5">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold">Top 3 a melhorar</CardTitle>
              <Badge variant="secondary" className="rounded-full text-[10px] font-medium">
                30d
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="py-5 px-5">
            <p className="text-sm text-muted-foreground">Nenhum feedback ainda.</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b py-4 px-5">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold">Top exemplos</CardTitle>
              <Badge variant="secondary" className="gap-1 rounded-full text-[10px] font-medium">
                <Star className="h-2.5 w-2.5" />
                30d
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="py-5 px-5">
            <p className="text-sm text-muted-foreground">Nenhum feedback ainda.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const BACKOFFICE_SECTIONS = ["Projetos", "Mentorias", "Promoções", "Estágios"] as const

const BACKOFFICE_SECTION_ICONS: Record<(typeof BACKOFFICE_SECTIONS)[number], LucideIcon> = {
  Projetos: Folder,
  Mentorias: GraduationCap,
  Promoções: Megaphone,
  Estágios: ListChecks,
}

interface BackofficeProject {
  id: string
  name: string
  description: string
  startDate: string
  status: "ativo" | "inativo"
}

const BACKOFFICE_PROJECTS: BackofficeProject[] = [
  {
    id: "1",
    name: "teste",
    description:
      "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    startDate: "09/ago/2026",
    status: "ativo",
  },
  {
    id: "2",
    name: "teste2",
    description: "test",
    startDate: "02/ago/2026",
    status: "ativo",
  },
]

function NewProjectDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="h-4 w-4" />
          Novo Projeto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader>
          <DialogTitle>Novo projeto</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="project-name" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Nome *
              </Label>
              <Input id="project-name" placeholder="Ex: Ciclo 2025.1" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="project-start" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Data de início
              </Label>
              <Input id="project-start" type="date" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-description" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Descrição
            </Label>
            <Textarea id="project-description" placeholder="Opcional" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setOpen(false)}>Criar Projeto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ToggleProjectStatusDialog({
  project,
  onConfirm,
}: {
  project: BackofficeProject
  onConfirm: () => void
}) {
  const [open, setOpen] = useState(false)
  const willDeactivate = project.status === "ativo"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            willDeactivate && "border-destructive/30 text-destructive hover:bg-destructive/5 hover:text-destructive",
          )}
        >
          {willDeactivate ? "Desativar" : "Ativar"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0">
        <DialogHeader>
          <DialogTitle>{willDeactivate ? "Desativar projeto" : "Ativar projeto"}</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja {willDeactivate ? "desativar" : "ativar"} o projeto{" "}
            <span className="font-semibold text-foreground">{project.name}</span>?
            {willDeactivate && " Ele deixará de ficar disponível para novos vínculos."}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant={willDeactivate ? "destructive" : "default"}
            onClick={() => {
              onConfirm()
              setOpen(false)
            }}
          >
            {willDeactivate ? "Desativar" : "Ativar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EditProjectDialog({
  project,
  onSave,
}: {
  project: BackofficeProject
  onSave: (project: BackofficeProject) => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [startDate, setStartDate] = useState(project.startDate)

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setName(project.name)
      setDescription(project.description)
      setStartDate(project.startDate)
    }
    setOpen(nextOpen)
  }

  function handleSave() {
    onSave({ ...project, name: name.trim() || project.name, description: description.trim(), startDate })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
          <Pencil className="h-3.5 w-3.5" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader>
          <DialogTitle>Editar projeto</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-project-name" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Nome *
              </Label>
              <Input id="edit-project-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-project-start" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Data de início
              </Label>
              <Input id="edit-project-start" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-project-description" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Descrição
            </Label>
            <Textarea
              id="edit-project-description"
              placeholder="Opcional"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button disabled={!name.trim()} onClick={handleSave}>
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type UserPermission = "leitura" | "edicao" | "administrador"

const USER_PERMISSION_LABEL: Record<UserPermission, string> = {
  leitura: "Leitura",
  edicao: "Edição",
  administrador: "Administrador",
}

interface BackofficeUser {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "ativo" | "inativo"
  avatarClass: string
  project: string | null
  permission: UserPermission
  mentorName: string | null
  lastAccess: string
}

const BACKOFFICE_USERS: BackofficeUser[] = [
  {
    id: "u1",
    name: "Admin",
    email: "admin@convem.me",
    role: "admin",
    status: "ativo",
    avatarClass: "bg-orange-500",
    project: null,
    permission: "administrador",
    mentorName: null,
    lastAccess: "Hoje, 09:12",
  },
  {
    id: "u2",
    name: "Felipe Rodrigues",
    email: "feliper297@gmail.com",
    role: "user",
    status: "ativo",
    avatarClass: "bg-amber-500",
    project: "teste",
    permission: "edicao",
    mentorName: "Mentor",
    lastAccess: "Hoje, 08:40",
  },
  {
    id: "u3",
    name: "Fhilipe Monteiro",
    email: "fhilipemonteiro@gmail.com",
    role: "user",
    status: "ativo",
    avatarClass: "bg-violet-500",
    project: "teste2",
    permission: "leitura",
    mentorName: "Mentor",
    lastAccess: "Ontem, 18:05",
  },
  {
    id: "u4",
    name: "Marcio Sirimarco",
    email: "marcio@convem.io",
    role: "user",
    status: "ativo",
    avatarClass: "bg-purple-500",
    project: "teste",
    permission: "leitura",
    mentorName: null,
    lastAccess: "22/jul, 14:30",
  },
  {
    id: "u5",
    name: "Mentor",
    email: "mentor@convem.me",
    role: "user",
    status: "ativo",
    avatarClass: "bg-blue-500",
    project: "teste",
    permission: "edicao",
    mentorName: null,
    lastAccess: "Hoje, 07:58",
  },
  {
    id: "u6",
    name: "Mentorado",
    email: "mentorado@convem.me",
    role: "user",
    status: "ativo",
    avatarClass: "bg-amber-500",
    project: "teste2",
    permission: "leitura",
    mentorName: "Mentor",
    lastAccess: "20/jul, 11:15",
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

const NONE_VALUE = "__none__"

function EditUserDialog({
  user,
  allUsers,
  onSave,
}: {
  user: BackofficeUser
  allUsers: BackofficeUser[]
  onSave: (user: BackofficeUser) => void
}) {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState(user.role)
  const [project, setProject] = useState(user.project ?? NONE_VALUE)
  const [permission, setPermission] = useState<UserPermission>(user.permission)
  const [mentorName, setMentorName] = useState(user.mentorName ?? NONE_VALUE)

  const mentorOptions = allUsers.filter((candidate) => candidate.id !== user.id)

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setRole(user.role)
      setProject(user.project ?? NONE_VALUE)
      setPermission(user.permission)
      setMentorName(user.mentorName ?? NONE_VALUE)
    }
    setOpen(nextOpen)
  }

  function handleSave() {
    onSave({
      ...user,
      role,
      project: project === NONE_VALUE ? null : project,
      permission,
      mentorName: mentorName === NONE_VALUE ? null : mentorName,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Pencil className="h-3.5 w-3.5" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={cn("text-xs font-bold text-white", user.avatarClass)}>
                {initials(user.name)}
              </AvatarFallback>
            </Avatar>
            <DialogTitle>{user.name}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Cargo</Label>
              <Select value={role} onValueChange={(value) => setRole(value as BackofficeUser["role"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Permissão
              </Label>
              <Select value={permission} onValueChange={(value) => setPermission(value as UserPermission)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(USER_PERMISSION_LABEL) as UserPermission[]).map((value) => (
                    <SelectItem key={value} value={value}>
                      {USER_PERMISSION_LABEL[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Projeto</Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE_VALUE}>Nenhum</SelectItem>
                {BACKOFFICE_PROJECTS.map((p) => (
                  <SelectItem key={p.id} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Mentor</Label>
            <Select value={mentorName} onValueChange={setMentorName}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE_VALUE}>Nenhum</SelectItem>
                {mentorOptions.map((candidate) => (
                  <SelectItem key={candidate.id} value={candidate.name}>
                    {candidate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function MentoriasSection() {
  const [mentorEmail, setMentorEmail] = useState("")
  const [mentoradoEmail, setMentoradoEmail] = useState("")
  const [projectName, setProjectName] = useState("")
  const [feedback, setFeedback] = useState<{ kind: "success" | "error"; message: string } | null>(null)

  const podeCriar = Boolean(mentorEmail && mentoradoEmail && projectName)

  function handleCriarMentoria() {
    if (!podeCriar) {
      setFeedback({ kind: "error", message: "Preencha Mentor, Mentorado e Projeto antes de criar a mentoria." })
      return
    }
    const mentor = BACKOFFICE_USERS.find((user) => user.email === mentorEmail)
    const mentorado = BACKOFFICE_USERS.find((user) => user.email === mentoradoEmail)
    setFeedback({
      kind: "success",
      message: `Mentoria criada: ${mentor?.name} × ${mentorado?.name} (projeto ${projectName}).`,
    })
    setMentorEmail("")
    setMentoradoEmail("")
    setProjectName("")
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-0 pt-5 px-5">
          <CardTitle className="text-base font-semibold">Criar nova mentoria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 py-5 px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Mentor *
              </Label>
              <Select
                value={mentorEmail}
                onValueChange={(value) => {
                  setMentorEmail(value)
                  setFeedback(null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {BACKOFFICE_USERS.map((user) => (
                    <SelectItem key={user.email} value={user.email}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Mentorado *
              </Label>
              <Select
                value={mentoradoEmail}
                onValueChange={(value) => {
                  setMentoradoEmail(value)
                  setFeedback(null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {BACKOFFICE_USERS.map((user) => (
                    <SelectItem key={user.email} value={user.email}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Projeto *
            </Label>
            <Select
              value={projectName}
              onValueChange={(value) => {
                setProjectName(value)
                setFeedback(null)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {BACKOFFICE_PROJECTS.map((project) => (
                  <SelectItem key={project.id} value={project.name}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {feedback && (
            <p
              className={cn(
                "text-sm",
                feedback.kind === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
              )}
            >
              {feedback.message}
            </p>
          )}

          <div className="flex justify-end">
            <Button onClick={handleCriarMentoria}>Criar Mentoria</Button>
          </div>
        </CardContent>
      </Card>

      <UsersTableCard />
    </div>
  )
}

function UsersTableCard() {
  const [users, setUsers] = useState<BackofficeUser[]>(BACKOFFICE_USERS)

  function handleSaveUser(updated: BackofficeUser) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
  }

  function handleToggleStatus(id: string, checked: boolean) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: checked ? "ativo" : "inativo" } : u)))
  }

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="pb-0 pt-5 px-5">
        <CardTitle className="text-base font-semibold">Usuários do sistema</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-4 pt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Projeto</TableHead>
              <TableHead>Permissão</TableHead>
              <TableHead>Último acesso</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className={cn("text-xs font-bold text-white", user.avatarClass)}>
                        {initials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full font-medium",
                      user.role === "admin"
                        ? "border-destructive/30 bg-destructive/5 text-destructive"
                        : "border-primary/30 bg-primary/5 text-primary",
                    )}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {user.project ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {USER_PERMISSION_LABEL[user.permission]}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{user.lastAccess}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={user.status === "ativo"}
                      onCheckedChange={(checked) => handleToggleStatus(user.id, checked)}
                      aria-label={user.status === "ativo" ? "Desativar usuário" : "Ativar usuário"}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium",
                        user.status === "ativo" ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground",
                      )}
                    >
                      {user.status === "ativo" ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <EditUserDialog user={user} allUsers={users} onSave={handleSaveUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

interface BackofficeStage {
  name: string
  order: number
  description: string
}

const BACKOFFICE_STAGES: BackofficeStage[] = [
  { name: "Planejamento", order: 1, description: "Definição de escopo e objetivos do ciclo." },
  { name: "Execução", order: 2, description: "Desenvolvimento das atividades do projeto." },
  { name: "Avaliação", order: 3, description: "Revisão de resultados e feedback dos mentores." },
]

interface StageFormDialogProps {
  trigger: React.ReactNode
  title: string
  submitLabel: string
  initialStage?: BackofficeStage
  onSubmit: (stage: BackofficeStage) => void
}

function StageFormDialog({ trigger, title, submitLabel, initialStage, onSubmit }: StageFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(initialStage?.name ?? "")
  const [order, setOrder] = useState(String(initialStage?.order ?? 1))
  const [description, setDescription] = useState(initialStage?.description ?? "")

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) {
      setName(initialStage?.name ?? "")
      setOrder(String(initialStage?.order ?? 1))
      setDescription(initialStage?.description ?? "")
    }
  }

  const handleSubmit = () => {
    onSubmit({ name, order: Number(order) || 1, description })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="stage-name" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Nome *
              </Label>
              <Input id="stage-name" placeholder="Ex: Execução" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stage-order" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Ordem *
              </Label>
              <Input
                id="stage-order"
                type="number"
                min={1}
                placeholder="1"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="stage-description" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Descrição
            </Label>
            <Textarea
              id="stage-description"
              placeholder="Breve descrição do estágio"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteStageDialog({ stage, onConfirm }: { stage: BackofficeStage; onConfirm: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-destructive hover:text-destructive">
          <Trash2 className="h-3.5 w-3.5" />
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0">
        <DialogHeader>
          <DialogTitle>Excluir estágio</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir o estágio{" "}
            <span className="font-semibold text-foreground">{stage.name}</span>? Essa ação não pode ser desfeita.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm()
              setOpen(false)
            }}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EstagiosSection() {
  const [stages, setStages] = useState<BackofficeStage[]>(BACKOFFICE_STAGES)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <StageFormDialog
          trigger={
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              Novo Estágio
            </Button>
          }
          title="Novo estágio"
          submitLabel="Criar Estágio"
          onSubmit={(stage) => setStages((prev) => [...prev, stage])}
        />
      </div>

      <div className="space-y-3">
        {stages.map((stage, index) => (
          <Card key={`${stage.name}-${index}`} className="shadow-sm">
            <CardContent className="py-4 px-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-foreground">{stage.name}</span>
                    <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-medium">
                      Ordem {stage.order}
                    </Badge>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{stage.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StageFormDialog
                    trigger={
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Pencil className="h-3.5 w-3.5" />
                        Editar
                      </Button>
                    }
                    title="Editar estágio"
                    submitLabel="Salvar alterações"
                    initialStage={stage}
                    onSubmit={(updated) =>
                      setStages((prev) => prev.map((item, i) => (i === index ? updated : item)))
                    }
                  />
                  <DeleteStageDialog
                    stage={stage}
                    onConfirm={() => setStages((prev) => prev.filter((_, i) => i !== index))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function BackofficeDashboard() {
  const [section, setSection] = useState<(typeof BACKOFFICE_SECTIONS)[number]>(() => {
    const sectionParam = new URLSearchParams(window.location.search).get("section")
    return (BACKOFFICE_SECTIONS as readonly string[]).includes(sectionParam ?? "")
      ? (sectionParam as (typeof BACKOFFICE_SECTIONS)[number])
      : "Projetos"
  })
  const [projects, setProjects] = useState<BackofficeProject[]>(BACKOFFICE_PROJECTS)

  function handleSaveProject(updated: BackofficeProject) {
    setProjects((prev) => prev.map((project) => (project.id === updated.id ? updated : project)))
  }

  function handleToggleProjectStatus(id: string) {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, status: project.status === "ativo" ? "inativo" : "ativo" } : project,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2.5">
          <h1 className="text-3xl font-bold tracking-tight">Backoffice Admin</h1>
          <Badge variant="outline" className="rounded-full border-destructive/30 bg-destructive/5 text-destructive font-medium">
            admin
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Gerencie projetos, mentorias e promoções da plataforma.</p>
      </div>

      <Tabs value={section} onValueChange={(value) => setSection(value as (typeof BACKOFFICE_SECTIONS)[number])}>
        <TabsList className="h-auto justify-start gap-1 px-0">
          {BACKOFFICE_SECTIONS.map((option) => {
            const Icon = BACKOFFICE_SECTION_ICONS[option]
            return (
              <TabsTrigger key={option} value={option} className="gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                {option}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      {section === "Projetos" ? (
        <div className="space-y-4">
          <div className="flex justify-end">
            <NewProjectDialog />
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <Card key={project.id} className="shadow-sm">
                <CardContent className="py-4 px-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground">{project.name}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full font-medium",
                            project.status === "ativo"
                              ? "border-emerald-600/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "border-muted-foreground/20 bg-muted text-muted-foreground",
                          )}
                        >
                          {project.status === "ativo" ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <p className="break-words text-sm text-muted-foreground">{project.description}</p>
                      <p className="text-xs text-muted-foreground">Início: {project.startDate}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <EditProjectDialog project={project} onSave={handleSaveProject} />
                      <ToggleProjectStatusDialog
                        project={project}
                        onConfirm={() => handleToggleProjectStatus(project.id)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : section === "Mentorias" ? (
        <MentoriasSection />
      ) : section === "Estágios" ? (
        <EstagiosSection />
      ) : (
        <Card className="shadow-sm">
          <CardContent className="py-12 flex flex-col items-center gap-3">
            <Info className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Seção "{section}" ainda não foi implementada.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ── Alerts ───────────────────────────────────────────────────────────────────

interface AlertItem {
  title: string
  name: string
  role: string
  message: string
  when: string
  action: string
}

const ALERTS: AlertItem[] = [
  {
    title: "Reunião atrasada",
    name: "Felipe Rodrigues",
    role: "Mentor",
    message: "Reagende — cadência mínima é de 2 reuniões/mês.",
    when: "hoje",
    action: "Reagendar",
  },
]

function AlertsSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col p-0">
        <SheetHeader>
          <SheetTitle>Alertas</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {ALERTS.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum alerta no momento.</p>
          ) : (
            <div className="space-y-3">
              {ALERTS.map((alert, index) => (
                <div key={index} className="space-y-2.5 rounded-lg bg-muted/40 px-4 py-3.5">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warning-muted">
                      <Bell className="h-3.5 w-3.5 text-warning" />
                    </span>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.name} · {alert.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.when}</p>
                  <Badge
                    variant="outline"
                    className="rounded-full border-primary/30 bg-primary/5 text-primary font-medium cursor-pointer hover:bg-primary/10"
                  >
                    {alert.action}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function ProfileView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar
      </button>

      <Card className="mx-auto max-w-md shadow-sm">
        <CardContent className="space-y-5 px-6 py-8">
          <div className="flex flex-col items-center gap-2.5">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-orange-500 text-xl font-bold text-white">A</AvatarFallback>
            </Avatar>
            <p className="text-lg font-semibold text-foreground">Admin</p>
            <Badge
              variant="outline"
              className="rounded-full border-destructive/30 bg-destructive/5 text-destructive font-medium"
            >
              admin
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Nome *
              </Label>
              <Input id="profile-name" defaultValue="Admin" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-email" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                E-mail *
              </Label>
              <Input id="profile-email" type="email" defaultValue="admin@convem.me" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Alterar senha (opcional)
            </p>

            <div className="space-y-1.5">
              <Label htmlFor="profile-new-password" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Nova senha
              </Label>
              <Input id="profile-new-password" type="password" placeholder="Mínimo 8 caracteres" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-confirm-password" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Confirmar senha
              </Label>
              <Input id="profile-confirm-password" type="password" placeholder="Repita a nova senha" />
            </div>
          </div>

          <Button className="w-full">Salvar Alterações</Button>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Root App ──────────────────────────────────────────────────────────────────

export default function App() {
  const searchParams = new URLSearchParams(window.location.search)
  const screenParam = searchParams.get("screen")
  const forcedTab = searchParams.get("tab")

  const [isAuthenticated, setIsAuthenticated] = useState(!!forcedTab)
  const [authView, setAuthView] = useState<"login" | "sign-up">("login")
  const [activeTab, setActiveTab] = useState(forcedTab ?? "dashboard")
  const [alertsOpen, setAlertsOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  if (screenParam === "login" || screenParam === "dashboard" || screenParam === "user-menu") {
    return <FigmaExport screen={screenParam} />
  }

  if (screenParam === "signup") {
    return (
      <div className="h-[900px] w-[1440px] overflow-hidden">
        <SignUpPage onSignUp={() => undefined} onGoToLogin={() => undefined} />
      </div>
    )
  }

  if (!isAuthenticated) {
    if (authView === "sign-up") {
      return (
        <SignUpPage
          onSignUp={() => setIsAuthenticated(true)}
          onGoToLogin={() => setAuthView("login")}
        />
      )
    }
    return <LoginPage onLogin={() => setIsAuthenticated(true)} onGoToSignUp={() => setAuthView("sign-up")} />
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">

        {/* ── Sidebar ── */}
        <Sidebar
          activeValue={activeTab}
          onSelect={(value) => {
            setActiveTab(value)
            setShowProfile(false)
          }}
        />

        {/* ── Main column ── */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col min-w-0 overflow-hidden">

          {/* ── Top Header ── */}
          <header className="shrink-0 bg-background/90 backdrop-blur-md z-40">

            {/* Top row */}
            <div className="flex h-14 items-center gap-3 border-b px-8">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Buscar mentorado, reunião…"
                  className="pl-8 h-9 bg-muted/60 border-0 text-sm focus-visible:ring-1 focus-visible:bg-background"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <Moon className="h-4 w-4" />
                      <span className="sr-only">Alternar Tema</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Alternar Tema</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => setAlertsOpen(true)}
                    >
                      <Bell className="h-4 w-4" />
                      <span className="sr-only">Notificações</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Notificações</TooltipContent>
                </Tooltip>

                <UserMenu onLogout={() => setIsAuthenticated(false)} onProfile={() => setShowProfile(true)} />

                <AlertsSheet open={alertsOpen} onOpenChange={setAlertsOpen} />
              </div>
            </div>
          </header>

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 py-8 w-full">
              {showProfile ? (
                <ProfileView onBack={() => setShowProfile(false)} />
              ) : (
                <>
                  <TabsContent value="dashboard" className="mt-0">
                    <RelatorioMentorias />
                  </TabsContent>
                  <TabsContent value="mentor" className="mt-0">
                    <MentorDashboard />
                  </TabsContent>
                  <TabsContent value="mentorado" className="mt-0">
                    <MentoradoDashboard />
                  </TabsContent>
                  <TabsContent value="reunioes" className="mt-0">
                    <ReunioesDashboard />
                  </TabsContent>
                  <TabsContent value="backoffice" className="mt-0">
                    <BackofficeDashboard />
                  </TabsContent>
                </>
              )}
            </div>
          </div>

        </Tabs>
      </div>
    </TooltipProvider>
  )
}
