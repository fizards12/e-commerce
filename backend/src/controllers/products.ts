import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import { ProductWithCategoryId } from '../interfaces/product';
import { ErrorGenerator } from '../services/error';
import { Errors } from '../enum/errors';
import { isObjectIdOrHexString } from 'mongoose';

interface RequestWithProduct extends Request {
    body: {
        product: ProductWithCategoryId;
    }
}

// Create a new product
export const createProduct = async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
        let newProduct = new Product(req.body.product);
        newProduct = await newProduct.save();
        const product = await Product.findById(newProduct.id).populate('category');
        res.status(201).send({ message: 'Product created successfully', product: product?.toJSON() });
    } catch (error) {
        let err = new ErrorGenerator(Errors.ERROR_CREATING, "Product", error);
        next(err);
    }
};

// Get product details by ID
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id || !isObjectIdOrHexString(req.params.id)) {

            throw new ErrorGenerator(Errors.INVALID_ID, "Product");
        }
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            throw new ErrorGenerator(Errors.NOT_FOUND, "Product");
        }
        res.status(200).send({ message: 'Product details', product: product.toJSON() });
    } catch (error) {
        if (error instanceof ErrorGenerator) {
            res.status(error.status).send({ error_type: error.type, message: error.message });
            return;
        }
        let err = new ErrorGenerator(Errors.ERROR_FETCHING_DETAILS, "Product", error);
        next(err);
    }
};

// Update product information by ID
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            throw new ErrorGenerator(Errors.NOT_FOUND, "Product");
        }
        res.status(200).send({ message: 'Product updated successfully', product: updatedProduct.toJSON() });
    } catch (error) {
        if (error instanceof ErrorGenerator) {
            res.status(error.status).send({ error_type: error.type, message: error.message });
            return;
        }
        let err = new ErrorGenerator(Errors.ERROR_UPDATING, "Product", error);
        next(err);
    }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            throw new ErrorGenerator(Errors.NOT_FOUND, "Product");
        }
        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        if (error instanceof ErrorGenerator) {
            res.status(error.status).send({ error_type: error.type, message: error.message });
            return;
        }
        let err = new ErrorGenerator(Errors.ERROR_DELETING, "Product", error);
        next(err);
    }
};

// Get multiple products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = (await Product.find().populate('category')).map((product) => product.toJSON());
        res.status(200).send({ message: 'List of products', products });
    } catch (error) {
        if (error instanceof ErrorGenerator) {
            res.status(error.status).send({ error_type: error.type, message: error.message });
            return;
        }
        let err = new ErrorGenerator(Errors.ERROR_FETCHING_DETAILS, "Product", error);
        next(err);
    }
};
