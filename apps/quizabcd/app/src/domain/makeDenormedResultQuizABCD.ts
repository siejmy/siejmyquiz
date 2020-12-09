import {
  getStatsSummaryForEntries,
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
  quizUrl: string,
  statsEntry: StatsEntry,
  statsEntries: StatsEntry[],
): Result {
  const resultDenormed: ResultABCDDenormed = {
    ...resultData,
    quizUrl,
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
