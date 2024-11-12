interface FetchRequestBody {
  username: string;
}
interface FetchResponseData {
  status: 'invalid-parameters' | 'cannot-check-self' | 'not-found' | 'internal-error' | 'success';
  data?: {
    username: string;
    avatar: string;
    bio: string;
    website: string;
  };
}

export type { FetchRequestBody, FetchResponseData };