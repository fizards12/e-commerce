import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseQuery";
import { getList } from "../../services/products";
import { IProduct } from "../../schemas/product";


export const productApiSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: customBaseQuery<{ products: IProduct[] }>(),
    tagTypes: ['Product'],
    endpoints: (build) => ({
        fetchProducts: build.query({
            query: () => ({ fetcher: getList, loading: false }),
        })
    }),
})



export const { useFetchProductsQuery } = productApiSlice