import React from "react";
import { useCart } from "../../hooks/useCart";
import { CartItem as CartItemType } from "../../types/types";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItemFromCart } = useCart();

  return (
    <div className=" flex items-center justify-between py-4 border-b">
      <div className="flex items-center">
        <img
          src={item.images[0] || "https://via.placeholder.com/300"}
          alt={item.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="ml-4">
          <h3 className="text-lg font-medium">{item.title}</h3>
          <p className="text-gray-600">
            ${item.price} x {item.quantity}
          </p>
          <p className="text-sm font-semibold">
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <button
        onClick={() => removeItemFromCart(item.id)}
        className="text-red-500 hover:text-red-700"
        aria-label={`Remove ${item.title} from cart`}
      >
        Remove
      </button>
    </div>
  );
};

export default React.memo(CartItem);
