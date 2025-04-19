import { useCart as useCartContext } from "../context/CartContext";
import { Product } from "../types/types";
import { useCallback, useMemo } from "react";

export const useCart = () => {
  const context = useCartContext();

  const addItemToCart = useCallback((product: Product, quantity: number = 1) => {
    if (quantity < 1) return;
    const item = { ...product, quantity };
    context.addToCart(item);
  }, [context]);

  const removeItemFromCart = useCallback((productId: number) => {
    context.removeFromCart(productId);
  }, [context]);

  const updateItemQuantity = useCallback((productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItemFromCart(productId);
      return;
    }

    const existingItem = context.cartItems.find(item => item.id === productId);
    if (!existingItem) return;

    const updatedItem = { ...existingItem, quantity: newQuantity };
    context.removeFromCart(productId);
    context.addToCart(updatedItem);
  }, [context, removeItemFromCart]);

  const clearCart = useCallback(() => {
    context.clearCart();
  }, [context]);

  const getItemQuantity = useCallback((productId: number) => {
    const item = context.cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [context.cartItems]);

  const isInCart = useCallback((productId: number) => {
    return context.cartItems.some(item => item.id === productId);
  }, [context.cartItems]);

  const cartItemCount = useMemo(() => context.getCartItemCount(), [context]);
  const cartTotal = useMemo(() => context.getCartTotal(), [context]);

  return {
    cartItems: context.cartItems,
    cartItemCount,
    cartTotal,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
  };
};

export type UseCartReturnType = ReturnType<typeof useCart>;