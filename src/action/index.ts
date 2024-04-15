import axios from "axios";
import { Product } from "../types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
// export const getAllProducts = async () => {
//   return axios.get<Product[]>("").then((res) => res.data);
// };

// export const getAllCategories = async () => {
//   return axios.get<string[]>("/categories").then((res) => res.data);
// };

// export const getProductsByCategory = async (category: string) => {
//   return axios.get<Product[]>(`/category/${category}`).then((res) => res.data);
// };

// export const getProductById = async (id: number) => {
//   return axios.get<Product>(`${id}`).then((res) => res.data);
// };

export const {
  useGetAllProductsQuery,
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = storeApi;
