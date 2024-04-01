import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="flex bg-black text-white justify-center p-4 text-sm sm:text-base">
      <p className="opacity-90">
        <a href="https://github.com/Rabbitou" className="hover:text-sky-400">
          Rabbitou
        </a>
        <span> &copy; {year}</span>
      </p>
    </div>
  );
}
