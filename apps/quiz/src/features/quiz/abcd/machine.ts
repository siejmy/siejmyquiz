// tslint:disable trailing-comma
import { QuizABCD, Result, StatsEntry } from '@/domain'
import { v4 as uuid } from 'uuid'
import { assign, Interpreter, Machine } from 'xstate'

export interface Schema {
  states: {
    Intro: {}
    Question: {
      states: {
        Unanswered: {}
        AnswerCorrect: {}
        AnswerIncorrect: {}
      }
    }
    ProvideDetails: {
      states: {
        Name: {}
        NotARobot: {}
        SeeDetails: {}
      }
    }
    SavingResults: {}
    RedirectToSuccessPage: {}
    Error: {
      states: {
        Initial: {}
        HasResults: {}
        NoResults: {}
      }
    }
  }
}

export type Events =
  | { type: 'NEXT' }
  | { type: 'ANSWER'; no: number }
  | { type: 'SET_NAME'; name: string }
  | { type: 'NOT_A_ROBOT' }

export interface Context {
  quiz: QuizABCD
  result: Result
  stats?: StatsEntry
  currentQuestionNo: number
  name?: string
}

export const initialContext: Context = {
  quiz: {
    type: 'abcd',
    id: '',
    introHtml: '',
    questions: [],
  },
  result: {
    id: uuid(),
    name: '',
    quizJSON: '',
    answers: [],
  },
  currentQuestionNo: 0,
}

export const abcdQuizMachine = Machine<Context, Schema, Events>(
  {
    id: 'abcdQuiz',
    initial: 'Intro',
    context: initialContext,
    states: {
      Intro: {
        entry: ['assignQuizToResults'],
        on: {
          NEXT: 'Question',
        },
      },
      Question: {
        initial: 'Unanswered',
        states: {
          Unanswered: {
            on: {
              ANSWER: [
                {
                  target: 'AnswerCorrect',
                  cond: (ctx, evt) =>
                    ctx.quiz.questions[ctx.currentQuestionNo].correctNo ===
                    evt.no,
                },
                { target: 'AnswerIncorrect' },
              ],
            },
          },
          AnswerCorrect: {
            entry: 'markCorrectAnswer',
            on: {
              NEXT: [
                {
                  target: '#abcdQuiz.ProvideDetails',
                  cond: 'isLastQuestion',
                },
                {
                  target: 'Unanswered',
                  actions: 'nextQuestion',
                },
              ],
            },
          },
          AnswerIncorrect: {
            entry: 'markIncorrectAnswer',
            on: {
              NEXT: [
                {
                  target: '#abcdQuiz.ProvideDetails',
                  cond: 'isLastQuestion',
                },
                {
                  target: 'Unanswered',
                  actions: 'nextQuestion',
                },
              ],
            },
          },
        },
      },
      ProvideDetails: {
        initial: 'Name',
        states: {
          Name: {
            on: {
              SET_NAME: {
                target: 'NotARobot',
                actions: (_, evt) => assign({ name: evt.name }),
              },
            },
          },
          NotARobot: {
            on: {
              NOT_A_ROBOT: 'SeeDetails',
            },
          },
          SeeDetails: {
            on: {
              NEXT: '#abcdQuiz.SavingResults',
            },
          },
        },
      },
      SavingResults: {
        invoke: {
          src: 'saveResults',
          onDone: 'RedirectToSuccessPage',
          onError: { target: 'Error', actions: 'logError' },
        },
      },
      RedirectToSuccessPage: {},
      Error: {
        initial: 'Initial',
        states: {
          Initial: {
            on: {
              // currently always has results
              '': 'HasResults',
            },
          },
          HasResults: {},
          NoResults: {},
        },
      },
    },
  },
  {
    actions: {
      logError: (_, { data }: any) => console.error(new Error(data)),
      assignQuizToResults: assign({
        result: ctx => ({
          ...ctx.result,
          quizJSON: JSON.stringify(ctx.quiz),
        }),
      }),
      nextQuestion: assign({
        currentQuestionNo: ctx => ctx.currentQuestionNo + 1,
      }),
    },
    guards: {
      isLastQuestion: ctx =>
        ctx.currentQuestionNo === ctx.quiz.questions.length - 1,
    },
  },
)

export type ABCDQuizInterpreter = Interpreter<Context, Schema, Events>

export type ABCDQuizContext = Context
