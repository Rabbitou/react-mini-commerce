import axios from "axios";
import { Product } from "../types/product";

export const getAllProducts = async () => {
  return axios.get<Product[]>("").then((res) => res.data);
};

export const getAllCategories = async () => {
  return axios.get<string[]>("/categories").then((res) => res.data);
}

export const getProductsByCategory = async (category: string) => {
  return axios.get<Product[]>(`/category/${category}`).then((res) => res.data);
}
