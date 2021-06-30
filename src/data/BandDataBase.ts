import { BaseDatabase } from './BaseDatabase';

export class BandDatabase extends BaseDatabase {
  private static TABLE_NAME = 'NOME_TABELA_BANDAS';

  public async createBand(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
            id,
            name,
            music_genre,
            responsible
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBand(name: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(BandDatabase.TABLE_NAME)
      .where({ name });

    return result[0];
  }
}
