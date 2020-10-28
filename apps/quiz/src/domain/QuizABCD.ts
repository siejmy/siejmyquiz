import ow from 'ow'

export interface QuizABCD {
  id: string
  type: 'abcd'
  introHtml: string
  questions: QuizABCDQuestion[]
}

export interface QuizABCDQuestion {
  title: string
  imageUrl?: string
  questions: string[]
  correctNo: number
}

export function validateQuizABCD(o: QuizABCD | any): asserts o is QuizABCD {
  ow(o, 'QuizABCD', ow.object)
  ow(o.id, 'QuizABCD.id', ow.string.nonEmpty)
  ow(o.introHtml, 'QuizABCD.introHtml', ow.string.nonEmpty)
  ow(o.type, 'QuizABCD.type', ow.string.equals('abcd'))
  ow(o.questions, 'QuizABCD.questions', ow.array.ofType(ow.object))
  o.questions.forEach((q: any) => validateQuizABCDQuestion(q))
}

export function validateQuizABCDQuestion(
  o: QuizABCDQuestion | any,
): asserts o is QuizABCDQuestion {
  ow(o, 'QuizABCDQuestion', ow.object)
  ow(o.title, 'QuizABCD.title', ow.string.nonEmpty)
  ow(
    o.imageUrl,
    'QuizABCD.imageUrl',
    ow.any(ow.undefined, ow.string.nonEmpty.url),
  )
  ow(o.distractors, 'QuizABCD.distractors', ow.array.ofType(ow.string.nonEmpty))
  ow(o.correctNo, 'QuizABCD.correctNo', ow.number.integer.finite)
}
