import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import { ProductWithCategoryId } from '../interfaces/product';
import { ErrorGenerator } from '../services/error';
import { Errors } from '../enum/errors';
import { isObjectIdOrHexString } from 'mongoose';
import { uploadImage } from '../services/cloudinary';
import { IUser } from '../interfaces/user';
import { Types } from 'mongoose';

interface RequestWithProduct extends Request {
    user?: IUser,
    body: {
        product: string;
    },
    file?: Express.Multer.File
}

// Create a new product
export const createProduct = async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
        let productData = JSON.parse(req.body.product) as ProductWithCategoryId;
        if (req.file) {
            const uploadResult = await uploadImage({ folder: 'products', public_id: `product_${productData.name}` }, req.file);
            productData.img = uploadResult.secure_url;
        }
        let userId = req.user?._id;
        let newProduct = new Product({ ...productData, user: userId });
        newProduct = await newProduct.save();
        res.status(201).send({ message: 'Product created successfully', product: newProduct?.toJSON() });
    } catch (error) {
        if ((error as any).code === 11000) {
            let err = new ErrorGenerator(Errors.DUPLICATE_KEYS, "Product", error);
            res.status(err.status).send({ error_type: err.type, message: err.message });
            return;
        }
        if (error instanceof ErrorGenerator) {
            res.status(error.status).send({ error_type: error.type, message: error.message, error: error.error });
            return;
        }
        let err = new ErrorGenerator(Errors.ERROR_CREATING, "Product", error);
        next(err);
    }
};

// Get product details by ID
export const getProduct = async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id || !isObjectIdOrHexString(req.params.id)) {
            throw new ErrorGenerator(Errors.INVALID_ID, "Product");
        }
        let query: {_id?: string, user?: Types.ObjectId | string} = {_id: req.params.id};
        if(req.user?._id){
            query.user = req.user._id
        }
        const product = await Product.findOne(query);
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
export const updateProduct = async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
        let productData = JSON.parse(req.body.product) as ProductWithCategoryId;
        if (req.file) {
            const uploadResult = await uploadImage({ folder: 'products', public_id: `product_${productData.name}` }, req.file);
            productData.img = uploadResult.secure_url;
        }
        const updatedProduct = await Product.findOneAndUpdate({ _id: req.params.id, user: req.user?._id }, productData, { new: true });
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
export const deleteProduct = async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id, user: req.user?._id });
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
export const getProducts = async (req: Request & { user?: IUser }, res: Response, next: NextFunction) => {
    try {
        let query: {user?: Types.ObjectId | string} = {};
        if(req.user?._id){
            query.user = req.user._id
        }
        const products = (await Product.find(query)).map((product) => product.toJSON());
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
