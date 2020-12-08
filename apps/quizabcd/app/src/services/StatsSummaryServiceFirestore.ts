import { getStatsSummaryForEntries, StatsSummary } from '@/domain'

import { statsEntryRepositoryFirestore } from './StatsEntryRepositoryFirestore'

export class StatsSummaryServiceFirestore {
  public async getForQuiz(quizId: string): Promise<StatsSummary> {
    const entries = await statsEntryRepositoryFirestore.getAllEntriesForQuiz(
      quizId,
    )
    return getStatsSummaryForEntries(entries)
  }
}

export const statsSummaryServiceFirestore = new StatsSummaryServiceFirestore()
