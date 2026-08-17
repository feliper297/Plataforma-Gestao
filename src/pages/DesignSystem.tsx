import { useMemo, useState, type ReactNode } from "react"
import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Check,
  CircleUserRound,
  Code2,
  Copy,
  CreditCard,
  Eye,
  FormInput,
  LayoutGrid,
  Menu,
  MousePointerClick,
  Palette,
  Radius as RadiusIcon,
  Tag,
  Type as TypeIcon,
  type LucideIcon,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { BrandMark } from "@/components/BrandMark"
import StatusBadge from "@/components/composites/StatusBadge"
import EvolucaoMentoradosTable from "@/components/mentorias/dashboard/EvolucaoMentoradosTable"
import GoalAdherenceChart from "@/components/mentorias/dashboard/GoalAdherenceChart"
import MentorRankingChart from "@/components/mentorias/dashboard/MentorRankingChart"
import MentoriasTable from "@/components/mentorias/dashboard/MentoriasTable"
import MonthlyTrendChart from "@/components/mentorias/dashboard/MonthlyTrendChart"
import { getMentores } from "@/lib/mentorias/mentorias"
import { cn } from "@/lib/utils"
import type { GoalStatus } from "@/lib/mentorias/mentorias"

/**
 * Valores de `light`/`dark` espelham literalmente as declarações de
 * src/design-system/tokens/*.css — este arquivo é documentação, não a fonte
 * dos tokens. Se um valor mudar lá, atualize aqui também. O código exibido na
 * aba "Código" de cada seção de tokens é gerado a partir destes mesmos dados,
 * então nunca diverge do que é renderizado na aba "Visualizar".
 */
type Token = { name: string; cssVar: string; light: string; dark?: string }

const COLOR_GROUPS: { title: string; tokens: Token[] }[] = [
  {
    title: "Base",
    tokens: [
      { name: "background", cssVar: "--background", light: "oklch(1 0 0)", dark: "oklch(0.145 0 0)" },
      { name: "foreground", cssVar: "--foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.985 0 0)" },
      { name: "shell", cssVar: "--shell", light: "oklch(0.975 0.004 286)", dark: "oklch(0.17 0.008 286)" },
      { name: "border", cssVar: "--border", light: "oklch(0.922 0 0)", dark: "oklch(1 0 0 / 10%)" },
      { name: "input", cssVar: "--input", light: "oklch(0.922 0 0)", dark: "oklch(1 0 0 / 15%)" },
      { name: "ring", cssVar: "--ring", light: "#7F358A", dark: "#9B52A8" },
    ],
  },
  {
    title: "Superfícies",
    tokens: [
      { name: "card", cssVar: "--card", light: "oklch(1 0 0)", dark: "oklch(0.205 0 0)" },
      { name: "card-foreground", cssVar: "--card-foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.985 0 0)" },
      { name: "popover", cssVar: "--popover", light: "oklch(1 0 0)", dark: "oklch(0.205 0 0)" },
      {
        name: "popover-foreground",
        cssVar: "--popover-foreground",
        light: "oklch(0.145 0 0)",
        dark: "oklch(0.985 0 0)",
      },
    ],
  },
  {
    title: "Marca e ênfase",
    tokens: [
      { name: "primary", cssVar: "--primary", light: "#7F358A", dark: "#9B52A8" },
      { name: "primary-foreground", cssVar: "--primary-foreground", light: "oklch(1 0 0)", dark: "oklch(1 0 0)" },
      { name: "secondary", cssVar: "--secondary", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)" },
      {
        name: "secondary-foreground",
        cssVar: "--secondary-foreground",
        light: "oklch(0.205 0 0)",
        dark: "oklch(0.985 0 0)",
      },
      { name: "accent", cssVar: "--accent", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)" },
      {
        name: "accent-foreground",
        cssVar: "--accent-foreground",
        light: "oklch(0.205 0 0)",
        dark: "oklch(0.985 0 0)",
      },
      { name: "muted", cssVar: "--muted", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)" },
      {
        name: "muted-foreground",
        cssVar: "--muted-foreground",
        light: "oklch(0.556 0 0)",
        dark: "oklch(0.708 0 0)",
      },
    ],
  },
  {
    title: "Feedback",
    tokens: [
      {
        name: "destructive",
        cssVar: "--destructive",
        light: "oklch(0.577 0.245 27.325)",
        dark: "oklch(0.704 0.191 22.216)",
      },
      {
        name: "destructive-foreground",
        cssVar: "--destructive-foreground",
        light: "oklch(0.985 0 0)",
        dark: "oklch(0.985 0 0)",
      },
      { name: "warning", cssVar: "--warning", light: "oklch(0.72 0.17 55)", dark: "oklch(0.75 0.15 55)" },
      {
        name: "warning-foreground",
        cssVar: "--warning-foreground",
        light: "oklch(0.98 0.02 95)",
        dark: "oklch(0.2 0.04 55)",
      },
      { name: "warning-muted", cssVar: "--warning-muted", light: "oklch(0.96 0.04 85)", dark: "oklch(0.28 0.06 55)" },
      {
        name: "warning-muted-foreground",
        cssVar: "--warning-muted-foreground",
        light: "oklch(0.52 0.14 50)",
        dark: "oklch(0.78 0.1 75)",
      },
    ],
  },
]

