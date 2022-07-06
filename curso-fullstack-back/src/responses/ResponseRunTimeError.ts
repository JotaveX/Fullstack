import { Response } from 'express';
import HttpsStatusCode from './HttpsStatusCode';

function responseRuntimeError(res: Response, status: HttpsStatusCode, message:string) {
  const body = {};
  const error = true;

  return res.status(status).send({
    status, message, error, body,
  });
}

export default responseRuntimeError;
