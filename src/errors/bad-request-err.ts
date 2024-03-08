import { BAD_REQUEST_ERROR } from '../constans/errors';

export default class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR;
  }
}
