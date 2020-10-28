import { QuizABCD } from '@/domain'
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
            await resultsRepositoryFirestore.saveResult(ctx.result)
            await statsEntryRepositoryFirestore.saveStatsEntry(ctx.stats!)
          },
        },
      })
      .withContext({
        ...initialContext,
        quiz,
      }),
  )
    .onTransition(state => console.log(state.toStrings()))
    .onEvent(evt => console.log(evt))
    .onChange(ctx => console.log(ctx))
}
