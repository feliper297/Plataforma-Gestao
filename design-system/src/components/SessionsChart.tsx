import { useState } from "react"
import type { MonthlySession } from "./types"

const CHART_MARGIN = { top: 16, right: 16, bottom: 30, left: 34 }
const CHART_WIDTH = 620
const CHART_HEIGHT = 260
const CHART_Y_MAX = 60
const CHART_Y_TICKS = [0, 15, 30, 45, 60]

interface SessionsChartProps {
  data: MonthlySession[]
  goal: number
  mode: "barras" | "linhas"
}

function SessionsChartSvg({ data, goal, mode }: SessionsChartProps) {
  const plotWidth = CHART_WIDTH - CHART_MARGIN.left - CHART_MARGIN.right
  const plotHeight = CHART_HEIGHT - CHART_MARGIN.top - CHART_MARGIN.bottom
  const bandWidth = plotWidth / data.length
  const barWidth = 34

  const yFor = (value: number) => CHART_MARGIN.top + plotHeight - (value / CHART_Y_MAX) * plotHeight
  const xFor = (index: number) => CHART_MARGIN.left + bandWidth * index + bandWidth / 2

  const sessionsPoints = data.map((item, index) => ({
    x: xFor(index),
    y: yFor(item.value),
    value: item.value,
  }))
  const goalPoints = data.map((_, index) => ({ x: xFor(index), y: yFor(goal) }))
  const linePath = (points: { x: number; y: number }[]) =>
    points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="w-full h-auto"
      role="img"
      aria-label="Sessões realizadas por mês"
    >
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
          <text
            x={CHART_MARGIN.left - 8}
            y={yFor(tick)}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-muted-foreground text-[10px]"
            fontSize={10}
          >
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
            fill="var(--primary)"
          />
        ))}

      {mode === "linhas" && (
        <>
          <path d={linePath(sessionsPoints)} fill="none" stroke="var(--primary)" strokeWidth={2.5} />
          {sessionsPoints.map((p) => (
            <circle key={p.x} cx={p.x} cy={p.y} r={4} fill="var(--primary)" />
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
          fontSize={11}
          fontWeight="bold"
          fill="currentColor"
          className="fill-foreground tabular-nums"
        >
          {p.value}
        </text>
      ))}

      {data.map((item, index) => (
        <text
          key={item.month}
          x={xFor(index)}
          y={CHART_HEIGHT - 8}
          textAnchor="middle"
          fontSize={11}
          className="fill-muted-foreground"
          fill="oklch(0.556 0 0)"
        >
          {item.month}
        </text>
      ))}
    </svg>
  )
}

interface SessionsChartCardProps {
  data?: MonthlySession[]
  goal?: number
}

const DEFAULT_DATA: MonthlySession[] = [
  { month: "Março", value: 32 },
  { month: "Abril", value: 37 },
  { month: "Maio", value: 48 },
  { month: "Junho", value: 38 },
  { month: "Julho", value: 20 },
]

export default function SessionsChartCard({ data = DEFAULT_DATA, goal = 53 }: SessionsChartCardProps) {
  const [mode, setMode] = useState<"barras" | "linhas">("barras")

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border py-4 px-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Sessões realizadas por mês</h3>
          <p className="text-sm text-muted-foreground">Total de sessões concluídas em cada mês do período.</p>
        </div>
        <div className="flex items-center gap-0.5 rounded-full bg-muted p-0.5">
          <button
            onClick={() => setMode("barras")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              mode === "barras"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Barras
          </button>
          <button
            onClick={() => setMode("linhas")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              mode === "linhas"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Linhas
          </button>
        </div>
      </div>
      <div className="pt-5 px-5 pb-4 space-y-3">
        <SessionsChartSvg data={data} goal={goal} mode={mode} />
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
      </div>
    </div>
  )
}
