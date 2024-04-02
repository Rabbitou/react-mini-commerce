import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { getProductById, getProductsByCategory } from "../action";
import ProductCard from "../components/productCard/ProductCard";
import Rating from "../components/productCard/Rating";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import SwiperBox from "../components/ui/SwiperBox";
import { useCart } from "../hooks/useCart";
import { Product } from "../types/product";

export default function ProductPage() {
  const { addToCart } = useCart();

  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [productRelated, setProductRelated] = useState<Product[]>([]);

  const price = product ? (product.price + "").split(".") : "";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await getProductById(parseInt(id || "1"));
        setProduct(res);
      } catch (error) {
        // setError("Something went wrong !");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const fetchProductRelated = async () => {
        try {
          setIsLoading(true);
          const res = await getProductsByCategory(product.category);
          setProductRelated(res);
        } catch (error) {
          // setError("Something went wrong !");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProductRelated();
    }
  }, [product]);

  return (
    <>
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center my-32">
          <Loader />
        </div>
      ) : null}
      {product ? (
        <section className="flex justify-center items-center h-[calc(100% - 40px)] w-[calc(100% - 40px)] bg-gray-200 rounded m-10 transition-all">
          <article className="flex">
            <div className="p-5">
              <img
                src={product.image}
                alt={product.title}
                className="h-[300px] w-[300px] object-cover rounded-lg overflow-hidden"
              />
            </div>
            <div className="flex flex-col justify-between items-center">
              <div className="flex flex-col text-black p-5 gap-2 md:gap-3 transition-all">
                <p className="text-red-700 text-xs md:text-sm font-medium mr-2 transition-all">
                  USD{" "}
                  <span className="text-3xl md:text-4xl font-bold transition-all">
                    {price[0]}
                  </span>
                  <span className="text-base">
                    {price[1] ? "." + price[1] : ".00"}
                  </span>
                </p>
                <Rating rating={product.rating.rate} style="scale-110" />
                <p className="font-bold text-xl md:text-2xl transition-all">
                  {product.title}
                </p>
                <p className="opacity-80 max-md:text-sm">
                  {product.description}
                </p>
              </div>
              <Button
                style="bg-sky-400 py-2 text-white mb-5 max-w-[400px] min-w-[150px] rounded"
                onClick={() => addToCart(product.id)}
              >
                <p className="capitalize">add to cart</p>
              </Button>
            </div>
          </article>
        </section>
      ) : null}
      <div className="text-black">
        <h2 className="text-center font-bold text-4xl">Related Products</h2>
        {productRelated ? (
          <SwiperBox>
            {productRelated.map((item) => (
              <SwiperSlide key={item.id} className="!w-[250px]">
                <ProductCard data={item} />
              </SwiperSlide>
            ))}
          </SwiperBox>
        ) : null}
      </div>
    </>
  );
}
