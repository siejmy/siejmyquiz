import { generateHtml } from "./generateHtml";
import { Result, validateResult } from "./types";

export function handleResultFn(result: Result) {
  validateResult(result);
  return generateHtml(result);
}
