export type GoalStatus = "atingiu" | "nao_atingiu" | "em_andamento"

export interface MonthlySession {
  month: string
  value: number
}

export interface AdherenceSegment {
  label: string
  value: number
  color: string
}

export interface MentorPerformanceRow {
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

export interface MenteeAdherenceRow {
  name: string
  goal: number
  abr: number
  mai: number
  jun: number
  jul: number
  average: number
  status: GoalStatus
}
