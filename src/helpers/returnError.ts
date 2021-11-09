interface ErrorFieldInterface {
  field: string;
  message: string;
}

interface ErrorReturnInterface {
    message: string;
    code: number;
    fields?: ErrorFieldInterface[]
}

export class ReturnError implements ErrorReturnInterface {
  code: number;
  message: string;
  fields: ErrorFieldInterface[]

  constructor (code: number, message: string, fields: ErrorFieldInterface[]) {
    this.code = code;
    this.message = message;
    this.fields = fields;
  }
}
