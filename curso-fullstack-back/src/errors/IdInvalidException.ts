import HttpsStatusCode from '../responses/HttpsStatusCode';
import HttpsException from './HttpsException';

class IdInvalidException extends HttpsException {
  constructor() {
    super(HttpsStatusCode.BAD_REQUEST, 'Invalid Id');
  }
}

export default IdInvalidException;
