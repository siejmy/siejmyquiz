import { StatsEntry, validateStatsEntry } from '@/domain'

export class StatsEntryRepositoryFirestore {
  public async saveStatsEntry(entry: StatsEntry) {
    validateStatsEntry(entry)
    return this.getCol(entry.quizId)
      .doc()
      .set(entry)
  }

  private getCol(quizId: string) {
    return window.firebase
      .firestore()
      .collection(`/stats_entries/${quizId}/entries`)
  }
}

export const statsEntryRepositoryFirestore = new StatsEntryRepositoryFirestore()
