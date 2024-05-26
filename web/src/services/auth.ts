import { BASE_API } from './config';
// @ts-ignore
import { request } from '../utils/request';
import { ActiveUser } from './user';

export const AUTH_ENDPOINTS = {
  login: `${BASE_API}/api/auth/login/`,
  register: `${BASE_API}/api/auth/register/`,
  logout: `${BASE_API}/api/auth/logout/`,
  updateNickname: `${BASE_API}/api/auth/update-nickname/`,
  updateEmail: `${BASE_API}/api/auth/update-email/`,
  updatePassword: `${BASE_API}/api/auth/update-password/`,
  updateAvatar: `${BASE_API}/api/auth/update-avatar/`,
  updateMe: `${BASE_API}/api/users/me/`,
  deleteAccount: `${BASE_API}/api/users/me/`,
  getUserStats: `${BASE_API}/api/auth/user-stats/`
};

class Auth {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}

  public async login(body: object) {
    // @ts-ignore
    const { data } = await request({
      url: AUTH_ENDPOINTS.login,
      method: 'POST',
      body
    });
    ActiveUser.set(data);
  }

  public async register(body: object) {
    return await request({
      url: AUTH_ENDPOINTS.register,
      method: 'POST',
      body
    });
  }

  public async updateAccount(body: Object) {
    const token = ActiveUser.getAuthorization();

    return await request({
      url: AUTH_ENDPOINTS.updateMe,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body
    });
  }

  public async deleteAccount(body: Object) {
    const token = ActiveUser.getAuthorization();

    return await request({
      url: AUTH_ENDPOINTS.deleteAccount,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body
    });
  }

  public async logout(token: string) {
    try {
      await request({
        url: AUTH_ENDPOINTS.logout,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      ActiveUser.clean();
    } catch (error) {
      console.error('Error during log out :', error);
    }
  }

  public async getUserStats() {
    const token = ActiveUser.getAuthorization();

    return await request({
      url: AUTH_ENDPOINTS.getUserStats,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  public async getCurrentUser() {
    const token = ActiveUser.getAuthorization();

    const response = await request({
      url: AUTH_ENDPOINTS.updateMe, // Assuming this endpoint returns current user data
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // @ts-ignore
    return response.data;
  }

  async updateAvatar(avatarName: string) {

  }
}

export const AuthService = new Auth();
