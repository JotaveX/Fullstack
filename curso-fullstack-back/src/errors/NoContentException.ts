import HttpsStatusCode from '../responses/HttpsStatusCode';
import HttpsException from './HttpsException';

class NoContentException extends HttpsException {
  constructor() {
    super(HttpsStatusCode.NO_CONTENT, 'Não foi localizado nenhum registro');
  }
}

export default NoContentException;
