import ow from 'ow'

import { QuizABCD, validateQuizABCD } from './domain'

export interface Configuration {
  title: string
  reCaptchaKey: string
  facebookAppId: string
  quizUrl: string
}

export function validateConfiguration(c: Configuration) {
  ow(c, 'Configuration', ow.object)
  ow(c.title, 'Configuration.title', ow.string.nonEmpty)
  ow(c.reCaptchaKey, 'Configuration.reCaptchaKey', ow.string.nonEmpty)
  ow(c.facebookAppId, 'Configuration.facebookAppId', ow.string.nonEmpty)
  ow(c.quizUrl, 'Configuration.quizUrl', ow.string)
}
