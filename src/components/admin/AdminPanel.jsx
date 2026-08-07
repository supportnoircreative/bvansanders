"use client";

import { useCallback, useEffect, useState } from "react";
import { LogOut, Package, ReceiptText } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useAdminAuth, notifyAdminAuthChange } from "@/hooks/useAdminAuth";
import { adminService } from "@/services";
import { ADMIN_SESSION_KEY } from "@/constants/admin";
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
  const authed = useAdminAuth();
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);

  const refreshProducts = useCallback(async () => {
    setProducts(await adminService.getProducts());
  }, []);

  const refreshOrders = useCallback(async () => {
    setOrders(await adminService.getOrders());
  }, []);

  useEffect(() => {
    if (!authed) return;
    let active = true;
    adminService.getProducts().then((items) => {
      if (active) setProducts(items);
    });
    adminService.getOrders().then((items) => {
      if (active) setOrders(items);
    });
    return () => {
      active = false;
    };
  }, [authed]);

  if (!authed) {
    return <AdminGate />;
  }

  const handleSaved = () => {
    setEditing(null);
    refreshProducts();
  };

  const handleDelete = async (id) => {
    await adminService.deleteProduct(id);
    showToast("Product deleted (prototype)");
    refreshProducts();
  };

  const handleStatusChange = async (id, status) => {
    await adminService.updateOrderStatus(id, status);
    refreshOrders();
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    notifyAdminAuthChange();
  };

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

        <button
          type="button"
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[12px] font-semibold text-ink-soft transition-colors duration-150 hover:border-inked hover:text-inked"
        >
          <LogOut size={13} strokeWidth={2} />
          Log out
        </button>
      </div>

      {tab === "products" ? (
        <div className="grid items-start gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-24">
            <ProductForm
              key={editing?.id ?? "new"}
              editing={editing}
              onSaved={handleSaved}
              onCancelEdit={() => setEditing(null)}
            />
          </div>
          <AdminProductList
            products={products}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <AdminOrderList orders={orders} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}

export default AdminPanel;