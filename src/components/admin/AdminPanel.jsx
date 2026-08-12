"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LogOut, Package, ReceiptText } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { useOrders } from "@/hooks/useOrders";
import { ProductService, OrderService } from "@/services";
import { cn } from "@/lib/cn";
import { AdminGate } from "./AdminGate";
import { ProductForm } from "./ProductForm";
import { AdminProductList } from "./AdminProductList";
import { AdminOrderList } from "./AdminOrderList";

const TABS = [
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ReceiptText },
];

export function AdminPanel() {
  const { showToast } = useToast();
  const { user, loading, isAdmin, logout } = useAuth();
  const [tab, setTab] = useState("products");
  const [editing, setEditing] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!editing) return;
    if (window.matchMedia("(max-width: 1023px)").matches) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editing]);

  const {
    products,
    loading: productsLoading,
    error: productsError,
    refresh: refreshProducts,
  } = useProducts();
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    refresh: refreshOrders,
  } = useOrders();

  const handleSaved = useCallback(() => {
    setEditing(null);
    refreshProducts();
  }, [refreshProducts]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await ProductService.deleteProduct(id);
        showToast("Product deleted");
        refreshProducts();
      } catch (error) {
        showToast(error.message);
      }
    },
    [refreshProducts, showToast]
  );

  const handleToggleFeatured = useCallback(
    async (product) => {
      try {
        await ProductService.updateProduct(product.id, {
          featured: !product.featured,
        });
        showToast(
          product.featured
            ? "Removed from homepage"
            : "Featured on homepage"
        );
        refreshProducts();
      } catch (error) {
        showToast(error.message);
      }
    },
    [refreshProducts, showToast]
  );

  const handleStatusChange = useCallback(
    async (id, status) => {
      try {
        await OrderService.updateOrderStatus(id, status);
        refreshOrders();
      } catch (error) {
        showToast(error.message);
      }
    },
    [refreshOrders, showToast]
  );

  if (loading) {
    return (
      <div className="grid h-64 gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
        <div className="animate-pulse rounded-[10px] bg-chalk" aria-hidden="true" />
        <div className="animate-pulse rounded-[10px] bg-chalk" aria-hidden="true" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <AdminGate />;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 rounded-full bg-chalk p-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold uppercase tracking-wider transition-all duration-150",
                tab === id
                  ? "bg-inked text-bg"
                  : "text-ink-soft hover:text-inked"
              )}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
              <span className="font-mono text-[10.5px]">
                {id === "products" ? products.length : orders.length}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden max-w-[220px] truncate font-mono text-[11.5px] text-ink-soft sm:block">
            {user.email}
          </span>
          <button
            type="button"
            onClick={logout}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[12px] font-semibold text-ink-soft transition-colors duration-150 hover:border-inked hover:text-inked"
          >
            <LogOut size={13} strokeWidth={2} />
            Log out
          </button>
        </div>
      </div>

      {productsError && tab === "products" && (
        <p className="mb-4 rounded-[10px] border border-dashed border-line bg-surface px-4 py-3 text-[13px] text-orange">
          {productsError.message}
        </p>
      )}

      {ordersError && tab === "orders" && (
        <p className="mb-4 rounded-[10px] border border-dashed border-line bg-surface px-4 py-3 text-[13px] text-orange">
          {ordersError.message}
        </p>
      )}

      {tab === "products" ? (
        <div className="grid items-start gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-10">
          <div ref={formRef} className="scroll-mt-24 lg:sticky lg:top-24">
            <ProductForm
              key={editing?.id ?? "new"}
              editing={editing}
              onSaved={handleSaved}
              onCancelEdit={() => setEditing(null)}
            />
          </div>
          <AdminProductList
            products={products}
            loading={productsLoading}
            onEdit={setEditing}
            onDelete={handleDelete}
            onToggleFeatured={handleToggleFeatured}
          />
        </div>
      ) : (
        <AdminOrderList
          orders={orders}
          loading={ordersLoading}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default AdminPanel;