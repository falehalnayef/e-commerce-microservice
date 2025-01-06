import { NextFunction, Request, Response } from "express";
import { addProduct, getProductById, getProducts } from "../services/productService";
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

export const getProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProducts();
        res.status(200).json(successResponse(true, "Products fetched successfully", products));
    } catch (error) {
        next(error);
    }
};

export const getProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await getProductById(req.params.id);
        res.status(200).json(successResponse(true, "Product fetched successfully", product));
    } catch (error) {
        next(error);
    }
};