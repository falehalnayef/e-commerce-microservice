

import { NextFunction, Request, Response } from 'express';
import { failureResponse } from '../utils/response';

export const errorMiddleware = (err: any, _: Request, res: Response, _2: NextFunction) => {
    res.status(err.status || 500).json(failureResponse(false, err.message || 'Internal server error'));
};
