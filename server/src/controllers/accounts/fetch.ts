import { NextFunction, Request, Response } from 'express';
import { FetchResponseData as ResponseData } from '../../../../shared/types/api/accounts';

const handler = async (req: Request, res: Response<ResponseData>, next: NextFunction) => {
  const user = req.user;
  if (!user)
    return res.status(200).send({
      status: 'unauthenticated',
    });

  return res.status(200).send({
    status: 'success',
    user: user as any,
  });
};

export default handler;
