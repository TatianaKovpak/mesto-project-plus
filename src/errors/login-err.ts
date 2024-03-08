import { LOGIN_ERROR } from '../constans/errors';

export default class LoginError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = LOGIN_ERROR;
  }
}
