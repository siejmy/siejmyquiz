import { StatsEntry, validateStatsEntry } from '@/domain'
import ow from 'ow'

export class StatsEntryRepositoryFirestore {
  public async saveStatsEntry(entry: StatsEntry) {
    validateStatsEntry(entry)
    return this.getCol(entry.quizId)
      .doc()
      .set(entry)
  }

  public async getAllEntriesForQuiz(quizId: string): Promise<StatsEntry[]> {
    const snapshots = await this.getCol(quizId).get()
    const docs = snapshots.docs
    return docs
      .filter((snapshot: any) => snapshot.exists)
      .map((snapshot: any) => snapshot.data())
      .filter((data: any) => {
        try {
          validateStatsEntry(data)
          return true
        } catch (error) {
          console.error('Invalid stats entry in the DB', error, data)
          return false
        }
      })
  }

  private getCol(quizId: string) {
    ow(quizId, 'quizId', ow.string.nonEmpty)

    return window.firebase
      .firestore()
      .collection(`/stats_entries/${quizId}/entries`)
  }
}

export const statsEntryRepositoryFirestore = new StatsEntryRepositoryFirestore()
