import {BASE_API} from "./config";
import {request} from "../utils/request";
import {ActiveUser} from "./user";

export const AUTH_ENDPOINTS = {
    login: `${BASE_API}/api/auth/login/`,
    register: `${BASE_API}/api/auth/register/`,
    logout: `${BASE_API}/api/auth/logout/`,
}

class Auth {
    constructor() {}
    public async login(body: object) {
        const { data } = await request({
            url: AUTH_ENDPOINTS.login,
            method: 'POST',
            body
        })
        ActiveUser.set(data)
    }
}

export const AuthService = new Auth();
