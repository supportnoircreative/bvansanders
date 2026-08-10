"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { CART } from "@/constants/navigation";
import { pluralize } from "@/utils/format";

const CartContext = createContext(null);

const STORAGE_KEY = "bvansanders.cart";
const EMPTY_CART = [];

function readCart() {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : EMPTY_CART;
    return Array.isArray(parsed) ? parsed : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

function createCartStore() {
  let items = EMPTY_CART;
  const listeners = new Set();

  function emit() {
    for (const listener of listeners) listener();
  }

  function readFromStorage() {
    items = readCart();
    emit();
  }

  function subscribe(listener) {
    listeners.add(listener);
    window.addEventListener("storage", readFromStorage);
    readFromStorage();
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", readFromStorage);
    };
  }

  function getSnapshot() {
    return items;
  }

  function getServerSnapshot() {
    return EMPTY_CART;
  }

  function update(updater) {
    items = updater(items);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — cart stays in memory only
    }
    emit();
  }

  return { subscribe, getSnapshot, getServerSnapshot, update };
}

export function CartProvider({ children }) {
  const [store] = useState(createCartStore);
  const [isOpen, setIsOpen] = useState(false);

  const items = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const count = useMemo(
    () => Math.min(items.length, CART.maxCount),
    [items]
  );

  const addItem = useCallback(
    (product) => store.update((current) => [...current, product]),
    [store]
  );

  const removeItem = useCallback(
    (productId) =>
      store.update((current) =>
        current.filter((item) => item.id !== productId)
      ),
    [store]
  );

  const clearCart = useCallback(
    () => store.update(() => EMPTY_CART),
    [store]
  );

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