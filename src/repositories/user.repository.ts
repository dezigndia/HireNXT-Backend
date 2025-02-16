import { IUser } from "models";
import {query} from '@utils';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getUser(column: string, value: number | string): Promise<IUser | null>;
    updateUser(userId: number, user: IUser): Promise<IUser | null>;
    deleteUser(userId: number): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
    private tableName: string = '';

    constructor(tableName: string) {
        this.tableName = tableName;
    }
    async createUser(user: IUser): Promise<IUser> {
        // Database query to insert a user
        return user;
    }
    
    async getUser(lable: string, value: string | number): Promise<IUser | null> {
        const getQuery = `select * from ${this.tableName} where ${lable} = $1`;
        const user = await query<IUser>(getQuery, [value]);
        return user[0];
    }
    
    async updateUser(userId: number, user: IUser): Promise<IUser | null> {
        return user;
    }
    
    async deleteUser(userId: number): Promise<boolean> {
        const deleteQuery = `delete from ${this.tableName} where id = $1`;
        await query(deleteQuery, [userId]);
        return true;
    }
}