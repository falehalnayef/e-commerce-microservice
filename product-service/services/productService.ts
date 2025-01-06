import { IProduct, ProductModel } from "../database/models/productModel";

export const addProduct = async (product: IProduct) => {
    const newProduct = new ProductModel(product);
    await newProduct.save();
    return newProduct;
};

export const getProducts = async () => {
    const products = await ProductModel.find();
    return products;
};

export const getProductById = async (id: string) => {
    const product = await ProductModel.findById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

export const updateProduct = async (id: string, product: IProduct) => {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, { new: true });
    if (!updatedProduct) {
        throw new Error("Product not found");
    }
    return updatedProduct;
};