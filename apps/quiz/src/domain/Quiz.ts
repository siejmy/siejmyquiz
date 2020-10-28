import { QuizABCD } from './QuizABCD'

interface AnyQuiz {
  id: string
  type: string
}

export type Quiz = AnyQuiz | QuizABCD
