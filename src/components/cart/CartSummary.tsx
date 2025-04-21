import React from "react";
import { useCart } from "../../hooks/useCart";
import CartItem from "./CartItem";

const CartSummary = () => {
  const { cartItems, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <p className="text-gray-500">Your cart is empty</p>;
  }

  return (
    <div className="mt-4">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={`${item.id}-${item.quantity}`} item={item} />
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${cartTotal.toFixed(2)}</span>
        </div>
        <button
          onClick={clearCart}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-colors duration-300"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default React.memo(CartSummary);
