import { BASE_API } from "./config";
import { request } from "../utils/request";
import { NavigationProp } from "@react-navigation/native";

export const USERS_ENDPOINTS = {
    me: `${BASE_API}/api/users/me/`,
};

class Users {
    constructor() {}

    public async getMe(navigation: NavigationProp<any>) {
        return await request({
            url: USERS_ENDPOINTS.me,
            method: 'GET',
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
};

export const UsersService = new Users();
