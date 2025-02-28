import { Request, Response, NextFunction } from 'express';
import { Category } from '../models/category';
import { ErrorGenerator } from '../services/error';
import { Errors } from '../enum/errors';
import { ICategory } from '../interfaces/category';
import { MongooseError } from 'mongoose';

interface RequestWithCategory extends Request {
    body:{
        category: ICategory;
    }
}

// Create a new category
export const createCategory = async (req: RequestWithCategory, res: Response, next: NextFunction) => {
    try {
        const category = new Category(req.body.category);
        await category.save();
        res.status(201).send({ message: 'Category created successfully', category });
    } catch (error) {
        let err = new ErrorGenerator(Errors.ERROR_CREATING, "Category", error);
        if((error as any).code === 11000){
             err = new ErrorGenerator(Errors.DUPLICATE_KEYS, "Category",error);
             res.status(err.status).send({ error_type: err.type, message: err.message });
             return;
        }
        next(err);
    }
};

// Get category details by ID
export const getCategory = async (req: Request & { params: { id: string; }}, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            throw new ErrorGenerator(Errors.NOT_FOUND, "Category");
        }
        res.status(200).send({ message: 'Category details', category });
    } catch (error) {
        if(error instanceof ErrorGenerator){
            res.status(error.status).send({ error_type: error.type, message: error.message });
            return
        }
        let err = new ErrorGenerator(Errors.ERROR_FETCHING_DETAILS, "Category", error);
        next(err);
    }
};

// Update category information by ID
export const updateCategory = async (req: RequestWithCategory & { params: { id: string; } }, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body.category, { new: true });
        if (!category) {
            throw new ErrorGenerator(Errors.NOT_FOUND, "Category");
        }
        res.status(200).send({ message: 'Category updated successfully', category });
    } catch (error : any) {
        
        if(error instanceof ErrorGenerator){
            res.status(error.status).send({ error_type: error.type, message: error.message });
            return
        }
        let err : ErrorGenerator;
        if(error.code == 11000){
            err = new ErrorGenerator(Errors.DUPLICATE_KEYS, "Category", error);
            res.status(err.status).send({ error_type: err.type, message: err.message });
            return
        }
        err = new ErrorGenerator(Errors.ERROR_UPDATING, "Category", error);
        next(err);
    }
};

// Delete a category by ID
export const deleteCategory = async (req: Request & { params: { id: string; } }, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            throw new ErrorGenerator(Errors.NOT_FOUND, "Category");
        }
        res.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
        if(error instanceof ErrorGenerator){
            res.status(error.status).send({ error_type: error.type, message: error.message });
            return
        }
        let err = new ErrorGenerator(Errors.ERROR_DELETING, "Category", error);
        next(err);
    }
};

// Get multiple categories
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find();
        res.status(200).send({ message: 'List of categories', categories });
    } catch (error) {
        if(error instanceof ErrorGenerator){
            res.status(error.status).send({ error_type: error.type, message: error.message });
            return
        }
        let err = new ErrorGenerator(Errors.ERROR_FETCHING_DETAILS, "Category", error);
        next(err);
    }
};
