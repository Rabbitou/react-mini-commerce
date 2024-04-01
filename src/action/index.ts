import axios from "axios";
import { Product } from "../types/product";

export const getAllProducts = async () => {
  return axios.get<Product[]>("").then((res) => res.data);
};
