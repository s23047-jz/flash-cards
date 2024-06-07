import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { request } from "../utils/request";

export const AUTH_ENDPOINTS = {
  login: `${BASE_API}/api/auth/login/`,
  register: `${BASE_API}/api/auth/register/`,
  logout: `${BASE_API}/api/auth/logout/`,
};

class Auth {
  constructor() {}
  public async login(body: object, navigation: NavigationProp<any>) {
    return await request({
      url: AUTH_ENDPOINTS.login,
      method: "POST",
      body,
      navigation,
    });
  }

  public async register(body: object, navigation: NavigationProp<any>) {
    return await request({
      url: AUTH_ENDPOINTS.register,
      method: "POST",
      body,
      navigation,
    });
  }

  public async logout(navigation: NavigationProp<any>) {
    return await request({
      url: AUTH_ENDPOINTS.logout,
      method: "POST",
      navigation,
    });
  }
}

export const AuthService = new Auth();

export interface UserInterface {
  id?: string;
  email?: string;
  username?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  rank?: number;
  created_decks?: number;
  public_decks?: number,
  avatar?: string;
  active?: boolean;
  role?: string;
  is_superuser?: boolean;
}
