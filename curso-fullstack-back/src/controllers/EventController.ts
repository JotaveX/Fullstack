import { NextFunction, Request, Response } from 'express';
import Controller from './Controller';
import ValidationService from '../services/ValidationService';

import ServerErrorException from '../errors/ServerErrorException';
import NoContentException from '../errors/NoContentException';
import responseCreate from '../responses/ResponseCreate';
import responseOk from '../responses/ResponseOk';
import Event, { EventInterface } from '../schemas/event';

class EventController extends Controller {
  constructor() {
    super('/event');
  }

  protected initRoutes(): void {
    this.router.get(`${this.path}/:id`, this.findById);
    this.router.post(this.path, this.create);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;

      const event = await Event.findById(id);
      if (event) return responseOk(res, event);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      let event = req.body;

      event = await Event.create(event);
      event = await Event.findById(event.id).populate('responsible');

      return responseCreate(res, event);
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;

      let event = req.body;

      event = await Event.findByIdAndUpdate(id, event, () => {});
      if (event) {
        event = await Event.findById(event.id).populate('responsible');
        return responseOk(res, event);
      }

      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;

      const event = await Event.findById(id);
      if (event) {
        event.deleteOne();
        return responseOk(res, event);
      }

      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }
}

export default EventController;
