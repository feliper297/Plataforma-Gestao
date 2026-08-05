import mentoresJson from '@/data/mentorias/mentorias.json'
import mentoradosJson from '@/data/mentorias/mentorados.json'
import evolucaoMentoradosJson from '@/data/mentorias/evolucao-mentorados.json'
import type { Mentor, MentoradoEvolucao, MesData, MesNome } from '@/types/mentoria'

export const MESES: MesNome[] = ['Março', 'Abril', 'Maio', 'Junho', 'Julho']
export const MESES_EVOLUCAO_MENTORADOS: MesNome[] = ['Abril', 'Maio', 'Junho', 'Julho']

export function getMentores(): Mentor[] {
  return mentoresJson as Mentor[]
}

export function getEvolucaoMentorados(): MentoradoEvolucao[] {
  return evolucaoMentoradosJson as MentoradoEvolucao[]
}

export type Overview = {
  totalSessoes: number
  mentoresAtivos: number
  mentoradosAtendidos: number
  taxaAtingimento: number
}

// Nota: totalSessoes inclui sessões parciais de meses em andamento (ex.: Julho), assim
// como totalGeral (usado em getMentorRanking). Já taxaAtingimento considera apenas
// meses fechados (mes.total !== null), pois um mês em andamento ainda não tem um
// resultado final para avaliar contra a meta.
export function getOverview(mentores: Mentor[]): Overview {
  let totalSessoes = 0
  const mentoradosAtendidos = (mentoradosJson as string[]).length
  let mesesFechados = 0
  let mesesAtingiram = 0

  for (const mentor of mentores) {
    for (const mes of mentor.meses) {
      if (mes.total !== null) {
        totalSessoes += mes.total
        mesesFechados += 1
        if (mes.total >= mentor.metaMensal) mesesAtingiram += 1
      } else {
        totalSessoes += mes.semanas.reduce((soma: number, s) => soma + (s ?? 0), 0)
      }
    }
  }

  const taxaAtingimento = mesesFechados > 0 ? Math.round((mesesAtingiram / mesesFechados) * 100) : 0

  return {
    totalSessoes,
    mentoresAtivos: mentores.length,
    mentoradosAtendidos,
    taxaAtingimento,
  }
}

export type MonthlyTrendPoint = {
  mes: MesNome
  sessoes: number
  meta: number | null
}

export function getMonthlyTrend(mentores: Mentor[]): MonthlyTrendPoint[] {
  return MESES.map(mesNome => {
    let sessoes = 0
    let metaTotal = 0
    let temFechado = false
    for (const mentor of mentores) {
      const mesData = mentor.meses.find(m => m.mes === mesNome)
      if (mesData && mesData.total !== null) {
        sessoes += mesData.total
        metaTotal += mentor.metaMensal
        temFechado = true
      }
    }
    return { mes: mesNome, sessoes, meta: temFechado ? metaTotal : null }
  })
}

export type RankingEntry = { nome: string; totalGeral: number }

export function getMentorRanking(mentores: Mentor[]): RankingEntry[] {
  return [...mentores]
    .sort((a, b) => b.totalGeral - a.totalGeral)
    .map(m => ({ nome: m.nome, totalGeral: m.totalGeral }))
}

export type GoalStatus = 'atingiu' | 'nao_atingiu' | 'em_andamento'

export function getStatus(mes: Pick<MesData, 'total'>, metaMensal: number): GoalStatus {
  if (mes.total === null) return 'em_andamento'
  return mes.total >= metaMensal ? 'atingiu' : 'nao_atingiu'
}

export type GoalAdherenceSlice = { status: string; value: number; statusKey: GoalStatus }

export function getGoalAdherence(mentores: Mentor[]): GoalAdherenceSlice[] {
  let atingiu = 0
  let naoAtingiu = 0
  let emAndamento = 0

  for (const mentor of mentores) {
    for (const mes of mentor.meses) {
      const status = getStatus(mes, mentor.metaMensal)
      if (status === 'atingiu') atingiu += 1
      else if (status === 'nao_atingiu') naoAtingiu += 1
      else emAndamento += 1
    }
  }

  return [
    { status: 'Atingiu meta', value: atingiu, statusKey: 'atingiu' },
    { status: 'Não atingiu', value: naoAtingiu, statusKey: 'nao_atingiu' },
    { status: 'Em andamento', value: emAndamento, statusKey: 'em_andamento' },
  ]
}

export type MentorInativo = { id: string; nome: string; ultimasSemanas: (number | null)[] }

// Aproxima "últimos 15 dias" pelas 2 últimas semanas de Julho (S02 e S03), já que os
// dados são semanais e não têm datas exatas (ver conversa que definiu essa regra).
export function getMentoresInativos15Dias(mentores: Mentor[]): MentorInativo[] {
  return mentores
    .filter(mentor => {
      const julho = mentor.meses.find(m => m.mes === 'Julho')
      if (!julho) return false
      const [, s02, s03] = julho.semanas
      return !s02 && !s03
    })
    .map(mentor => {
      const julho = mentor.meses.find(m => m.mes === 'Julho')!
      return { id: mentor.id, nome: mentor.nome, ultimasSemanas: julho.semanas.slice(1, 3) }
    })
}

export type MentorMonthRow = {
  mentorId: string
  mentorNome: string
  mes: MesNome
  qtdeMentorados: number
  sessoesRealizadas: number | null
  metaMensal: number
  status: GoalStatus
  semanas: (number | null)[]
}

export function getTableRows(mentores: Mentor[]): MentorMonthRow[] {
  const rows: MentorMonthRow[] = []
  for (const mentor of mentores) {
    for (const mes of mentor.meses) {
      rows.push({
        mentorId: mentor.id,
        mentorNome: mentor.nome,
        mes: mes.mes,
        qtdeMentorados: mentor.qtdeMentorados,
        sessoesRealizadas: mes.total,
        metaMensal: mentor.metaMensal,
        status: getStatus(mes, mentor.metaMensal),
        semanas: mes.semanas,
      })
    }
  }
  return rows
}