const ALL_COLOR_TOKENS: Token[] = COLOR_GROUPS.flatMap((group) => group.tokens)

const CHART_TOKENS: Token[] = [
  { name: "chart-1 (série principal)", cssVar: "--chart-1", light: "#4cc2cf" },
  { name: "chart-2 (positivo)", cssVar: "--chart-2", light: "#059669" },
  { name: "chart-3 (neutro)", cssVar: "--chart-3", light: "#9ca3af" },
]

const RADIUS_TOKENS: Token[] = [
  { name: "radius-sm", cssVar: "--radius-sm", light: "calc(var(--radius) - 4px)" },
  { name: "radius-md", cssVar: "--radius-md", light: "calc(var(--radius) - 2px)" },
  { name: "radius-lg", cssVar: "--radius-lg", light: "var(--radius)" },
  { name: "radius-xl", cssVar: "--radius-xl", light: "calc(var(--radius) + 4px)" },
]

const STATUS_OPTIONS: GoalStatus[] = ["atingiu", "em_andamento", "nao_atingiu"]

/** Gera o bloco CSS de um grupo de tokens — usado para a aba "Código" nunca divergir dos dados renderizados. */
function buildTokenBlock(selector: string, tokens: Token[], dark: boolean) {
  const lines = tokens.map((token) => `  ${token.cssVar}: ${dark ? token.dark ?? token.light : token.light};`)
  return `${selector} {\n${lines.join("\n")}\n}`
}

// ── Conversão oklch → hex ────────────────────────────────────────────────────
// Os tokens de cor são declarados em oklch() (ver colors.css). Para exibir o
// hexadecimal, convertemos com a matriz padrão OKLab → sRGB (Björn Ottosson),
// a mesma usada por bibliotecas como culori/color.js.

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function encodeSrgbChannel(linear: number) {
  const c = clamp01(linear)
  return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055
}

function toHexByte(channel: number) {
  return Math.round(clamp01(channel) * 255)
    .toString(16)
    .padStart(2, "0")
}

const OKLCH_PATTERN = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)(%)?)?\s*\)$/i

