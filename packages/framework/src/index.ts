import ow from 'ow'

export interface Result {
  id: string
  templateName: string
  dataJSON: string
}

export function validateResult(o: Result | any): asserts o is Result {
  ow(o, 'Result', ow.object)
  ow(o.id, 'Result.id', ow.string)
  ow(o.templateName, 'Result.templateName', ow.string)
  ow(o.dataJSON, 'Result.dataJSON', ow.string)
}
