import { Response } from 'express'; import HttpsStatusCode from './HttpsStatusCode';

function responseCreate(res: Response, body: any) {
  const stats = HttpsStatusCode.CREATED;
  const message = 'Criado com sucesso';
  const error = false;

  return res.status(stats).send({
    stats, message, error, body,
  });
}

export default responseCreate;
