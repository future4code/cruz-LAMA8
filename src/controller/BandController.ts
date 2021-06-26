import { Request, Response } from 'express';
import { BandInputDTO } from '../model/Models';
import { BaseDatabase } from '../data/BaseDatabase';
import { BandBusiness } from '../business/BandBusiness';

export class BandController {
  async create(req: Request, res: Response) {
    try {
      const input: BandInputDTO = {
        token: req.headers.authorization as string,
        name: req.body.name,
        music_genre: req.body.music_genre,
        responsible: req.body.responsible
      };

      const bandBusiness = new BandBusiness();
      await bandBusiness.createBand(input);

      res.status(200).send('Sucess');
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  async getBand(req: Request, res: Response) {
    try {
      const name = req.query.name as string;
      const bandBusiness = new BandBusiness();
      const band = await bandBusiness.getBandbyName(name);
      res.status(200).send({ band });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
