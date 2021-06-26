import { ShowInputDTO, UserRole } from '../model/Models';
import { IdGenerator } from '../services/IdGenerator';
import { Authenticator } from '../services/Authenticator';
import { ShowDatabase } from '../data/ShowDataBase';

export class ShowBusiness {
  async createShow(show: ShowInputDTO) {
    const token = new Authenticator();
    const resulttoken = token.getData(show.token);
    // const days = ['sexta', 'sábado', 'domingo'];

    if (!resulttoken) {
      throw new Error('Invalid Token');
    }

    if (resulttoken.role !== UserRole.ADMIN) {
      throw new Error('You dont have permission to access this');
    }

    if (!show.week_day || !show.start_time || !show.end_time) {
      throw new Error('Invalid Arguments');
    }

    if (show.start_time <= 8 && show.end_time >= 23) {
      throw new Error('Invalid schedule');
    }

    // days.map((day) => {
    //   if (day !== show.week_day) {
    //     console.log(day, show.week_day)
    //     throw new Error('Invalid day ');
    //   }
    // });

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const showDatabase = new ShowDatabase();
    await showDatabase.createShow(
      id,
      show.week_day,
      show.start_time,
      show.end_time,
      show.band_id
    );
  }

  async getShowByDay(day: string) {
    if (!day) {
      throw new Error('Invalid arguments');
    }

    const showDatabase = new ShowDatabase();
    const shows: [] = await showDatabase.getShow(day);
    if (!shows) {
      throw new Error('No shows on this day');
    }
    return shows;
  }
}