/** Converte um valor de token (oklch(...) ou #hex) no hex equivalente. Retorna null se não for uma cor. */
function resolveHex(value: string): string | null {
  const trimmed = value.trim()
  if (/^#[0-9a-f]{3,8}$/i.test(trimmed)) return trimmed.toUpperCase()

  const match = trimmed.match(OKLCH_PATTERN)
  if (!match) return null

  const L = Number(match[1])
  const C = Number(match[2])
  const hueDeg = Number(match[3])
  const alphaRaw = match[4] ? Number(match[4]) : undefined
  const alpha = alphaRaw === undefined ? 1 : match[5] ? alphaRaw / 100 : alphaRaw

  const hueRad = (hueDeg * Math.PI) / 180
  const a = C * Math.cos(hueRad)
  const b = C * Math.sin(hueRad)

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b

  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3

  const rLinear = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const gLinear = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const bLinear = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

  const hex = `#${toHexByte(encodeSrgbChannel(rLinear))}${toHexByte(encodeSrgbChannel(gLinear))}${toHexByte(encodeSrgbChannel(bLinear))}`.toUpperCase()
  return alpha < 1 ? `${hex}${toHexByte(alpha).toUpperCase()}` : hex
}

// ── Navegação ────────────────────────────────────────────────────────────────

type SectionId =
  | "overview"
  | "how-to-use"
  | "colors"
  | "charts"
  | "typography"
  | "radius"
  | "buttons"
  | "badges"
  | "status-badge"
  | "form"
  | "card"
  | "avatar"

type NavItem = { id: SectionId; label: string; description: string; icon: LucideIcon }

const HOW_TO_USE_STEPS: { step: string; title: string; description: string; code: string }[] = [
  {
    step: "01",
    title: "Importe os tokens",
    description:
      "O entrypoint global é src/index.css. Ele carrega Tailwind v4, a fonte Inter e os tokens modulares em src/design-system/.",
    code: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');\n@import 'tailwindcss';\n\n@import './design-system/tokens/index.css';\n@import './design-system/styles/index.css';`,
  },
  {
    step: "02",
    title: "Defina o tema",
    description:
      "Todos os tokens têm par light/dark. Aplique a classe .dark no ancestral mais alto da árvore (html, body ou wrapper da rota).",
    code: `<div className={cn(isDark && "dark")}>\n  {/* conteúdo */}\n</div>`,
  },
  {
    step: "03",
    title: "Monte com componentes",
    description:
      "Comece pelos primitives em src/components/ui/. Composites (ex.: StatusBadge) entram quando a combinação se repete entre domínios.",
    code: `import { Button } from "@/components/ui/button"\nimport { Card, CardHeader, CardTitle } from "@/components/ui/card"\nimport StatusBadge from "@/components/composites/StatusBadge"\n\n<Card>\n  <CardHeader>\n    <CardTitle>Relatório</CardTitle>\n  </CardHeader>\n  <Button>Exportar</Button>\n  <StatusBadge status="atingiu" />\n</Card>`,
  },
  {
    step: "04",
    title: "Respeite a gramática",
    description:
      "Use tokens semânticos (bg-primary, text-muted-foreground), Inter como fonte, roxo como ação primária e --warning para alertas não críticos.",
    code: `// ✅ Correto\n<Button className="bg-primary text-primary-foreground">Salvar</Button>\n<p className="text-muted-foreground">Texto secundário</p>\n\n// ❌ Evite\n<button style={{ background: "#7F358A" }}>Salvar</button>`,
  },
]

const SCOPE_ITEMS: { title: string; description: string }[] = [
  {
    title: "Plataforma de Gestão (app interno)",
    description: "Dashboard de mentorias, backoffice, sidebar, formulários e relatórios com suporte a dark mode.",
  },
  {
    title: "Autenticação",
    description: "Telas de login e cadastro com BrandMark, Card e inputs do design system.",
  },
  {
    title: "Figma PeopleHub",
    description:
      "Componentes da seção Components no arquivo PeopleHub devem espelhar os primitives e composites documentados aqui.",
  },
  {
    title: "Vitrine deste Design System",
    description: "Esta página é a referência viva — o que aparece aqui é o mesmo código usado em produção.",
  },
]

const ARCHITECTURE_ITEMS: { label: string; path: string; role: string }[] = [
  { label: "Tokens", path: "src/design-system/tokens/", role: "Cores, tipografia, raio e paleta de gráficos" },
  { label: "Estilos globais", path: "src/design-system/styles/", role: "Reset, body e scrollbar" },
  { label: "Primitives", path: "src/components/ui/", role: "Button, Input, Badge, Card… (Radix + CVA)" },
  { label: "Composites", path: "src/components/composites/", role: "Combinações reutilizáveis entre domínios" },
  { label: "Domínio", path: "src/components/mentorias/", role: "Componentes específicos de negócio" },
  { label: "Documentação", path: "src/pages/DesignSystem.tsx", role: "Vitrine interativa com Visualizar / Código" },
]

const GRAMMAR_RULES: { type: "do" | "dont"; text: string }[] = [
  { type: "do", text: "Use classes Tailwind mapeadas aos tokens (bg-primary, border-border, rounded-md)." },
  { type: "do", text: "Teste todo componente novo em light e dark antes de mergear." },
  { type: "do", text: "Consulte o Figma antes de criar um primitive que ainda não existe." },
  { type: "do", text: "Use --warning para estados intermediários; reserve --destructive para erros graves." },
  { type: "dont", text: "Não hardcode hex/rgb fora de src/design-system/tokens/." },
  { type: "dont", text: "Não coloque lógica de negócio em src/components/ui/." },
  { type: "dont", text: "Não duplique um composite — se a combinação se repete, extraia para composites/." },
  { type: "dont", text: "Não use azul ou verde como cor de ação primária — a marca é roxo (#7F358A)." },
]

const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Fundamentos",
    items: [
      { id: "colors", label: "Cores", description: "Tokens semânticos de cor, claro e escuro", icon: Palette },
      { id: "charts", label: "Gráficos", description: "Paleta, gráficos e tabelas do dashboard de mentorias", icon: BarChart3 },
      { id: "typography", label: "Tipografia", description: "Família tipográfica e pesos", icon: TypeIcon },
      { id: "radius", label: "Raio de borda", description: "Escala derivada de --radius", icon: RadiusIcon },
    ],
  },
  {
    title: "Componentes",
    items: [
      { id: "buttons", label: "Botões", description: "Variantes e tamanhos de Button", icon: MousePointerClick },
      { id: "badges", label: "Badges", description: "Variantes de Badge", icon: Tag },
      { id: "status-badge", label: "StatusBadge", description: "Badge de status de meta", icon: BadgeCheck },
      { id: "form", label: "Formulário", description: "Input, Select, Textarea e Switch", icon: FormInput },
      { id: "card", label: "Card", description: "Header, título, descrição e conteúdo", icon: CreditCard },
      { id: "avatar", label: "Avatar", description: "Avatar com fallback de iniciais", icon: CircleUserRound },
    ],
  },
]

