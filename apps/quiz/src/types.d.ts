import type * as firebase from 'firebase/app'

declare global {
  interface Window {
    firebase: firebase
  }
}
