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
        return await request({
            url: AUTH_ENDPOINTS.login,
            method: 'POST',
            body
        })
    }

    public async register(body: object) {
        return await request({
            url: AUTH_ENDPOINTS.register,
            method: 'POST',
            body
        })
    }
}

export const AuthService = new Auth();
