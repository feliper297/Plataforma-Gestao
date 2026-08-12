import { LogoPeopleHub } from "./LogoPeopleHub"
import KpiCard from "./components/KpiCard"
import SessionsChartCard from "./components/SessionsChart"
import AdherenceChartCard from "./components/AdherenceChart"
import MentorPerformanceTable from "./components/MentorPerformanceTable"
import MenteeAdherenceTable from "./components/MenteeAdherenceTable"
import StatusBadge from "./components/StatusBadge"

// ── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="border-b border-border pb-3">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted/60 p-4 text-xs text-foreground font-mono leading-relaxed border border-border">
      <code>{code.trim()}</code>
    </pre>
  )
}

// ── Icon stubs (sem dependência externa) ─────────────────────────────────────

function IconCalendar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconGraduationCap() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function IconTrendingUp() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

// ── Color swatches ────────────────────────────────────────────────────────────

const COLOR_TOKENS = [
  { name: "primary", label: "Primary", bg: "bg-[#7F358A]", text: "text-white" },
  { name: "destructive", label: "Destructive", bg: "bg-red-500", text: "text-white" },
  { name: "warning", label: "Warning", bg: "bg-yellow-500", text: "text-white" },
  { name: "muted", label: "Muted", bg: "bg-muted", text: "text-muted-foreground border border-border" },
  { name: "border", label: "Border", bg: "bg-border", text: "text-foreground" },
  { name: "success", label: "Success", bg: "bg-emerald-500", text: "text-white" },
]

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <LogoPeopleHub height={32} />
          <span className="text-sm text-muted-foreground font-medium">Design System</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-16">

        {/* Hero */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">PeopleHub Design System</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Biblioteca de componentes de UI do PeopleHub. Todos os componentes são responsivos,
            acessíveis e alinhados com os tokens de design.
          </p>
        </div>

        {/* Brand */}
        <Section title="Marca" description="Logotipo oficial do PeopleHub com suporte a Dark Mode.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded-lg border border-border bg-card p-10">
              <LogoPeopleHub height={36} />
            </div>
            <div className="flex items-center justify-center rounded-lg border border-border bg-zinc-900 p-10">
              <LogoPeopleHub height={36} />
            </div>
          </div>
          <CodeBlock code={`import { LogoPeopleHub } from "@/components/LogoPeopleHub"

// Telas de autenticação (Login, Cadastro, Esqueci a senha)
<LogoPeopleHub height={187} />

// Telas internas (Sidebar)
<LogoPeopleHub height={140} />`} />
        </Section>

        {/* Cores */}
        <Section title="Cores" description="Tokens semânticos de cor definidos em CSS variables.">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {COLOR_TOKENS.map((c) => (
              <div key={c.name} className="space-y-1.5">
                <div className={`h-14 w-full rounded-md ${c.bg} ${c.text} flex items-end p-2`} />
                <p className="text-xs font-medium text-foreground">{c.label}</p>
                <p className="text-[10px] text-muted-foreground font-mono">--{c.name}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* StatusBadge */}
        <Section title="StatusBadge" description="Badge semântico para status de metas.">
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="atingiu" />
            <StatusBadge status="em_andamento" />
            <StatusBadge status="nao_atingiu" />
          </div>
          <CodeBlock code={`import StatusBadge from "@/components/composites/StatusBadge"
import type { GoalStatus } from "@/lib/mentorias/mentorias"

<StatusBadge status="atingiu" />
<StatusBadge status="em_andamento" />
<StatusBadge status="nao_atingiu" />`} />
        </Section>

        {/* KPI Cards */}
        <Section title="KPI Card" description="Card de métrica com ícone, valor principal e subtexto.">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard label="Sessões realizadas" value="175" subtext="Março a julho" icon={<IconCalendar />} />
            <KpiCard label="Mentores ativos" value="10" subtext="No período" icon={<IconUsers />} />
            <KpiCard label="Mentorados atendidos" value="9" subtext="No período" icon={<IconGraduationCap />} />
            <KpiCard
              label="Taxa de atingimento"
              value="55%"
              valueClass="text-[#7F358A]"
              subtext="Mentores dentro da meta"
              icon={<IconTrendingUp />}
            />
          </div>
          <CodeBlock code={`import KpiCard from "@/components/KpiCard"
import { Calendar } from "lucide-react"

<KpiCard
  label="Sessões realizadas"
  value="175"
  subtext="Março a julho"
  icon={<Calendar />}
/>

// Com cor personalizada no valor:
<KpiCard
  label="Taxa de atingimento"
  value="55%"
  valueClass="text-primary"
  subtext="Mentores dentro da meta"
  icon={<TrendingUp />}
/>`} />
        </Section>

        {/* Charts */}
        <Section title="Gráficos" description="Gráficos SVG nativos, sem biblioteca externa. Responsivos e temáveis.">

          {/* Sessions Chart */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Sessões por mês (Barras / Linhas)
            </h3>
            <SessionsChartCard />
            <CodeBlock code={`import SessionsChartCard from "@/components/charts/SessionsChart"

// Com dados padrão:
<SessionsChartCard />

// Com dados customizados:
<SessionsChartCard
  data={[
    { month: "Março", value: 32 },
    { month: "Abril", value: 37 },
    { month: "Maio", value: 48 },
    { month: "Junho", value: 38 },
    { month: "Julho", value: 20 },
  ]}
  goal={53}
/>`} />
          </div>

          {/* Adherence Chart */}
          <div className="space-y-4 mt-8">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Aderência à meta (Segmented bar)
            </h3>
            <div className="max-w-md">
              <AdherenceChartCard />
            </div>
            <CodeBlock code={`import AdherenceChartCard from "@/components/charts/AdherenceChart"

// Com dados padrão:
<AdherenceChartCard />

// Com dados customizados:
<AdherenceChartCard
  segments={[
    { label: "Atingiu meta",  value: 22, color: "var(--chart-2)"    },
    { label: "Não atingiu",   value: 18, color: "var(--destructive)" },
    { label: "Em andamento",  value: 10, color: "var(--chart-3)"    },
  ]}
/>`} />
          </div>
        </Section>

        {/* Tables */}
        <Section title="Tabelas" description="Tabelas de desempenho com suporte a overflow horizontal em mobile.">

          {/* Mentor Table */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Desempenho por mentor
            </h3>
            <MentorPerformanceTable />
            <CodeBlock code={`import MentorPerformanceTable from "@/components/tables/MentorPerformanceTable"

// Com dados padrão:
<MentorPerformanceTable />

// Com dados customizados:
<MentorPerformanceTable
  data={[
    { name: "Marina", mentees: 5, goal: 10,
      mar: 8, abr: 9, mai: 10, jun: 10, jul: 10,
      status: "atingiu" },
    // ...
  ]}
/>`} />
          </div>

          {/* Mentee Table */}
          <div className="space-y-4 mt-8">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Aderência dos mentorados
            </h3>
            <MenteeAdherenceTable />
            <CodeBlock code={`import MenteeAdherenceTable from "@/components/tables/MenteeAdherenceTable"

// Com dados padrão:
<MenteeAdherenceTable />

// Com dados e meta customizados:
<MenteeAdherenceTable
  goal={75}
  data={[
    { name: "Felipe", goal: 75,
      abr: 80, mai: 90, jun: 70, jul: 85,
      average: 81.25, status: "atingiu" },
    // ...
  ]}
/>`} />
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-border pt-8 pb-4 text-center">
          <p className="text-xs text-muted-foreground">
            PeopleHub Design System · Componentes prontos para produção
          </p>
        </footer>

      </main>
    </div>
  )
}
