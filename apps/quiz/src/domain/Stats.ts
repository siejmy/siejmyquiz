import ow from 'ow'

export interface StatsEntry {
  quizId: string
  correctCount: number
  totalCount: number
}

export interface StatsSummary {
  sampleCount: number
  decileHistogram: number[]
  average: number
}

export function validateStatsEntry(
  o: StatsEntry | any,
): asserts o is StatsEntry {
  ow(o, 'StatsEntry', ow.object)
  ow(o.quizId, 'StatsEntry.quizId', ow.string.nonEmpty)
  ow(
    o.correctCount,
    'StatsEntry.correctCount',
    ow.number.finite.integer.greaterThanOrEqual(0),
  )
  ow(o.totalCount, 'StatsEntry.totalCount', ow.number.finite.integer.positive)
}

export function validateStatsSummary(
  o: StatsSummary | any,
): asserts o is StatsSummary {
  ow(o, 'StatsSummary', ow.object)
  ow(o.average, 'StatsSummary.average', ow.number.finite)
  ow(
    o.histogram,
    'StatsSummary.histogram',
    ow.array.ofType(ow.number.finite.integer.greaterThanOrEqual(0)),
  )
}

export function getStatsSummaryForEntries(entries: StatsEntry[]): StatsSummary {
  return {
    sampleCount: entries.length,
    decileHistogram: getDecilehistogramForEntries(entries),
    average: getAverageForEntries(entries),
  }
}

export function getPercentileOfResult(
  decentileHistogram: number[],
  correctFraction: number,
): number {
  const decileFloor = Math.floor(correctFraction * 10)
  const totalSamples = decentileHistogram.reduce(
    (sum, decile) => sum + decile,
    0,
  )
  const noSamplesUpToMyDecile = decentileHistogram
    .slice(0, decileFloor + 1)
    .reduce((sum, decile) => sum + decile, 0)
  return (Math.floor(10 * noSamplesUpToMyDecile) / totalSamples) * 10
}

function getAverageForEntries(entries: StatsEntry[]): number {
  const totalSum = entries.reduce(
    (sum, entry) => sum + entry.correctCount / entry.totalCount,
    0,
  )
  return totalSum / entries.length
}

function getDecilehistogramForEntries(entries: StatsEntry[]): number[] {
  const decileHistogram = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  entries.forEach(entry => {
    const percentResult = entry.correctCount / entry.totalCount
    const decileFloor = Number(Math.min(Math.floor(percentResult * 10), 9))
    decileHistogram[decileFloor] = (decileHistogram[decileFloor] || 0) + 1
  })
  return decileHistogram
}
