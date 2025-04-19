import React, { useState } from "react";
import CartIcon from "../cart/CartIcon";
import CartSummary from "../cart/CartSummary";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-Commerce Store</h1>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2"
          >
            <CartIcon />
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          <main className="flex-1">{children}</main>
          {isCartOpen && (
            <aside className="absolute top-15 right-20 w-84 ml-8">
              <div className="bg-white p-6 rounded-lg shadow-neutral-500 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Your Cart</h2>
                <CartSummary />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
