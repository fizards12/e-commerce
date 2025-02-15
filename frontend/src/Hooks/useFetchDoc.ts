/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../stores"
import { fetchProduct, fetchProducts } from "../stores/products/productsThunk";
import { fetchCategories, fetchCategory } from "../stores/categories/categoriesThunk";
import { useCallback, useLayoutEffect, useState } from "react";
import { ICategory } from "../schemas/category";
import { IProduct } from "../schemas/product";
import { GeneralError } from "../services/error";
type DocPath = 'categories' | 'products';

const storePath: { [key: string]: DocPath } = {
    'category': 'categories',
    'product': 'products'
}
const docListFuncs = {
    'category': fetchCategories,
    'product': fetchProducts
}
const docFuncs = {
    'category': fetchCategory,
    'product': fetchProduct,
}

type Doc = {
    'category': ICategory,
    'product': IProduct
}

type StoreTypes = {
    'category': { [id: string]: ICategory},
    'product': { [id: string] : IProduct}
}

type CollectionTypes = {
    'category': ICategory[],
    'product': IProduct[]
}

type DocType = 'category' | 'product';

export const useFetchDoc = <T extends Doc[K], K extends DocType>(docType: K, id: string | undefined): [T | undefined, GeneralError | undefined] => {
    const data = useSelector((state: RootState) => state[storePath[docType]].data as StoreTypes[K]);
    const dispatch = useDispatch<AppDispatch>();
    const [error, setError] = useState<GeneralError | undefined>(undefined);
    const [doc, setDoc] = useState<T | undefined>(data[id || ""] as T | undefined);
    useLayoutEffect(() => {
        async function findDoc(id: string) {
            try {
                const action = docFuncs[docType](id);
                const result = await dispatch(action as any).unwrap();
                setDoc(result);
            } catch (error) {
                setError(error as GeneralError);
            }
        }
        if (!doc && id) {
            findDoc(id);
        }
    }, [])
    return [doc, error];
}

export const useFetchDocList = <T extends CollectionTypes[K], K extends DocType>(docType: K): [T | undefined, GeneralError | undefined] => {
    const data = useSelector((state: RootState) => state[storePath[docType]].data as T);
    const dispatch = useDispatch<AppDispatch>();
    const [list, setList] = useState<T | undefined>(data);
    const [error, setError] = useState<GeneralError | undefined>(undefined);
    const getList = useCallback(async function () {
        const action = docListFuncs[docType]();
        try {
            const result = await dispatch(action as any).unwrap();
            setList(result);
        } catch (error) {
            setError(error as GeneralError);
        }
    }, []);
    useLayoutEffect(() => {
        if (!list?.length) {
            getList();
        }
    }, [])
    return [list, error];
}