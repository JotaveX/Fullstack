import { Response } from 'express'; import HttpsStatusCode from './HttpsStatusCode';

function responseNotFound(res: Response) {
  const stats = HttpsStatusCode.NOT_FOUND;
  const message = 'Rota não identificada';
  const error = true;
  const body = {};

  return res.status(stats).send({
    stats, message, error, body,
  });
}

export default responseNotFound;
