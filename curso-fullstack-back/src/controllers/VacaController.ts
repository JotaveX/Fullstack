import { NextFunction, Request, Response } from 'express';
import Controller from './Controller';
import Vaca from '../schemas/vaca';
import ValidationService from '../services/ValidationService';
import ServerErrorException from '../errors/ServerErrorException';
import NoContentException from '../errors/NoContentException';
import responseCreate from '../responses/ResponseCreate';
import responseOk from '../responses/ResponseOk';

class VacaController extends Controller {
  static find: any;
  constructor() {
    super('/vaca');
  }
  protected initRoutes(): void {
    this.router.get(this.path, this.list);
    this.router.get(`${this.path}/:id`, this.findById);
    this.router.post(this.path, this.create);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private async list(req: Request, res: Response, next: NextFunction) {
    try {
      const Vacas = await Vaca.find();
      if (Vaca.length > 0) return responseOk(res, Vacas);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (ValidationService.validateId(id, next)) return;

      const vaca = await Vaca.findById(id);
      if (Vaca) responseOk(res, vaca);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const vaca = await Vaca.create(req.body);

      return responseCreate(res, vaca);
    } catch (error) {
      return (new ServerErrorException(error));
    }
  }

  private async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (ValidationService.validateId(id, next)) return;

      const vaca = await Vaca.findByIdAndUpdate(id, req.body, () => {});
      if (vaca) return responseOk(res, vaca);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (ValidationService.validateId(id, next)) return;

      const vaca = await Vaca.findById(id);
      if (vaca) {
        vaca.deleteOne();
        return responseOk(res, vaca);
      }
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }
}

export default VacaController;
