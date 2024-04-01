import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex h-11 bg-black justify-between items-center">
      <Link
        to={"/"}
        className="flex items-center p-3 h-full hover:bg-sky-400 transition-all"
      >
        Home
      </Link>
      <p className="px-3 font-semibold capitalize bg-gradient-to-r from-sky-400 to-orange-400 text-transparent bg-clip-text">
        Welcome to my shop
      </p>
    </div>
  );
}
