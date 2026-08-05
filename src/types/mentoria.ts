export type MesNome = 'Março' | 'Abril' | 'Maio' | 'Junho' | 'Julho'

export type MesData = {
  mes: MesNome
  semanas: (number | null)[] // [S01, S02, S03, S04]
  total: number | null // null = mês em andamento / total não fechado
}

export type Mentor = {
  id: string
  nome: string
  qtdeMentorados: number
  metaMensal: number
  meses: MesData[]
  totalGeral: number // inclui sessões parciais do mês em andamento (Julho), mesmo com mes.total = null nesse mês
}

export type MesAdesao = {
  mes: MesNome
  semanas: (number | null)[] // [S01, S02, S03, S04], em % (0-100)
  media: number | null // % média do mês; null = mês em andamento / não fechado
}

export type MentoradoEvolucao = {
  nome: string
  meta: number // % meta de adesão
  meses: MesAdesao[]
  mediaTotal: number // % média geral do período
  evolucaoClara?: { sim: number; nao: number } // contagem de semanas com/sem evolução clara nos pontos discutidos
}
