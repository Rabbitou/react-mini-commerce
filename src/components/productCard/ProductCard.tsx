import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../types/product";
import Button from "../ui/Button";
import Rating from "./Rating";

export default function ProductCard({
  data,
  style,
}: {
  data: Product;
  style?: string;
}) {
  const { addToCart } = useCart();

  const price = (data.price + "").split(".");

  return (
    <article
      className={`flex flex-col shadow-md bg-white text-black h-[24rem] rounded-lg overflow-hidden transition-all hover:scale-105 ${style}`}
    >
      <div className="relative">
        <img
          src={data.image}
          alt={data.title}
          className="object-cover w-full h-48"
        />
        <Rating rating={data.rating.rate} style="absolute top-3 right-3" />
        <div
          className={`w-full h-full flex hover:opacity-50 opacity-0 justify-center items-center absolute top-0 left-0 bg-black transition-all`}
        >
          <Button style="border w-1/3 p-1 text-sm text-white hover:bg-white hover:text-black transition-all duration-300">
            <Link to={`/product/${data.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col h-full justify-between my-2 mx-1">
          <p className="text-center">{data.title}</p>
          <p className="text-red-500 text-sm text-end mr-2">
            USD <span className="text-3xl font-bold">{price[0]}</span>
            <span className="text-base">
              {price[1] ? "." + price[1] : ".00"}
            </span>
          </p>
        </div>
        <Button
          style="bg-sky-400 py-2 text-white"
          onClick={() => addToCart(data.id)}
        >
          <p className="capitalize">add to cart</p>
        </Button>
      </div>
    </article>
  );
}
