import { Response, Request, NextFunction } from 'express';
import HttpsException from '../errors/HttpsException';
import HttpsStatusCode from '../responses/HttpsStatusCode';
import responseRunTimeError from '../responses/ResponseRunTimeError';

function runTimeErrorMiddleware(error: HttpsException, req: Request, res: Response, next: NextFunction) {
  const status = error.status || HttpsStatusCode.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Erro não indentificado.';

  responseRunTimeError(res, status, message);
}

export default runTimeErrorMiddleware;