const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((group) => group.items)

// ── Utilitários de exibição ──────────────────────────────────────────────────

function useClipboard() {
  const [copied, setCopied] = useState(false)

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard indisponível (ex.: contexto não seguro) — falha silenciosa, não é crítico.
    }
  }

  return { copied, copy }
}

function CopyableCode({ code, className }: { code: string; className?: string }) {
  const { copied, copy } = useClipboard()

  return (
    <button
      type="button"
      onClick={() => copy(code)}
      className={cn(
        "group flex w-full items-center justify-between gap-2 rounded bg-muted/60 px-2 py-1 text-left transition-colors hover:bg-muted",
        className,
      )}
      aria-label={`Copiar ${code}`}
    >
      <span className="truncate font-mono">{code}</span>
      {copied ? (
        <Check className="size-3 shrink-0 text-foreground" />
      ) : (
        <Copy className="size-3 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
      )}
    </button>
  )
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const { copied, copy } = useClipboard()

  return (
    <div className="relative">
      {label ? <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p> : null}
      <pre className="overflow-x-auto rounded-md border border-border bg-muted/60 px-4 py-3 pr-14 text-xs leading-relaxed">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 size-7 text-muted-foreground hover:text-foreground"
        onClick={() => copy(code)}
        aria-label="Copiar código"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </Button>
    </div>
  )
}

/** Alterna entre a pré-visualização renderizada e o código correspondente — mesmo padrão usado por Radix/shadcn e outros catálogos de design system. */
function PreviewCodeTabs({ preview, code }: { preview: ReactNode; code: ReactNode }) {
  return (
    <Tabs defaultValue="preview">
      <TabsList className="w-fit gap-1 rounded-lg border-b-0 bg-muted p-1">
        <TabsTrigger
          value="preview"
          className="gap-1.5 rounded-md border-b-0 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          <Eye className="size-3.5" />
          Visualizar
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="gap-1.5 rounded-md border-b-0 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          <Code2 className="size-3.5" />
          Código
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-3">
        <div className="rounded-lg border border-border p-6">{preview}</div>
      </TabsContent>
      <TabsContent value="code" className="mt-3">
        {typeof code === "string" ? <CodeBlock code={code} /> : code}
      </TabsContent>
    </Tabs>
  )
}

function TokenSwatch({ token, dark, preview }: { token: Token; dark: boolean; preview: ReactNode }) {
  const value = dark ? token.dark ?? token.light : token.light
  const hex = useMemo(() => resolveHex(value), [value])

  return (
    <div className="space-y-2 rounded-lg border border-border p-3">
      <div className="flex items-center gap-3">
        {preview}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{token.name}</p>
          {hex ? <p className="truncate font-mono text-xs text-muted-foreground">{hex}</p> : null}
        </div>
      </div>
      <CopyableCode code={`${token.cssVar}: ${value};`} className="font-mono text-[11px] text-muted-foreground" />
    </div>
  )
}

function ColorSwatch({ token, dark }: { token: Token; dark: boolean }) {
  return (
    <TokenSwatch
      token={token}
      dark={dark}
      preview={
        <div
          className="size-10 shrink-0 rounded-md border border-border/50 shadow-sm"
          style={{ backgroundColor: `var(${token.cssVar})` }}
        />
      }
    />
  )
}

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6 space-y-1 border-b border-border pb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  )
}

// ── Seções ───────────────────────────────────────────────────────────────────

