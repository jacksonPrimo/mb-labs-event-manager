interface ErrorFieldInterface {
  field: string;
  message: string;
}

interface ErrorReturnInterface {
    message: string;
    code: number;
    fields?: ErrorFieldInterface[]
}

export default class ErrorReturn implements ErrorReturnInterface {
  code: number;
  message: string;
  fields: ErrorFieldInterface[]

  constructor (code: number, message: string, fields: ErrorFieldInterface[]) {
    this.code = code;
    this.message = message;
    this.fields = fields;
  }
}
