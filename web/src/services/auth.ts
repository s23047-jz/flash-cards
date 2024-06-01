import { BASE_API } from './config';
import { request } from '../utils/request';
import { ActiveUser } from './user';

export const AUTH_ENDPOINTS = {
  login: `${BASE_API}/api/auth/login/`,
  register: `${BASE_API}/api/auth/register/`,
  logout: `${BASE_API}/api/auth/logout/`,
  updateNickname: `${BASE_API}/api/auth/update-nickname/`,
  updateEmail: `${BASE_API}/api/auth/update-email/`,
  updatePassword: `${BASE_API}/api/auth/update-password/`,
  updateAvatar: (userId: string) => `${BASE_API}/api/users/update-avatar/${userId}/`,
  updateMe: `${BASE_API}/api/users/me/`,
  deleteAccount: `${BASE_API}/api/users/me/`,
  getUserStats: `${BASE_API}/api/auth/user-stats/`
};

class Auth {
  constructor() {}

  public async login(body: object) {
    // @ts-ignore
    const {data} = await request({
      url: AUTH_ENDPOINTS.login,
      method: 'POST',
      body
    });
    ActiveUser.set(data);
  }

  public async register(body: object) {
    // @ts-ignore
    return await request({
      url: AUTH_ENDPOINTS.register,
      method: 'POST',
      body
      // @ts-ignore
    }).then(response => response.data)
      .catch(error => {
        throw error;
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

  public async getCurrentUser() {
    const token = ActiveUser.getAuthorization();

    const response = await request({
      url: AUTH_ENDPOINTS.updateMe,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // @ts-ignore
    return response.data;
  }

  public async updateAvatar(userId: string, body: Object) {
    const token = ActiveUser.getAuthorization();

    return await request({
      url: AUTH_ENDPOINTS.updateAvatar(userId),
      method: 'PUT', // Powinno być PUT, a nie POST
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body
    });
  }
}

export const AuthService = new Auth();
