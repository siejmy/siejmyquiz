import { Result, validateResult } from '@/domain'

const collection = 'results'
export class ResultsRepositoryFirestore {
  public async saveResult(r: Result) {
    validateResult(r)
    console.log('SAVE RESULT TO \'results/' + r.id + '\'', r)
    await window.firebase
      .firestore()
      .collection(collection)
      .doc(r.id)
      .set(r)
    const doc = await window.firebase
      .firestore()
      .collection(collection)
      .doc(r.id)
      .get()
    console.log('Results SAVE DONE, GOT ', doc.data())
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
