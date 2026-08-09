"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CART } from "@/constants/navigation";
import { pluralize } from "@/utils/format";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const count = useMemo(
    () => Math.min(items.length, CART.maxCount),
    [items]
  );

  const addItem = useCallback((product) => {
    setItems((current) => [...current, product]);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((current) =>
      current.filter((item) => item.id !== productId)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const summary = useCallback(
    (isEmpty) =>
      isEmpty
        ? CART.empty
        : `${items.length} ${pluralize(
            items.length,
            "item"
          )}${CART.summary}`,
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      isOpen,
      addItem,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      summary,
    }),
    [items, count, isOpen, addItem, removeItem, clearCart, openCart, closeCart, summary]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartContext;