import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validateRequestBody = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  const parsedBody = schema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(200).send({
      status: 'invalid-parameters',
      errors: parsedBody.error.errors,
    });
  }
  next();
};

export { validateRequestBody };
