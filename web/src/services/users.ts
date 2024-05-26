import { BASE_API } from './config';
// @ts-ignore
import { request } from '../utils/request';
import { ActiveUser } from './user';

export const USERS_ENDPOINTS = {
    users_stats: (userId: string) => `${BASE_API}/api/users/user_stats/${userId}/`,
};

class Users {
    constructor() {}



        public async getUsersStats(userId: string) {
        // @ts-ignore
            const { data } = await request({
            url: USERS_ENDPOINTS.users_stats(userId),
        })
        return data;
    }
};

export const UsersService = new Users();