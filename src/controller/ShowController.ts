import { Request, Response } from 'express';
import {searchDTO, show, ShowInputDTO, weekDay} from '../model/Models';
import { BaseDatabase } from '../data/BaseDatabase';
import { ShowBusiness } from '../business/ShowBusiness';

export class ShowController {
  async create(req: Request, res: Response) {
    try {
      const input: ShowInputDTO = {
        token: req.headers.authorization as string,
        week_day: req.body.weekDay,
        start_time: req.body.startTime,
        end_time: req.body.endTime,
        band_id: req.body.bandId
      };

      const showBusiness = new ShowBusiness();
      await showBusiness.createShow(input);

      res.status(200).send('Sucess');
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  async getShow(req: Request, res: Response) {
    try {
      const data = req.body.data as string;
      const showBusiness = new ShowBusiness();
      const show = await showBusiness.getShowByDay(data);
      res.status(200).send({ show });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
