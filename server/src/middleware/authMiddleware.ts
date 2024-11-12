import { Request, Response, NextFunction } from 'express';

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isUnauthenticated() || !req.user) {
    res.status(200).send({ status: 'unauthenticated' });
  }
  return next();
};

export { ensureAuthenticated };
