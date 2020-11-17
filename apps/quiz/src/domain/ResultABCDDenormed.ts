import ow from 'ow'

import { QuizABCD, validateQuizABCD } from './QuizABCD'
import { StatsSummary, validateStatsSummary } from './Stats'

export interface ResultABCDDenormed {
  name: string
  answers: number[]
  quiz: QuizABCD
  statsSummary: StatsSummary
}

export function validateResultABCDDenormed(
  o: ResultABCDDenormed | any,
): asserts o is ResultABCDDenormed {
  ow(o, 'ResultABCDDenormed', ow.object)
  ow(o.name, 'ResultABCDDenormed.name', ow.string)

  ow(
    o.answers,
    'ResultABCDDenormed.answers',
    ow.array.ofType(ow.number.finite.integer),
  )
  validateQuizABCD(o.quiz)
  validateStatsSummary(o.statsSummary)
}
