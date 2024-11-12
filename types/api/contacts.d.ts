import { User } from '../models';

interface AddRemoveBlockUnblockRequestBody {
  contactID: string;
}

interface AddResponseData {
  status:
    | 'success'
    | 'user-not-found'
    | 'contact-not-found'
    | 'user-blocked'
    | 'internal-error'
    | 'request-pending'
    | 'request-sent'
    | 'already-contact'
    | 'contact-blocked'
    | 'contact-request-sent'
    | 'self-add';
}

interface BlockResponseData {
  status: 'success' | 'internal-error' | 'user-not-found' | 'self-remove' | 'not-contact' | 'self-block';
}

interface GetResponseData {
  status: 'unauthenticated' | 'success' | 'internal-error';
  contacts?: {
    accepted: {
      userID: string;
      profile: {
        username: string;
        avatar: string;
        imageID: string;
        website: string;
        bio: string;
      };
    }[];
    pending: {
      userID: string;
      profile: {
        username: string;
        avatar: string;
        imageID: string;
        website: string;
        bio: string;
      };
    }[];
    blocked: {
      userID: string;
      profile: {
        username: string;
        avatar: string;
        imageID: string;
        website: string;
        bio: string;
      };
    }[];
    requests: {
      userID: string;
      profile: {
        username: string;
        avatar: string;
        imageID: string;
        website: string;
        bio: string;
      };
    }[];
  };
}

interface RequestsRequestBody {
  contactID: string;
  action: 'accept' | 'reject' | 'cancel';
}

interface RequestsResponseData {
  status: string; // TODO: Add the possible values
}

interface RemoveResponseData {
  status: 'user-not-found' | 'contact-not-found' | 'not-contact' | 'success' | 'internal-error' | 'self-remove';
}

interface UnblockResponseData {
  status: 'success' | 'internal-error' | 'user-not-found' | 'self-remove' | 'not-contact' | 'self-unblock';
}

interface FetchContactRequestBody {
  username: string;
}

interface FetchContactResponse {
  status: 'success' | 'user-not-found' | 'internal-error' | 'blocked';
  contact?: {
    userID: string;
    profile: User.Profile;
  };
}

interface GetPubKeyRequestData {
  contactID: string;
}
interface GetPubKeyResponseData {
  status: 'success' | 'server-error' | 'unauthenticated' | 'contact-not-found'
  key?: string;
}

export type {
  AddResponseData,
  BlockResponseData,
  GetResponseData,
  RequestsRequestBody,
  RequestsResponseData,
  RemoveResponseData,
  AddRemoveBlockUnblockRequestBody,
  UnblockResponseData,
  FetchContactRequestBody,
  FetchContactResponse,
  GetPubKeyRequestData,
  GetPubKeyResponseData,
};
