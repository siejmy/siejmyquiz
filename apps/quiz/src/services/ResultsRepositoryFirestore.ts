import { Result, validateResult } from '@/domain'

const collection = 'results'
export class ResultsRepositoryFirestore {
  public async saveResult(r: Result) {
    validateResult(r)
    return window.firebase
      .firestore()
      .collection(collection)
      .doc(r.id)
      .set(r)
  }

  public async getResultById(id: string): Promise<Result> {
    const doc = await window.firebase
      .firestore()
      .collection(collection)
      .doc(id)
      .get()
    if (!doc.exists) {
      throw new Error('No such result with id ' + id)
    }
    const data = doc.data()
    validateResult(data)
    return data
  }
}

export const resultsRepositoryFirestore = new ResultsRepositoryFirestore()
