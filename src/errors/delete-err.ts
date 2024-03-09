import { DELETE_ERROR } from '../constans/errors';

export default class DeleteError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = DELETE_ERROR;
  }
}
