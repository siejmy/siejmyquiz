import { QuizABCD } from '@/domain'
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
            // await saveResults(ctx.result)
            // await saveStatsEntry(ctx.stats)
          },
        },
      })
      .withContext({
        ...initialContext,
        quiz,
      }),
  )
}
