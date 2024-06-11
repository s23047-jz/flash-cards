import { BASE_API } from './config';
// @ts-ignore
import { request } from '../utils/request';
import { ActiveUser } from './user';

export const USERS_ENDPOINTS = {
    me: `${BASE_API}/api/users/me/`,
    users_stats: (userId: string) => `${BASE_API}/api/users/user_stats/${userId}/`,
    verify_password: `${BASE_API}/api/users/verify_password/`,
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

}

export const UsersService = new Users();
