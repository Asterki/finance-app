/**
 * authApi Service
 *
 * This module provides functions to interact with the authentication API, including:
 * - Fetching the current authenticated user
 * - Logging in a user
 * - Logging out the current user
 * - Registering a new user
 *
 * Functions:
 * - fetchUser: Fetches the current authenticated user from the server.
 * - login: Logs in a user with email/username, password, and optional TFA code.
 * - logout: Logs out the current user.
 * - register: Registers a new user with username, email, and password.
 *
 * Usage:
 * import authApi from './authApi';
 *
 * const user = await authApi.fetchUser();
 * const loginStatus = await authApi.login(emailOrUsername, password, tfaCode);
 * const logoutStatus = await authApi.logout();
 * const registerStatus = await authApi.register(username, email, password);
 */

import axios from 'axios';

import type {
  LoginRequestBody,
  LoginResponseData,
  LogoutResponseData,
  FetchResponseData,
  RegisterRequestBody,
  RegisterResponseData,
} from '../../../../../shared/types/api/accounts';

const apiEndpoint = `${import.meta.env.VITE_SERVER_HOST}/api/accounts`;

const fetchUser = async () => {
  try {
    const res = await axios.get<FetchResponseData>(`${apiEndpoint}/fetch`, {
      withCredentials: true,
    });
    return res.data.user;
  } catch (error) {
    return null;
  }
};

const logout = async () => {
  try {
    await axios.get<LogoutResponseData>(`${apiEndpoint}/logout`, {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const login = async (emailOrUsername: string, password: string, tfaCode: string = '') => {
  try {
    const res = await axios.post<LoginResponseData>(
      `${apiEndpoint}/login`,
      {
        emailOrUsername,
        password,
        tfaCode,
      } as LoginRequestBody,
      {
        withCredentials: true,
      },
    );
    return res.data.status;
  } catch (error) {
    return null;
  }
};

const register = async (username: string, email: string, password: string, pubKey: string) => {
  try {
    const res = await axios.post<RegisterResponseData>(
      `${apiEndpoint}/register`,
      {
        username,
        email,
        password,
        pubKey,
      } as RegisterRequestBody,
      {
        withCredentials: true,
      },
    );
    return res.data.status;
  } catch (error) {
    return null;
  }
};

export default { fetchUser, logout, login, register };
