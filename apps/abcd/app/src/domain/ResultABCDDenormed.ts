import ow from 'ow'

import {
  StatsEntry,
  StatsSummary,
  validateStatsEntry,
  validateStatsSummary,
} from './Stats'

export interface ResultABCDDenormed {
  name: string
  answers: number[]
  quizUrl: string
  statsSummary: StatsSummary
  statsEntry: StatsEntry
}

export function validateResultABCDDenormed(
  o: ResultABCDDenormed | any,
): asserts o is ResultABCDDenormed {
  ow(o, 'ResultABCDDenormed', ow.object)
  ow(o.name, 'ResultABCDDenormed.name', ow.string.maxLength(40))
  ow(o.quizUrl, 'ResultABCDDenormed.quizUrl', ow.string)
  ow(
    o.answers,
    'ResultABCDDenormed.answers',
    ow.array.ofType(ow.number.finite.integer),
  )
  validateStatsSummary(o.statsSummary)
  validateStatsEntry(o.statsEntry)
}
