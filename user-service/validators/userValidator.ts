import { NextFunction, Response } from "express";
import { statusError } from "../utils/statusError";

export const createUserValidator = (req: any, _: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        
        next(new statusError(400, 'missing required fields'));
    }
    next();
};