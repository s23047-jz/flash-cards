import { BASE_API } from './config';
// @ts-ignore
import { request } from '../utils/request';
import { ActiveUser } from './user';

export const AUTH_ENDPOINTS = {
  login: `${BASE_API}/api/auth/login/`,
  register: `${BASE_API}/api/auth/register/`,
  logout: `${BASE_API}/api/auth/logout/`,
};

class Auth {
  constructor() {}

  public async login(body: object) {
    // @ts-ignore
    const { data } = await request({
      url: AUTH_ENDPOINTS.login,
      method: 'POST', body
    });
    ActiveUser.set(data);
  }

    public async register(body: object) {
    // @ts-ignore
    return await request({
      url: AUTH_ENDPOINTS.register,
      method: 'POST',
      body
    });
  }
}



export const AuthService = new Auth();
