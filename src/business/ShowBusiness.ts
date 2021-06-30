import {searchDTO, ShowInputDTO, ShowOutputDTO, UserRole, weekDay} from '../model/Models';
import {IdGenerator} from '../services/IdGenerator';
import {Authenticator} from '../services/Authenticator';
import {ShowDatabase} from '../data/ShowDataBase';

export class ShowBusiness {

    async createShow(show: ShowInputDTO) {
        const token = new Authenticator();
        const resulttoken = token.getData(show.token);

        if (!resulttoken) {
            throw new Error('Invalid Token');
        }

        if (resulttoken.role !== UserRole.ADMIN) {
            throw new Error('You dont have permission to access this');
        }

        if (!show.week_day || !show.start_time || !show.end_time || !show.end_time) {
            throw new Error('Invalid Arguments');
        }

        if (show.start_time < 8 || show.end_time > 23 || show.start_time >= show.end_time) {
            throw new Error('Invalid schedule');
        }

        if (!(show.week_day in weekDay)) {
            throw new Error('Invalid date');
        }

        if (!Number.isInteger(show.start_time) || !Number.isInteger(show.end_time)) {
            throw new Error('Invalid time format.');
        }

        const verifyShows = await this.getShowByDay(show.week_day)

        if (!verifyShows) {
            throw new Error("There's already a show set for that time.");
        }

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

    // async getShowByDay(week_day: weekDay, start_time: number, end_time: number) {
    //     if (!week_day || !start_time || !end_time) {
    //         throw new Error('Invalid arguments');
    //     }
    //
    //     const showDatabase = new ShowDatabase();
    //     const shows: [] = await showDatabase.getShow(week_day);
    //
    //     if (!shows) {
    //         throw new Error('No shows on this day');
    //     }
    //     return shows;
    // }
    async getShowByDay(day: string) {
        if (!day) {
            throw new Error('Invalid arguments');
        }

        const showDatabase = new ShowDatabase();
        const shows: [] = await showDatabase.getShow(day);
        if (!shows) {
            throw new Error('No shows on this day');
        }
        return true;
    }
}