function OverviewSection({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <BrandMark size="md" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Design System People Hub</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Fonte única de tokens e componentes da Plataforma de Gestão. Construído com Tailwind CSS v4 e Radix UI —
            cada componente exibido aqui é exatamente o mesmo usado em produção, não uma reimplementação da vitrine.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" onClick={() => onNavigate("buttons")}>
              Abrir componentes
            </Button>
            <Button type="button" variant="outline" onClick={() => onNavigate("how-to-use")}>
              Como usar
            </Button>
          </div>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.title} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">{group.title}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="group flex flex-col items-start gap-3 rounded-lg border border-border p-5 text-left transition-colors hover:border-primary/40 hover:bg-muted/40"
                >
                  <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-4.5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function HowToUseSection({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="space-y-12">
      <SectionHeader
        title="Como usar"
        description="Fluxo mínimo para começar sem fugir da arquitetura e da gramática visual do PeopleHub."
      />

      <Card className="border-primary/20 bg-muted/30">
        <CardContent className="space-y-2 p-5 font-mono text-xs sm:text-sm">
          <p className="text-primary">&gt; peoplehub-ds --status</p>
          <p className="text-muted-foreground">$ tokens = src/design-system/tokens/</p>
          <p className="text-muted-foreground">$ runtime = Tailwind v4 + @theme inline</p>
          <p className="text-muted-foreground">$ components = ui/ · composites/ · &lt;domínio&gt;/</p>
          <p className="text-muted-foreground">$ themes = light · dark</p>
          <p className="text-muted-foreground">$ figma = PeopleHub · Components</p>
          <p className="text-primary">&gt; ready_</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">Escopo</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Todas as telas da Plataforma de Gestão PeopleHub usam este design system. É o que mantém a marca coerente
          entre quem desenvolve features, quem documenta no Figma e quem consome a vitrine.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SCOPE_ITEMS.map((item) => (
            <Card key={item.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">Getting started</h2>
        <div className="space-y-6">
          {HOW_TO_USE_STEPS.map((item) => (
            <div key={item.step} className="space-y-3">
              <div className="flex items-start gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-semibold text-primary">
                  {item.step}
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <CodeBlock label="Exemplo" code={item.code} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">Arquitetura</h2>
        <p className="text-sm text-muted-foreground">
          Contratos canônicos ficam em <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/design-system/</code>.
          Componentes seguem a hierarquia ui → composites → domínio.
        </p>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                <th className="px-4 py-3 font-medium text-foreground">Camada</th>
                <th className="hidden px-4 py-3 font-medium text-foreground sm:table-cell">Caminho</th>
                <th className="px-4 py-3 font-medium text-foreground">Papel</th>
              </tr>
            </thead>
            <tbody>
              {ARCHITECTURE_ITEMS.map((row) => (
                <tr key={row.path} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                  <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground sm:table-cell">{row.path}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">Gramática visual</h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-emerald-600 dark:text-emerald-400">Faça</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {GRAMMAR_RULES.filter((rule) => rule.type === "do").map((rule) => (
                <p key={rule.text} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {rule.text}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-destructive">Evite</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {GRAMMAR_RULES.filter((rule) => rule.type === "dont").map((rule) => (
                <p key={rule.text} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-0.5 shrink-0 font-mono text-destructive">×</span>
                  {rule.text}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">Ordem de leitura</h2>
        <Card>
          <CardContent className="space-y-3 p-5">
            <p className="text-sm text-muted-foreground">Para desenvolvedores e agentes de IA que consomem este repositório:</p>
            <ol className="list-inside list-decimal space-y-1 text-sm text-foreground">
              <li>
                <code className="font-mono text-xs">src/design-system/README.md</code> — convenções e quando criar o quê
              </li>
              <li>
                <code className="font-mono text-xs">src/design-system/tokens/</code> — fonte da verdade dos valores
              </li>
              <li>
                <code className="font-mono text-xs">src/components/ui/</code> — primitives disponíveis
              </li>
              <li>
                Esta vitrine — exemplos visuais + snippets copiáveis
              </li>
              <li>
                Figma PeopleHub → seção Components — referência visual para designers
              </li>
            </ol>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => onNavigate("colors")}>
                Ver tokens de cor
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => onNavigate("buttons")}>
                Ver componentes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ColorsSection({ dark }: { dark: boolean }) {
  return (
    <div>
      <SectionHeader
        title="Cores"
        description="Tokens semânticos definidos em src/design-system/tokens/colors.css. O hex exibido é calculado a partir do valor oklch() real do token (conversão OKLab → sRGB), não é um valor aproximado à mão."
      />
      <PreviewCodeTabs
        preview={
          <div className="space-y-6">
            {COLOR_GROUPS.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">{group.title}</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.tokens.map((token) => (
                    <ColorSwatch key={token.cssVar} token={token} dark={dark} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
        code={buildTokenBlock(dark ? ".dark" : ":root", ALL_COLOR_TOKENS, dark)}
      />
    </div>
  )
}

function ChartsSection({ dark }: { dark: boolean }) {
  const mentores = useMemo(() => getMentores(), [])

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Gráficos e tabelas"
        description="Tokens de cor para Recharts e componentes usados no Relatório de Mentorias (aba Dashboard)."
      />

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">Paleta de gráficos</h2>
        <PreviewCodeTabs
          preview={
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CHART_TOKENS.map((token) => (
                <ColorSwatch key={token.cssVar} token={token} dark={dark} />
              ))}
            </div>
          }
          code={buildTokenBlock(":root", CHART_TOKENS, false)}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">Componentes de gráfico</h2>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Sessões realizadas por mês</h3>
            <p className="text-xs font-mono text-muted-foreground">src/components/mentorias/dashboard/MonthlyTrendChart.tsx</p>
          </div>
          <PreviewCodeTabs
            preview={
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px] items-stretch">
                <MonthlyTrendChart mentores={mentores} />
                <GoalAdherenceChart mentores={mentores} />
              </div>
            }
            code={`import MonthlyTrendChart from "@/components/mentorias/dashboard/MonthlyTrendChart"\nimport GoalAdherenceChart from "@/components/mentorias/dashboard/GoalAdherenceChart"\nimport { getMentores } from "@/lib/mentorias/mentorias"\n\nconst mentores = getMentores()\n\n<div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px] items-stretch">\n  <MonthlyTrendChart mentores={mentores} />\n  <GoalAdherenceChart mentores={mentores} />\n</div>`}
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Ranking de mentores</h3>
            <p className="text-xs font-mono text-muted-foreground">src/components/mentorias/dashboard/MentorRankingChart.tsx</p>
          </div>
          <PreviewCodeTabs
            preview={<MentorRankingChart mentores={mentores} />}
            code={`import MentorRankingChart from "@/components/mentorias/dashboard/MentorRankingChart"\nimport { getMentores } from "@/lib/mentorias/mentorias"\n\nconst mentores = getMentores()\n\n<MentorRankingChart mentores={mentores} />`}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">Componentes de tabela</h2>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Detalhamento por mentor e mês</h3>
            <p className="text-xs font-mono text-muted-foreground">src/components/mentorias/dashboard/MentoriasTable.tsx</p>
            <p className="text-sm text-muted-foreground">Tabela com filtros, badges de status por mês e alternância Tabela / Gráfico.</p>
          </div>
          <PreviewCodeTabs
            preview={<MentoriasTable mentores={mentores} />}
            code={`import MentoriasTable from "@/components/mentorias/dashboard/MentoriasTable"\nimport { getMentores } from "@/lib/mentorias/mentorias"\n\nconst mentores = getMentores()\n\n<MentoriasTable mentores={mentores} />`}
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Evolução dos mentorados</h3>
            <p className="text-xs font-mono text-muted-foreground">src/components/mentorias/dashboard/EvolucaoMentoradosTable.tsx</p>
            <p className="text-sm text-muted-foreground">Percentuais de adesão por mentorado, com linha de média geral e alternância Tabela / Gráfico.</p>
          </div>
          <PreviewCodeTabs
            preview={<EvolucaoMentoradosTable />}
            code={`import EvolucaoMentoradosTable from "@/components/mentorias/dashboard/EvolucaoMentoradosTable"\n\n<EvolucaoMentoradosTable />`}
          />
        </div>
      </div>
    </div>
  )
}

function TypographySection() {
  return (
    <div>
      <SectionHeader title="Tipografia" description="Fonte definida em src/design-system/tokens/typography.css (--font-inter)." />
      <PreviewCodeTabs
        preview={
          <div className="space-y-4">
            <p className="text-3xl font-bold">Aa Bb Cc — Inter Bold</p>
            <p className="text-xl font-semibold">Aa Bb Cc — Inter Semibold</p>
            <p className="text-base font-medium">Aa Bb Cc — Inter Medium</p>
            <p className="text-sm font-normal text-muted-foreground">Aa Bb Cc — Inter Regular (texto secundário)</p>
          </div>
        }
        code={
          <div className="space-y-3">
            <CodeBlock
              label="Token"
              code={`--font-inter: 'Inter', sans-serif;\n--font-sans: var(--font-inter); /* mapeado via @theme inline */`}
            />
            <CodeBlock
              label="Uso"
              code={`<p className="text-3xl font-bold">Aa Bb Cc — Inter Bold</p>\n<p className="text-xl font-semibold">Aa Bb Cc — Inter Semibold</p>\n<p className="text-base font-medium">Aa Bb Cc — Inter Medium</p>\n<p className="text-sm font-normal text-muted-foreground">Aa Bb Cc — Inter Regular (texto secundário)</p>`}
            />
          </div>
        }
      />
    </div>
  )
}

function RadiusSection() {
  return (
    <div>
      <SectionHeader title="Raio de borda" description="Escala derivada de --radius em src/design-system/tokens/spacing.css." />
      <PreviewCodeTabs
        preview={
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {RADIUS_TOKENS.map((token) => (
              <TokenSwatch
                key={token.cssVar}
                token={token}
                dark={false}
                preview={
                  <div
                    className="size-10 shrink-0 border-2 border-primary bg-muted"
                    style={{ borderRadius: `var(${token.cssVar})` }}
                  />
                }
              />
            ))}
          </div>
        }
        code={buildTokenBlock("@theme inline", RADIUS_TOKENS, false)}
      />
    </div>
  )
}

function ButtonsSection() {
  return (
    <div>
      <SectionHeader title="Botões" description="src/components/ui/button.tsx" />
      <PreviewCodeTabs
        preview={
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        }
        code={`<Button>Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="link">Link</Button>\n\n<Button size="sm">Small</Button>\n<Button size="default">Default</Button>\n<Button size="lg">Large</Button>`}
      />
    </div>
  )
}

function BadgesSection() {
  return (
    <div>
      <SectionHeader title="Badges" description="src/components/ui/badge.tsx" />
      <PreviewCodeTabs
        preview={
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="warning">Warning</Badge>
          </div>
        }
        code={`<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="destructive">Destructive</Badge>\n<Badge variant="warning">Warning</Badge>`}
      />
    </div>
  )
}

function StatusBadgeSection() {
  return (
    <div>
      <SectionHeader
        title="StatusBadge"
        description="src/components/composites/StatusBadge.tsx — combinação única em todo o projeto."
      />
      <PreviewCodeTabs
        preview={
          <div className="flex flex-wrap items-center gap-3">
            {STATUS_OPTIONS.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
        }
        code={`<StatusBadge status="atingiu" />\n<StatusBadge status="em_andamento" />\n<StatusBadge status="nao_atingiu" />`}
      />
    </div>
  )
}

function FormSection() {
  return (
    <div>
      <SectionHeader title="Formulário" description="Input, Textarea, Select e Switch, com Label associado via id/htmlFor." />
      <PreviewCodeTabs
        preview={
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ds-input">Input</Label>
              <Input id="ds-input" placeholder="Digite algo…" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ds-select">Select</Label>
              <Select defaultValue="a">
                <SelectTrigger id="ds-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Opção A</SelectItem>
                  <SelectItem value="b">Opção B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ds-textarea">Textarea</Label>
              <Textarea id="ds-textarea" placeholder="Escreva algo…" />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="ds-switch" />
              <Label htmlFor="ds-switch">Switch</Label>
            </div>
          </div>
        }
        code={`<div className="space-y-2">\n  <Label htmlFor="input">Input</Label>\n  <Input id="input" placeholder="Digite algo…" />\n</div>\n\n<div className="space-y-2">\n  <Label htmlFor="select">Select</Label>\n  <Select defaultValue="a">\n    <SelectTrigger id="select">\n      <SelectValue />\n    </SelectTrigger>\n    <SelectContent>\n      <SelectItem value="a">Opção A</SelectItem>\n      <SelectItem value="b">Opção B</SelectItem>\n    </SelectContent>\n  </Select>\n</div>\n\n<div className="space-y-2">\n  <Label htmlFor="textarea">Textarea</Label>\n  <Textarea id="textarea" placeholder="Escreva algo…" />\n</div>\n\n<div className="flex items-center gap-2">\n  <Switch id="switch" />\n  <Label htmlFor="switch">Switch</Label>\n</div>`}
      />
    </div>
  )
}

function CardSection() {
  return (
    <div>
      <SectionHeader title="Card" description="src/components/ui/card.tsx" />
      <PreviewCodeTabs
        preview={
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Título do card</CardTitle>
              <CardDescription>Descrição de exemplo do componente Card.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Conteúdo de exemplo.</p>
            </CardContent>
          </Card>
        }
        code={`<Card className="max-w-sm">\n  <CardHeader>\n    <CardTitle>Título do card</CardTitle>\n    <CardDescription>Descrição de exemplo do componente Card.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className="text-sm text-muted-foreground">Conteúdo de exemplo.</p>\n  </CardContent>\n</Card>`}
      />
    </div>
  )
}

function AvatarSection() {
  return (
    <div>
      <SectionHeader title="Avatar" description="src/components/ui/avatar.tsx" />
      <PreviewCodeTabs
        preview={
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>FB</AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" className="h-8" />
            <p className="text-sm text-muted-foreground">Avatar + Separator</p>
          </div>
        }
        code={`<div className="flex items-center gap-3">\n  <Avatar>\n    <AvatarFallback>FB</AvatarFallback>\n  </Avatar>\n  <Separator orientation="vertical" className="h-8" />\n  <p className="text-sm text-muted-foreground">Avatar + Separator</p>\n</div>`}
      />
    </div>
  )
}

// ── Navegação lateral ────────────────────────────────────────────────────────

function NavButton({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm font-medium transition-colors",
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{item.label}</span>
    </button>
  )
}

function NavList({ activeId, onSelect }: { activeId: SectionId; onSelect: (id: SectionId) => void }) {
  return (
    <nav className="space-y-5">
      <NavButton
        item={{ id: "overview", label: "Introdução", description: "", icon: LayoutGrid }}
        active={activeId === "overview"}
        onClick={() => onSelect("overview")}
      />
      <NavButton
        item={{ id: "how-to-use", label: "Como usar", description: "", icon: BookOpen }}
        active={activeId === "how-to-use"}
        onClick={() => onSelect("how-to-use")}
      />
      {NAV_GROUPS.map((group) => (
        <div key={group.title} className="space-y-1">
          <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">{group.title}</p>
          {group.items.map((item) => (
            <NavButton key={item.id} item={item} active={activeId === item.id} onClick={() => onSelect(item.id)} />
          ))}
        </div>
      ))}
    </nav>
  )
}

function renderSection(active: SectionId, dark: boolean, onNavigate: (id: SectionId) => void): ReactNode {
  switch (active) {
    case "overview":
      return <OverviewSection onNavigate={onNavigate} />
    case "how-to-use":
      return <HowToUseSection onNavigate={onNavigate} />
    case "colors":
      return <ColorsSection dark={dark} />
    case "charts":
      return <ChartsSection dark={dark} />
    case "typography":
      return <TypographySection />
    case "radius":
      return <RadiusSection />
    case "buttons":
      return <ButtonsSection />
    case "badges":
      return <BadgesSection />
    case "status-badge":
      return <StatusBadgeSection />
    case "form":
      return <FormSection />
    case "card":
      return <CardSection />
    case "avatar":
      return <AvatarSection />
    default:
      return null
  }
}

export default function DesignSystemPage() {
  const [dark, setDark] = useState(false)
  const [active, setActive] = useState<SectionId>("overview")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  function goTo(id: SectionId) {
    setActive(id)
    setMobileNavOpen(false)
  }

  const activeLabel =
    active === "overview"
      ? "Introdução"
      : active === "how-to-use"
        ? "Como usar"
        : ALL_NAV_ITEMS.find((item) => item.id === active)?.label

  return (
    <div className={cn(dark && "dark")}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menu de navegação"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <SheetContent side="left" className="w-72 gap-0 p-0">
              <SheetTitle className="sr-only">Menu de navegação — Design System People Hub</SheetTitle>
              <div className="border-b border-border px-4 py-4">
                <BrandMark size="sm" />
              </div>
              <div className="overflow-y-auto px-2 py-3">
                <NavList activeId={active} onSelect={goTo} />
              </div>
            </SheetContent>
          </Sheet>

          <button type="button" onClick={() => goTo("overview")} className="flex shrink-0 items-center gap-2">
            <BrandMark size="sm" />
          </button>
          <div className="hidden h-6 w-px bg-border sm:block" />
          <p className="hidden truncate text-sm font-semibold text-foreground sm:block">Design System</p>

          <div className="ml-auto flex items-center gap-2">
            <Label htmlFor="ds-dark-toggle" className="hidden text-sm text-muted-foreground sm:inline">
              Dark mode
            </Label>
            <Switch id="ds-dark-toggle" checked={dark} onCheckedChange={setDark} />
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-[1440px]">
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border py-4 pl-2 pr-3 md:block">
            <NavList activeId={active} onSelect={goTo} />
          </aside>

          <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10">
            <p className="mb-4 text-xs text-muted-foreground md:hidden">{activeLabel}</p>
            {renderSection(active, dark, goTo)}
          </main>
        </div>
      </div>
    </div>
  )
}
