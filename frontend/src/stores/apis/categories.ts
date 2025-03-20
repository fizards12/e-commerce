import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseQuery";
import { getCategories } from "../../services/products";
import { ICategory } from "../../schemas/category";


export const cartegoryApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: customBaseQuery<{ categories: ICategory[] }>(),
    tagTypes: ['Category'],
    endpoints: (build) => ({
        fetchCategories: build.query({
            query: () => ({ fetcher: getCategories, loading: false }),
        })
    }),
})



export const { useFetchCategoriesQuery } = cartegoryApi