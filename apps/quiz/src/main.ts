import { mountQuiz } from './index'
export * from './index'

window.mountQuiz = mountQuiz

declare global {
  interface Window {
    mountQuiz: typeof mountQuiz
  }
}
