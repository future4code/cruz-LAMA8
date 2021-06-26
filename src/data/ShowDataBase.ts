import { BaseDatabase } from './BaseDatabase';

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME = 'NOME_TABELA_SHOWS';

  public async createShow(
    id: string,
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          week_day,
          start_time,
          end_time,
          band_id
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getShow(week_day: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(ShowDatabase.TABLE_NAME)
      .where({ week_day })
      .orderBy('start_time', 'asc');

    return result;
  }
}
