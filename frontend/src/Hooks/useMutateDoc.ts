import { FormikHelpers } from "formik";
import { ICategory } from "../schemas/category"
import { IProduct } from "../schemas/product"
import { createCategoryThunk, updateCategoryThunk } from "../stores/categories/categoriesThunk"
import { createProductThunk, updateProductThunk } from "../stores/products/productsThunk"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../stores";
import { showToastThunk } from "../stores/app/app";
import { AsyncThunkAction } from "@reduxjs/toolkit";

type MutateTypes = 'create' | 'update';
const alerts = {
    'category': {
        'create': 'Category created successfully',
        'update': 'Category updated successfully',
        'delete': 'Category deleted successfully',
    },
    'product': {
        'create': 'Product created successfully',
        'update': 'Product updated successfully',
        'delete': 'Product deleted successfully',
    }
}
interface MutateFunc<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (values: T): AsyncThunkAction<{[key: string]: T}, T,any>;
}

const mutateFuncs: { [docType in DocType]: { [action in MutateTypes]: MutateFunc<Doc[docType]> } } = {
    'category': {
        'create': createCategoryThunk,
        'update': updateCategoryThunk
    },
    'product': {
        'create': createProductThunk,
        'update': updateProductThunk
    }
}

type Doc = {
    'category': ICategory,
    'product': IProduct
}
type DocType = 'category' | 'product';


export const useMutateDoc = <T extends Doc[K], K extends DocType>(docType: K, id?: string): {
    mutate: (values: T, params: FormikHelpers<T>) => Promise<void>;
} => {
    const dispatch = useDispatch<AppDispatch>();
    const mutate = async (
        values: T,
        { setSubmitting }: FormikHelpers<T>
    ) => {
        setSubmitting(true);
        try {
            await dispatch(mutateFuncs[docType][id ? 'update' : 'create']({...values, id})).unwrap();
            dispatch(showToastThunk({ type: "success", message: alerts[docType][id ? 'update' : 'create'], duration: 2000 }));
        } finally {
            setSubmitting(false);
        }
    };
    return { mutate };
}