import { SERVER_ERROR } from '../constans/errors';

export default class DeleteError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = SERVER_ERROR;
  }
}
