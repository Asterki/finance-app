// FILE: controllers/accounts/fetch.ts

import { NextFunction, Request, Response } from 'express';
import { FetchResponseData as ResponseData } from '../../../../shared/api/accounts';
import CustomError from '../../utils/customError';

const accountsFetch = (req: Request, res: Response<ResponseData>, next: NextFunction) => {
  try {
    const user = req.user
    if (!user) {
      throw new CustomError(401, 'unauthenticated');
    }

    res.status(200).send({
      status: 'success',
      user: user as any,
    });
  } catch (error) {
    next(error);
  }
};

export default accountsFetch;