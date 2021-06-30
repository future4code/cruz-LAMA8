import { BandInputDTO, UserRole } from '../model/Models';
import { IdGenerator } from '../services/IdGenerator';
import { Authenticator } from '../services/Authenticator';
import { BandDatabase } from '../data/BandDataBase';

export class BandBusiness {
  async createBand(band: BandInputDTO) {
    const token = new Authenticator();
    const resulttoken = token.getData(band.token);

    if (!resulttoken) {
      throw new Error('Invalid Token');
    }

    if (resulttoken.role !== UserRole.ADMIN) {
      throw new Error('You dont have permission to access this');
    }

    if (!band.name || !band.music_genre || !band.responsible) {
      throw new Error('Invalid Arguments');
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const bandDatabase = new BandDatabase();
    await bandDatabase.createBand(
      id,
      band.name,
      band.music_genre,
      band.responsible
    );
  }

  async getBandbyName(name: string) {
    if (!name) {
      throw new Error('Invalid Arguments');
    }

    const bandDatabase = new BandDatabase();
    const bandName = await bandDatabase.getBand(name);
    if (!bandName) {
      throw new Error('Band not found');
    }
    return bandName;
  }
}
