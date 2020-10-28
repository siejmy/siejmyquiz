import ow from 'ow'

export interface StatsEntry {
  quizId: string
  correctCount: number
  totalCount: number
}

export interface StatsSummary {
  histogram: number[]
  average: number
}

export interface StatsEntryRepository {
  putEntry(entry: StatsEntry): Promise<void>
}

export interface StatsSummaryService {
  getStatsSummaryForQuiz(quizId: string): Promise<StatsSummary>
}

export function validateStatsEntry(
  o: StatsEntry | any,
): asserts o is StatsEntry {
  ow(o, 'StatsEntry', ow.object)
  ow(o.quizId, 'StatsEntry.quizId', ow.string.nonEmpty)
  ow(
    o.correctCount,
    'StatsEntry.correctCount',
    ow.number.finite.integer.positive,
  )
  ow(o.totalCount, 'StatsEntry.totalCount', ow.number.finite.integer.positive)
}

export function validateStatsSummary(
  o: StatsSummary | any,
): asserts o is StatsSummary {
  ow(o, 'StatsSummary', ow.object)
  ow(o.average, 'StatsSummary.average', ow.number.finite.integer.positive)
  ow(
    o.histogram,
    'StatsSummary.histogram',
    ow.array.ofType(ow.number.finite.integer.positive),
  )
}
