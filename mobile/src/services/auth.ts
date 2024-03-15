import {BASE_API} from "./config";
import {request} from "../utils/request";

export const AUTH_ENDPOINTS = {
    login: `${BASE_API}/auth/login/`,
    register: `${BASE_API}/auth/register/`,
    logout: `${BASE_API}/auth/logout/`,
}

export class AuthService {

    constructor() {}
    public async login(body: Object) {
        const data = await request({
            url: AUTH_ENDPOINTS.login,
            body: body
        })
        console.log(data)
    }
}
