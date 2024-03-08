import { NOT_FOUND_ERROR } from '../constans/errors';

export default class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
}
