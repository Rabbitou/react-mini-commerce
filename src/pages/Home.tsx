import React, { useContext, useEffect, useState } from "react";
import { Product } from "../types/product";
import { getAllProducts } from "../action";
import ProductCard from "../components/productCard/ProductCard";
import { CartContext } from "../context/cart";

export default function Home() {
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);
        const res = await getAllProducts();
        setData(res);
      } catch (error) {
        setError("Something went wrong !");
      } finally {
        setIsLoading(false);
      }
    };
    fetchApi();
  }, []);

  return (
    <section className="flex h-full mx-auto max-w-4xl justify-center mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 m-4">
        {data
          ? data.map((item) => (
              <ProductCard key={item.id} data={item} style="max-w-[350px]" />
            ))
          : null}
      </div>
    </section>
  );
}
