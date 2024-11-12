interface GenerateKeysResponseData {
  status: 'success' | 'server-error' | 'unauthenticated';
  data?: {
    privateKey: string;
    publicKey: string;
  };
}



export type { GenerateKeysResponseData };
