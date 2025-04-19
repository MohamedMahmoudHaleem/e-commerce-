import React from "react";
import { CartIcon } from "../cart/CartIcon";

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">E-Commerce Store</h1>
      <CartIcon />
    </header>
  );
};
