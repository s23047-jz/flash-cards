import { BASE_API } from "./config";
import { request } from "../utils/request";
import { NavigationProp } from "@react-navigation/native";

export const USERS_ENDPOINTS = {
    me: `${BASE_API}/api/users/me/`,
    users_ranking: `${BASE_API}/api/users/users_ranking/`,
    users_stats: (userId) => `${BASE_API}/api/users/user_stats/${userId}/`,
};

class Users {
    constructor() {}

    public async getMe(navigation: NavigationProp<any>) {
        return await request({
            url: USERS_ENDPOINTS.me,
            navigation
        })
    }

    public async updateMe(body: object, navigation: NavigationProp<any>) {
        return await request({
            url: USERS_ENDPOINTS.me,
            method: 'PUT',
            body,
            navigation
        })
    }

    public async deleteMe(body: object, navigation: NavigationProp<any>) {
        await request({
            url: USERS_ENDPOINTS.me,
            method: 'DELETE',
            body,
            navigation
        })
    }

    public async getUsersRanking(query: object, navigation: NavigationProp<any>) {
        const { data } = await request({
            url: USERS_ENDPOINTS.users_ranking,
            query,
            navigation
        })
        return data;
    }

    public async getUserStats(userId, navigation: NavigationProp<any>) {
        const { data } = await request({
            url: USERS_ENDPOINTS.users_stats(userId),
            navigation
        })
        return data;
    }
};

export const UsersService = new Users();
