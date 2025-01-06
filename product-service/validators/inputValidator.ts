import { NextFunction } from "express";
import { failureResponse } from "../utils/response";

export const addProductValidator = (req: any, res: any, next: NextFunction) => {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
        return res.status(400).json(failureResponse(false, "Invalid input"));
    }
    if (isNaN(price)) {
        return res.status(400).json(failureResponse(false, "Price must be a number"));
    }
    next();
};