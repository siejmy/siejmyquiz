import { Result, validateResult } from "./types";

export function handleResultFn(result: Result) {
  // validateResult(result);
  return JSON.stringify(result);
}
