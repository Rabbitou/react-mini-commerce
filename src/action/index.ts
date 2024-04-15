import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../types/product";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "",
    }),
    getAllCategories: builder.query<string[], void>({
      query: () => "/categories",
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `/category/${category}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `${id}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = storeApi;
