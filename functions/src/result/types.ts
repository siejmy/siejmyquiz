import ow from "ow";

export interface Result {
  id: string;
  name: string;
  quizJSON: string;
  answers: number[];
}

export function validateResult(o: Result | any): asserts o is Result {
  ow(o, "Result", ow.object);
  ow(o.id, "Result.id", ow.string);
  ow(o.name, "Result.name", ow.string);
  ow(o.quizJSON, "Result.quizJSON", ow.string);

  ow(o.answers, "Result.answers", ow.array.ofType(ow.number.finite.integer));
}
