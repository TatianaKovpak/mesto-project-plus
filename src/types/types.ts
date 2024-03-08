import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: any
}

export interface CustomError extends Error {
  statusCode: number
}
