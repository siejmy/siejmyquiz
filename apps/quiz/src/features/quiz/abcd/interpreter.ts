import { makeDenormedResultQuizABCD, QuizABCD } from '@/domain'
import {
  resultsRepositoryFirestore,
  statsEntryRepositoryFirestore,
} from '@/services'
import { interpret } from 'xstate'

import { ABCDQuizInterpreter, abcdQuizMachine, initialContext } from './machine'

export function interpretMachine({
  quiz,
}: {
  quiz: QuizABCD
}): ABCDQuizInterpreter {
  return interpret(
    abcdQuizMachine
      .withConfig({
        services: {
          saveResults: async ctx => {
            await statsEntryRepositoryFirestore.saveStatsEntry(ctx.stats!)
            const statsEntries = await statsEntryRepositoryFirestore //
              .getAllEntriesForQuiz(ctx.quiz.id)
            const result = makeDenormedResultQuizABCD(
              ctx.resultData,
              ctx.quiz,
              statsEntries,
            )
            await resultsRepositoryFirestore.saveResult(result)
          },
        },
      })
      .withContext({
        ...initialContext,
        quiz,
      }),
  )
}
