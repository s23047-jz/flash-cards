import { BASE_API } from './config';
// @ts-ignore
import { request } from '../utils/request';
import { ActiveUser } from './user';

export const AUTH_ENDPOINTS = {
  login: `${BASE_API}/api/auth/login/`,
  register: `${BASE_API}/api/auth/register/`,
  logout: `${BASE_API}/api/auth/logout/`,
  updateNickname: `${BASE_API}/api/auth/update-nickname/`, // Added endpoint for updating nickname
  updateEmail: `${BASE_API}/api/auth/update-email/`, // Added endpoint for updating email
  updatePassword: `${BASE_API}/api/auth/update-password/`, // Added endpoint for updating password
  updateAvatar: `${BASE_API}/api/auth/update-avatar/` // Added endpoint for updating avatars
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

  public async updateNickname(nickname: string) {
    const token = ActiveUser.getAuthorization();

    return await request({
      url: AUTH_ENDPOINTS.updateNickname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // @ts-ignore
      body: JSON.stringify({ nickname })
    });
  }

  public async updateEmail(email: string) {
    const token = ActiveUser.getAuthorization();

    return await request({
      url: AUTH_ENDPOINTS.updateEmail,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // @ts-ignore
      body: JSON.stringify({ email })
    });
  }

  public async updatePassword(passwordDetails: { currentPassword: string, newPassword: string }) {
    const token = ActiveUser.getAuthorization();
    return await request({
      url: AUTH_ENDPOINTS.updatePassword,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // @ts-ignore
      body: JSON.stringify(passwordDetails)
    });
  }

  public async updateAvatar(avatarUrl: string) {
    const token = ActiveUser.getAuthorization();

    return await request({
      url: AUTH_ENDPOINTS.updateAvatar,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // @ts-ignore
      body: JSON.stringify({ avatar: avatarUrl })
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
}

export const AuthService = new Auth();
