import { EMAIL_ERROR } from '../constans/errors';

export default class EmailError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = EMAIL_ERROR;
  }
}
