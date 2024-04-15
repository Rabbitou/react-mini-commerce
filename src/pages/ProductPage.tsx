import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import {
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} from "../action";
import ProductCard from "../components/productCard/ProductCard";
import Rating from "../components/productCard/Rating";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import SwiperBox from "../components/ui/SwiperBox";
import { useAppDispatch } from "../store";
import { addToCart } from "../store/cart";

export default function ProductPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { data: product, isLoading } = useGetProductByIdQuery(
    parseInt(id || "0")
  );

  const { data: productRelated, isLoading: isLoadingRelated } =
    useGetProductsByCategoryQuery(product?.category || "");

  const relatedProductsFiltered = useMemo(() => {
    return productRelated
      ? productRelated.filter((item) => item.id !== parseInt(id || "0"))
      : [];
  }, [productRelated, id]);

  const price = product ? (product.price + "").split(".") : "";

  return (
    <>
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center my-32">
          <Loader />
        </div>
      ) : product ? (
        <section className="flex justify-center items-center h-[calc(100% - 40px)] w-[calc(100% - 40px)] border rounded m-10 transition-all">
          <article className="flex flex-col md:grid grid-cols-2 place-items-center">
            <div className="p-5">
              <img
                src={product.image}
                alt={product.title}
                className="h-[300px] md:h-[400px] object-cover rounded-lg overflow-hidden"
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
                onClick={() => dispatch(addToCart(product.id))}
              >
                <p className="capitalize">add to cart</p>
              </Button>
            </div>
          </article>
        </section>
      ) : null}
      <div className="text-black">
        <h2 className="text-center font-bold text-4xl">Related Products</h2>
        {!isLoadingRelated ? (
          <SwiperBox>
            {relatedProductsFiltered.map((item) => (
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
