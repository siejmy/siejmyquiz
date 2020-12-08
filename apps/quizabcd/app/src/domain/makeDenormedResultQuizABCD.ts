import {
  getStatsSummaryForEntries,
  QuizABCD,
  Result,
  ResultABCDDenormed,
  StatsEntry,
  validateResultABCDDenormed,
} from '@/domain'

export function makeDenormedResultQuizABCD(
  resultData: {
    id: string
    name: string
    answers: number[]
  },
  quiz: QuizABCD,
  statsEntry: StatsEntry,
  statsEntries: StatsEntry[],
): Result {
  const resultDenormed: ResultABCDDenormed = {
    ...resultData,
    quiz,
    statsSummary: getStatsSummaryForEntries(statsEntries),
    statsEntry,
  }

  validateResultABCDDenormed(resultDenormed)
  return {
    id: resultData.id,
    templateName: 'abcd_results',
    dataJSON: JSON.stringify(resultDenormed),
  }
}
