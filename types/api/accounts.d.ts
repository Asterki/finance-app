import { User } from '../models';

interface RegisterRequestBody {
  email: string;
  username: string;
  password: string;
  pubKey: string;
}
interface RegisterResponseData {
  status: 'success' | 'invalid-parameters' | 'user-exists' | 'internal-error';
  keyPair?: {
    publicKey: string;
    privateKey: string;
  };
}

interface LoginRequestBody {
  emailOrUsername: string;
  password: string;
  tfaCode?: string;
}
interface LoginResponseData {
  status:
    | 'success'
    | 'invalid-parameters'
    | 'invalid-credentials'
    | 'requires-tfa'
    | 'invalid-tfa-code'
    | 'internal-error';
}

interface FetchResponseData {
  status: 'success' | 'unauthenticated';
  user?: User;
}

interface LogoutResponseData {
  status: 'success' | 'unauthenticated';
}

export type {
  RegisterRequestBody,
  RegisterResponseData,
  LoginRequestBody,
  LoginResponseData,
  FetchResponseData,
  LogoutResponseData,
};
