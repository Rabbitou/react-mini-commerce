import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import Cart from "../cart/Cart";
import CartIcon from "../ui/CartIcon";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const cart = useAppSelector((state) => state.cart);

  return (
    <>
      <nav className="flex w-full h-11 bg-black justify-between items-center sticky top-0 left-0 z-10">
        <Link
          to={"/"}
          className="flex items-center p-3 h-full hover:bg-sky-400 transition-all"
        >
          Home
        </Link>
        <Link to={"/"}>
          <p className="px-3 font-semibold capitalize bg-gradient-to-r from-sky-400 to-orange-400 text-transparent bg-clip-text">
            E-Store
          </p>
        </Link>
        <div
          className="mx-4 p-1 cursor-pointer relative"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <div className="flex items-center justify-center absolute rounded-full bg-red-500 top-0 right-0 h-5 w-5">
            <span className="text-sm">{cart.cartQuantity}</span>
          </div>
          <CartIcon width={35} height={35} fillColor="white" />
        </div>
      </nav>
      <div className="">
        <Cart setShowCart={setShowCart} showCart={showCart} />
      </div>
    </>
  );
}
