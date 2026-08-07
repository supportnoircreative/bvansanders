"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext({ showToast: () => {} });

export const TOAST_DURATION = 2200;

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const showToast = useCallback((text, duration = TOAST_DURATION) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage(text);
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), duration);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {visible && message ? (
          <motion.div
            className="pointer-events-none fixed bottom-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-max -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="status"
            aria-live="polite"
          >
            <span className="inline-block rounded-full bg-inked px-6 py-3 text-sm font-semibold text-bg shadow-[0_6px_20px_rgba(0,0,0,0.25)]">
              {message}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

export default ToastContext;