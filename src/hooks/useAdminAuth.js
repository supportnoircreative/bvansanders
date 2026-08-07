"use client";

import { useSyncExternalStore } from "react";
import { ADMIN_SESSION_KEY } from "@/constants/admin";

const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return (
    typeof window !== "undefined" &&
    window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "1"
  );
}

function getServerSnapshot() {
  return false;
}

export function notifyAdminAuthChange() {
  listeners.forEach((listener) => listener());
}

/**
 * SSR-safe admin auth flag. The server always renders the unauthenticated
 * state; once hydrated, this store switches to the real sessionStorage
 * value without a hydration mismatch.
 */
export function useAdminAuth() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}