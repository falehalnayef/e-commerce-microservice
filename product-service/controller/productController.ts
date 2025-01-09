import { NextFunction, Request, Response } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../services/productService";
import { successResponse } from "../utils/response";
import {deleteData, getData, setData} from "../redis/redisClient";
export const addProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productData = req.body;
        const photoPath = req.file?.path;
        const product = await addProduct({ ...productData, photo: photoPath });
         await addProduct(product);
          deleteData("products");
         res.status(201).json(successResponse(true, "Product added successfully", null));
    } catch (error) {
        next(error);
    }   
};

export const getProductsController = async (_req: any, res: any, next: NextFunction) => {
    try {
        const cachedProducts = await getData("products");
        if (cachedProducts) {
            return res.status(200).json(successResponse(true, "Products fetched successfully", cachedProducts));
        }

        const products = await getProducts();

        setData("products", JSON.stringify(products), 60);
        res.status(200).json(successResponse(true, "Products fetched successfully", products));
    } catch (error) {
        next(error);
    }
};

export const getProductByIdController = async (req: any, res: any, next: NextFunction) => {
    try {
        const cachedProduct = await getData(`product:${req.params.id}`);
        if (cachedProduct) {
            return res.status(200).json(successResponse(true, "Product fetched successfully", cachedProduct));
        }

        const product = await getProductById(req.params.id);
        setData(`product:${req.params.id}`, JSON.stringify(product), 60);
        res.status(200).json(successResponse(true, "Product fetched successfully", product));
    } catch (error) {
        next(error);
    }
};

export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productData = req.body;
        const photoPath = req.file?.path;
        const product = await updateProduct(req.params.id, { ...productData, photo: photoPath });
        deleteData("products");
        deleteData(`product:${req.params.id}`);

        res.status(200).json(successResponse(true, "Product updated successfully", product));
    } catch (error) {
        next(error);
    }
};  

export const deleteProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
         await deleteProduct(req.params.id);
         deleteData("products");
         deleteData(`product:${req.params.id}`);
         res.status(200).json(successResponse(true, "Product deleted successfully", null));
    } catch (error) {
        next(error);
    }
};