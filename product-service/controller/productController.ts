import { NextFunction, Request, Response } from "express";
import { addProduct } from "../services/productService";
import { successResponse } from "../utils/response";

export const addProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = req.body;
        const newProduct = await addProduct(product);
        res.status(201).json(successResponse(true, "Product added successfully", newProduct));
    } catch (error) {
        next(error);
    }
};