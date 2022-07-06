import HttpsStatusCode from '../responses/HttpsStatusCode';
import HttpsException from './HttpsException';

class UserContainTasksException extends HttpsException {
  constructor() {
    super(HttpsStatusCode.CONFLICT, 'Impossivel excluir, pois o usuario contem tarefas relacionadas.');
  }
}

export default UserContainTasksException;
