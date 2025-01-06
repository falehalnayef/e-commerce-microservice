import { IProduct, ProductModel } from "../database/models/productModel";

export const addProduct = async (product: IProduct) => {
    const newProduct = new ProductModel(product);
    await newProduct.save();
    return newProduct;
};
