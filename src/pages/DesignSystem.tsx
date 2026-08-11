import { useState, type ReactNode } from "react"
import { Check, Copy } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import StatusBadge from "@/components/composites/StatusBadge"
import { cn } from "@/lib/utils"
import type { GoalStatus } from "@/lib/mentorias/mentorias"

/**
 * Valores de `light`/`dark` espelham literalmente as declarações de
 * src/design-system/tokens/*.css — este arquivo é documentação, não a fonte
 * dos tokens. Se um valor mudar lá, atualize aqui também.
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
      { name: "destructive", cssVar: "--destructive", light: "oklch(0.577 0.245 27.325)", dark: "oklch(0.704 0.191 22.216)" },
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

function Example({ code, children }: { code: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border p-4">{children}</div>
      <CodeBlock code={code} />
    </div>
  )
}

function TokenSwatch({ token, dark, preview }: { token: Token; dark: boolean; preview: ReactNode }) {
  const value = dark ? token.dark ?? token.light : token.light

  return (
    <div className="space-y-2 rounded-lg border border-border p-3">
      <div className="flex items-center gap-3">
        {preview}
        <p className="truncate text-sm font-medium text-foreground">{token.name}</p>
      </div>
      <code className="block truncate rounded bg-muted/60 px-2 py-1 font-mono text-[11px] text-muted-foreground">
        {token.cssVar}: {value};
      </code>
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

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}

export default function DesignSystemPage() {
  const [dark, setDark] = useState(false)

  return (
    <div className={cn(dark && "dark")}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">Design System</h1>
              <p className="text-sm text-muted-foreground">
                Tokens de <code>src/design-system</code> e componentes de <code>src/components/ui</code>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="ds-dark-toggle" className="text-sm text-muted-foreground">
                Dark mode
              </Label>
              <Switch id="ds-dark-toggle" checked={dark} onCheckedChange={setDark} />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl space-y-12 px-6 py-10">
          <Section title="Cores" description="Tokens semânticos definidos em src/design-system/tokens/colors.css.">
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
          </Section>

          <Section title="Gráficos" description="Paleta dedicada a Recharts em src/design-system/tokens/charts.css.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CHART_TOKENS.map((token) => (
                <ColorSwatch key={token.cssVar} token={token} dark={dark} />
              ))}
            </div>
          </Section>

          <Section title="Tipografia" description="Fonte definida em src/design-system/tokens/typography.css (--font-inter).">
            <Example code={`--font-inter: 'Inter', sans-serif;\n--font-sans: var(--font-inter); /* mapeado via @theme inline */`}>
              <div className="space-y-4">
                <p className="text-3xl font-bold">Aa Bb Cc — Inter Bold</p>
                <p className="text-xl font-semibold">Aa Bb Cc — Inter Semibold</p>
                <p className="text-base font-medium">Aa Bb Cc — Inter Medium</p>
                <p className="text-sm font-normal text-muted-foreground">Aa Bb Cc — Inter Regular (texto secundário)</p>
              </div>
            </Example>
          </Section>

          <Section title="Raio de borda" description="Escala derivada de --radius em src/design-system/tokens/spacing.css.">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RADIUS_TOKENS.map((token) => (
                <TokenSwatch
                  key={token.cssVar}
                  token={token}
                  dark={dark}
                  preview={
                    <div
                      className="size-10 shrink-0 border-2 border-primary bg-muted"
                      style={{ borderRadius: `var(${token.cssVar})` }}
                    />
                  }
                />
              ))}
            </div>
          </Section>

          <Section title="Botões" description="src/components/ui/button.tsx">
            <Example
              code={`<Button>Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="link">Link</Button>\n\n<Button size="sm">Small</Button>\n<Button size="default">Default</Button>\n<Button size="lg">Large</Button>`}
            >
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
            </Example>
          </Section>

          <Section title="Badges" description="src/components/ui/badge.tsx">
            <Example
              code={`<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="destructive">Destructive</Badge>\n<Badge variant="warning">Warning</Badge>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="warning">Warning</Badge>
              </div>
            </Example>
          </Section>

          <Section
            title="StatusBadge"
            description="src/components/composites/StatusBadge.tsx — combinação única em todo o projeto."
          >
            <Example
              code={`<StatusBadge status="atingiu" />\n<StatusBadge status="em_andamento" />\n<StatusBadge status="nao_atingiu" />`}
            >
              <div className="flex flex-wrap items-center gap-3">
                {STATUS_OPTIONS.map((status) => (
                  <StatusBadge key={status} status={status} />
                ))}
              </div>
            </Example>
          </Section>

          <Section title="Formulário" description="Input, Textarea, Select e Switch.">
            <Example
              code={`<Input placeholder="Digite algo…" />\n\n<Select defaultValue="a">\n  <SelectTrigger><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="a">Opção A</SelectItem>\n    <SelectItem value="b">Opção B</SelectItem>\n  </SelectContent>\n</Select>\n\n<Textarea placeholder="Escreva algo…" />\n\n<Switch />`}
            >
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
            </Example>
          </Section>

          <Section title="Card" description="src/components/ui/card.tsx">
            <Example
              code={`<Card>\n  <CardHeader>\n    <CardTitle>Título do card</CardTitle>\n    <CardDescription>Descrição de exemplo do componente Card.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Conteúdo de exemplo.</p>\n  </CardContent>\n</Card>`}
            >
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>Título do card</CardTitle>
                  <CardDescription>Descrição de exemplo do componente Card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Conteúdo de exemplo.</p>
                </CardContent>
              </Card>
            </Example>
          </Section>

          <Section title="Avatar" description="src/components/ui/avatar.tsx">
            <Example code={`<Avatar>\n  <AvatarFallback>FB</AvatarFallback>\n</Avatar>`}>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>FB</AvatarFallback>
                </Avatar>
                <Separator orientation="vertical" className="h-8" />
                <p className="text-sm text-muted-foreground">Avatar + Separator</p>
              </div>
            </Example>
          </Section>
        </main>
      </div>
    </div>
  )
}
