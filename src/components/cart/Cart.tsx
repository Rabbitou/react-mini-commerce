import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../action";
import { clearCart } from "../../store/cart";
import { useAppDispatch, useAppSelector } from "../../store";
import { CartItem } from "../../types/cart";
import { Product } from "../../types/product";
import Button from "../ui/Button";
import CartProductCard from "./CartProductCard";

export default function Cart({
  setShowCart,
  showCart,
}: {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  showCart: boolean;
}) {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        // setIsLoading(true);
        const res = await getAllProducts();
        setProducts(res);
      } catch (error) {
        // setError("Something went wrong !");
      } finally {
        // setIsLoading(false);
      }
    };
    fetchApi();
  }, []);

  const checkout = () => {
    dispatch(clearCart());
    setShowCart(false);
    navigate("/");
  };

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center overflow-hidden text-gray-700 bg-white fixed w-4/5 sm:w-2/3 lg:w-2/5 h-screen top-0 right-0 z-50 transition-all duration-500 ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/*header*/}
        <div className="flex items-center justify-between p-4 w-full border-b">
          <h3 className="text-xl font-semibold">Your cart</h3>
          <Button onClick={() => setShowCart(false)} style="hover:opacity-40">
            <svg
              className="w-6 h-6 text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </Button>
        </div>

        {/*body*/}
        <div className="relative flex-auto p-4 overflow-y-auto w-full border-b">
          {/* header */}
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{cart.cartQuantity} Articles</p>
            <Button
              onClick={() => clearCart()}
              style={"font-medium text-sm hover:opacity-40"}
            >
              <p>Clear Cart</p>
            </Button>
          </div>

          {cart.cartItems.map((cartProduct: CartItem) => {
            const product: Product = products.find(
              (p) => p.id === cartProduct.id
            )!;
            if (product) {
              return (
                <CartProductCard
                  key={cartProduct.id}
                  product={product}
                  cartProduct={cartProduct}
                />
              );
            }
          })}
        </div>

        {/*footer*/}
        <div className="flex flex-col items-center justify-end w-full p-4">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="font-semibold text-sm">Sous-total</span>
            <span className="font-semibold text-lg">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EUR",
              }).format(
                cart.cartItems.reduce(
                  (total: number, cartProduct: CartItem) => {
                    const product = products.find(
                      (item) => item.id === cartProduct.id
                    );
                    return total + (product?.price || 0) * cartProduct.quantity;
                  },
                  0
                )
              )}
            </span>
          </div>
          <Button
            onClick={checkout}
            style="flex justify-center items-center w-full px-10 py-3 space-x-1 text-white bg-black rounded-none hover:opacity-80 cursor-pointer whitespace-nowrap disabled:opacity-70 disabled:cursor-default"
            disabled={cart.cartItems.length < 1}
          >
            <p className="capitalize">checkout</p>
          </Button>
        </div>
      </div>
      <div
        onClick={() => setShowCart(false)}
        className={`opacity-50 fixed inset-0 z-40 bg-black ${
          showCart ? "" : "hidden"
        }`}
      ></div>
    </>
  );
}
