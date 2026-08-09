import { useCallback, useEffect, useRef, useState } from "react";
import { OrderService } from "@/services";

/**
 * Orders hook for the admin panel (all orders) or a customer's own orders:
 *   useOrders()            — admin: every order
 *   useOrders({ userId })  — one user's orders
 */
export function useOrders({ userId = null } = {}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const active = useRef(true);

  const fetchOrders = useCallback(
    () =>
      userId
        ? OrderService.getOrdersByUser(userId)
        : OrderService.getOrders(),
    [userId]
  );

  const fetchOrdersWithState = useCallback(
    (fizzle) =>
      fetchOrders()
        .then((items) => {
          if (fizzle()) return;
          setOrders(items);
          setError(null);
        })
        .catch((err) => {
          if (fizzle()) return;
          setError(err);
        })
        .finally(() => {
          if (fizzle()) return;
          setLoading(false);
        }),
    [fetchOrders]
  );

  useEffect(() => {
    active.current = true;
    const isActive = () => !active.current;
    fetchOrdersWithState(isActive);
    return () => {
      active.current = false;
    };
  }, [fetchOrdersWithState]);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    return fetchOrdersWithState(() => false);
  }, [fetchOrdersWithState]);

  return { orders, loading, error, refresh };
}

export default useOrders;