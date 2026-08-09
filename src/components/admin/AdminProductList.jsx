"use client";

import { useState } from "react";
import { Pencil, Star, Trash2 } from "lucide-react";
import { getArtGradient } from "@/utils/artwork";
import { formatUSD } from "@/utils/format";
import { StatusBadge } from "./StatusBadge";
import { ADMIN_CATEGORIES } from "@/constants/admin";

function categoryLabel(value) {
  return ADMIN_CATEGORIES.find((category) => category.value === value)?.label;
}

function sizeLabel(product) {
  if (product.size) return product.size;
  if (product.sizeValue) return `${product.sizeValue} ${product.sizeUnit}`;
  return "—";
}

export function AdminProductList({ products, onEdit, onDelete }) {
  const [confirmingId, setConfirmingId] = useState(null);

  if (products.length === 0) {
    return (
      <div className="rounded-[10px] border border-dashed border-line bg-surface px-6 py-12 text-center">
        <p className="font-display mb-2 text-xl uppercase">
          No products yet
        </p>
        <p className="text-sm text-ink-soft">
          Use the form to add your first product.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {products.map((product, index) => (
        <li
          key={product.id}
          className="rounded-[10px] border border-line bg-surface p-4"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-[4px] border border-line"
              style={
                product.image ? undefined : { background: getArtGradient(index) }
              }
            >
              {product.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt=""
                  className="h-full w-full object-contain"
                />
              )}
            </span>

            <div className="min-w-0 flex-1 basis-40">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-[14.5px] font-bold">
                  {product.title}
                </p>
                {product.featured && (
                  <Star
                    size={13}
                    className="fill-yellow text-yellow"
                    aria-label="Featured"
                  />
                )}
                <StatusBadge value={product.tag} />
              </div>
              <p className="mt-0.5 truncate font-mono text-[12px] text-ink-soft">
                {categoryLabel(product.category)} · {formatUSD(product.price)} ·{" "}
                {sizeLabel(product)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                aria-label={`Edit ${product.title}`}
                onClick={() => onEdit(product)}
                className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-150 hover:border-inked hover:bg-chalk hover:text-inked"
              >
                <Pencil size={14} strokeWidth={2} />
              </button>
              {confirmingId === product.id ? (
                <button
                  type="button"
                  onClick={() => onDelete(product.id)}
                  onBlur={() => setConfirmingId(null)}
                  className="cursor-pointer rounded-full bg-orange px-2.5 py-1.5 font-mono text-[10.5px] font-semibold text-white"
                >
                  Confirm
                </button>
              ) : (
                <button
                  type="button"
                  aria-label={`Delete ${product.title}`}
                  onClick={() => setConfirmingId(product.id)}
                  className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-150 hover:border-orange hover:bg-orange hover:text-white"
                >
                  <Trash2 size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AdminProductList;