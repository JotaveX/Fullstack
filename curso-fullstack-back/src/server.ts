import App from './app';
import DashController from './controllers/DashController';
import UserController from './controllers/UserController';
import VacaController from './controllers/VacaController';

const app = new App([
  new UserController(),
  new DashController(),
  new VacaController(),
]);

app.listen(3333);
