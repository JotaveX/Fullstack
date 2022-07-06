import { Response } from 'express'; import HttpsStatusCode from './HttpsStatusCode';

function responseOk(res: Response, body: any) {
  const stats = HttpsStatusCode.OK;
  const message = 'OK';
  const error = false;

  return res.status(stats).send({
    stats, message, error, body,
  });
}

export default responseOk;
