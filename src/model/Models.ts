export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: UserRole
    ) {
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRole() {
        return this.role;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setRole(role: UserRole) {
        this.role = role;
    }

    static stringToUserRole(input: string): UserRole {
        switch (input) {
            case 'NORMAL':
                return UserRole.NORMAL;
            case "ADMIN":
                return UserRole.ADMIN;
            default:
                throw new Error('Invalid user role');
        }
    }

    static toUserModel(user: any): User {
        if (!user) {
            throw new Error('Invalid user');
        }
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            User.stringToUserRole(user.role)
        );
    }
}

export interface UserInputDTO {
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface LoginInputDTO {
    email: string;
    password: string;
}

export enum UserRole {
    NORMAL = 'NORMAL',
    ADMIN = 'ADMIN'
}

export interface BandInputDTO {
    token: string;
    name: string;
    music_genre: string;
    responsible: string;
}

export enum weekDay {
    SEXTA = "Sexta",
    SABADO = "Sábado",
    DOMINGO = "Domingo"
}

export interface ShowInputDTO {
    token: string,
    week_day: weekDay,
    start_time: number,
    end_time: number,
    band_id: string
}

export interface ShowOutputDTO {
    id: string,
    week_day: weekDay,
    start_time: number,
    end_time: number,
    band_id: string
}

export interface searchDTO {
    id: string
    name: string
}

export type show = {
    week_day: weekDay
    start_time: number
    end_time: number
    band_id: string
}