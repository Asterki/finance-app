interface PictureRequestBody {
  action: 'upload' | 'remove';
}
interface PictureResponseData {
  status: 'success' | 'bad-request' | 'internal-error';
  message?: string;
}

interface UpdateRequestBody {
  bio: string;
  website: string;
}
interface UpdateResponseData {
  status: 'success' | 'internal-error';
}

export type { PictureRequestBody, PictureResponseData, UpdateRequestBody, UpdateResponseData };
