import type { AdherenceSegment } from "./types"

const DEFAULT_SEGMENTS: AdherenceSegment[] = [
  { label: "Atingiu meta", value: 22, color: "#22c55e" },
  { label: "Não atingiu", value: 18, color: "oklch(0.577 0.245 27.325)" },
  { label: "Em andamento", value: 10, color: "oklch(0.72 0.17 55)" },
]

interface AdherenceChartProps {
  segments?: AdherenceSegment[]
}

export default function AdherenceChartCard({ segments = DEFAULT_SEGMENTS }: AdherenceChartProps) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0)
  const withPct = segments.map((seg) => ({ ...seg, pct: (seg.value / total) * 100 }))

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border py-4 px-5">
        <h3 className="text-base font-semibold text-card-foreground">Aderência à meta (mentor × mês)</h3>
      </div>
      <div className="pt-5 px-5 pb-5 space-y-4">
        <div className="flex h-8 w-full overflow-hidden rounded-md bg-muted/40">
          {withPct.map((seg) => (
            <div
              key={seg.label}
              className="flex h-full items-center justify-center first:rounded-l-md last:rounded-r-md"
              style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
            >
              {seg.pct >= 10 && (
                <span className="text-xs font-bold tabular-nums text-white drop-shadow-sm">{seg.value}</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          {segments.map((seg) => (
            <span key={seg.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
              {seg.label} ·{" "}
              <span className="tabular-nums font-medium text-foreground">{seg.value}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
