"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/buttons";
import { Field } from "@/components/forms/Field";
import { INPUT_CLASSES } from "@/components/forms/fieldClasses";
import { useToast } from "@/hooks/useToast";
import { ProductService } from "@/services";
import { formatSize } from "@/utils/format";
import {
  ADMIN_CATEGORIES,
  ADMIN_TAGS,
  SIZE_UNITS,
} from "@/constants/admin";
import { MEDIUM_BY_KIND, EDITION_BY_KIND } from "@/constants/products";

const EMPTY_FORM = {
  title: "",
  category: "print",
  tag: "",
  customTag: "",
  price: "",
  width: "",
  height: "",
  sizeUnit: "in",
  featured: false,
  description: "",
  medium: "",
  edition: "",
  image: "",
};

const UNIT_SELECT_CLASSES =
  INPUT_CLASSES.replace("w-full", "").trim() + " w-[110px] shrink-0";

const CATEGORY_META = {
  print: { kind: "print", frameLabel: "Giclée" },
  painting: { kind: "original", frameLabel: "Original" },
  gallery: { kind: "gallery", frameLabel: "Gallery" },
};

const KNOWN_TAGS = new Set(["", "processing", "soldout"]);

function initialForm(editing) {
  if (!editing) return EMPTY_FORM;
  const legacySize = editing.sizeValue ?? "";
  const tag = editing.tag ?? "";
  const isCustomTag = !KNOWN_TAGS.has(tag);
  return {
    title: editing.title ?? "",
    category: editing.category ?? "print",
    tag: isCustomTag ? "custom" : tag,
    customTag: isCustomTag ? tag : "",
    price: editing.price ?? "",
    width: editing.width ?? legacySize,
    height: editing.height ?? legacySize,
    sizeUnit: editing.sizeUnit ?? "in",
    featured: Boolean(editing.featured),
    description: editing.description ?? "",
    medium: editing.medium ?? "",
    edition: editing.edition ?? "",
    image: editing.image ?? "",
  };
}

export function ProductForm({ editing = null, onSaved, onCancelEdit }) {
  const { showToast } = useToast();
  const [form, setForm] = useState(() => initialForm(editing));
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setForm((current) => ({ ...current, image: "" }));
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const size = formatSize(form.width, form.height, form.sizeUnit);
      const meta = CATEGORY_META[form.category] ?? CATEGORY_META.print;
      const tag =
        form.tag === "custom" ? form.customTag.trim() : form.tag;

      let image = form.image;
      if (imageFile) {
        const uploaded = await ProductService.uploadProductImage(imageFile);
        image = uploaded.url;
      }

      const product = {
        title: form.title.trim(),
        category: form.category,
        kind: meta.kind,
        frameLabel: meta.frameLabel,
        tag,
        sold: tag === "soldout",
        featured: Boolean(form.featured),
        description: form.description.trim(),
        medium: form.medium.trim(),
        edition: form.edition.trim(),
        image,
        price: Number(form.price),
        width: Number(form.width),
        height: Number(form.height),
        sizeUnit: form.sizeUnit,
        size,
        dimensions: size,
      };

      const saved = editing
        ? await ProductService.updateProduct(editing.id, product)
        : await ProductService.createProduct(product);

      // Clean up a replaced/removed image from storage.
      if (
        editing?.image &&
        editing.image !== saved.image &&
        !editing.image.startsWith("data:")
      ) {
        try {
          await ProductService.deleteProductImage(editing.image);
        } catch (error) {
          console.warn("Failed to remove old product image:", error?.message);
        }
      }

      showToast(`${saved.title} saved`);
      onSaved(saved);
    } catch (error) {
      showToast(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={editing ? "Edit product" : "Add product"}
      className="rounded-[10px] border border-line bg-surface p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-orange">
          {editing ? "Edit product" : "Add product"}
        </h2>
        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="cursor-pointer rounded-full bg-chalk px-3 py-1 font-mono text-[11px] text-ink-soft transition-colors hover:text-inked"
          >
            Cancel edit
          </button>
        )}
      </div>

      <Field label="Title" htmlFor="admin-title">
        <input
          id="admin-title"
          name="title"
          type="text"
          required
          placeholder="e.g. Static Bloom II"
          className={INPUT_CLASSES}
          value={form.title}
          onChange={handleChange}
        />
      </Field>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field label="Category" htmlFor="admin-category">
          <select
            id="admin-category"
            name="category"
            className={INPUT_CLASSES}
            value={form.category}
            onChange={handleChange}
          >
            {ADMIN_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Tag" htmlFor="admin-tag">
          <select
            id="admin-tag"
            name="tag"
            className={INPUT_CLASSES}
            value={form.tag}
            onChange={handleChange}
          >
            {ADMIN_TAGS.map((tag) => (
              <option key={tag.value} value={tag.value}>
                {tag.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {form.tag === "custom" && (
        <Field label="Custom tag" htmlFor="admin-custom-tag">
          <input
            id="admin-custom-tag"
            name="customTag"
            type="text"
            required
            maxLength={24}
            placeholder="e.g. Limited Edition"
            className={INPUT_CLASSES}
            value={form.customTag}
            onChange={handleChange}
          />
        </Field>
      )}

      <Field label="Price (USD)" htmlFor="admin-price">
        <input
          id="admin-price"
          name="price"
          type="number"
          required
          min="1"
          step="0.01"
          placeholder="145"
          className={INPUT_CLASSES}
          value={form.price}
          onChange={handleChange}
        />
      </Field>

      <Field label="Size" htmlFor="admin-width">
        <div className="flex items-center gap-2">
          <input
            id="admin-width"
            name="width"
            type="number"
            required
            min="0.1"
            step="0.1"
            aria-label="Width"
            placeholder="Width"
            className={INPUT_CLASSES + " min-w-0 flex-1"}
            value={form.width}
            onChange={handleChange}
          />
          <span className="font-mono text-sm text-ink-soft" aria-hidden="true">
            ×
          </span>
          <input
            name="height"
            type="number"
            required
            min="0.1"
            step="0.1"
            aria-label="Height"
            placeholder="Height"
            className={INPUT_CLASSES + " min-w-0 flex-1"}
            value={form.height}
            onChange={handleChange}
          />
          <select
            name="sizeUnit"
            aria-label="Size unit"
            className={UNIT_SELECT_CLASSES}
            value={form.sizeUnit}
            onChange={handleChange}
          >
            {SIZE_UNITS.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-1.5 text-[11px] text-ink-soft">
          e.g. 18 inches × 24 inches → “18&quot; × 24&quot;”
        </p>
      </Field>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field label="Medium" htmlFor="admin-medium">
          <input
            id="admin-medium"
            name="medium"
            type="text"
            maxLength={60}
            placeholder={`e.g. ${MEDIUM_BY_KIND.print}`}
            className={INPUT_CLASSES}
            value={form.medium}
            onChange={handleChange}
          />
        </Field>

        <Field label="Edition" htmlFor="admin-edition">
          <input
            id="admin-edition"
            name="edition"
            type="text"
            maxLength={60}
            placeholder={`e.g. ${EDITION_BY_KIND.print}`}
            className={INPUT_CLASSES}
            value={form.edition}
            onChange={handleChange}
          />
        </Field>
      </div>
      <p className="-mt-2 mb-5 text-[11px] text-ink-soft">
        Shown on the product page. Leave blank to use the default for the
        category.
      </p>

      <Field label="Description" htmlFor="admin-description">
        <textarea
          id="admin-description"
          name="description"
          placeholder="Short description shown on the product page..."
          className={INPUT_CLASSES + " min-h-[90px] resize-y"}
          value={form.description}
          onChange={handleChange}
        />
      </Field>

      <div className="mb-5">
        <span className="mb-2 block text-[11.5px] font-extrabold uppercase tracking-wider text-ink-soft">
          Image
        </span>
        {imagePreview || form.image ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview ?? form.image}
              alt="Product preview"
              className="h-28 w-28 rounded-[6px] border border-line object-cover"
            />
            <button
              type="button"
              aria-label="Remove image"
              onClick={handleRemoveImage}
              className="absolute -right-2 -top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-inked text-bg transition-transform hover:scale-110"
            >
              <X size={12} strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[6px] border-[1.5px] border-dashed border-line px-4 py-5 text-center transition-colors hover:border-orange">
            <ImagePlus size={20} strokeWidth={1.8} className="text-ink-soft" />
            <span className="text-[12.5px] font-semibold text-ink-soft">
              Upload an image
            </span>
            <span className="text-[11px] text-ink-soft">
              PNG or JPG — uploaded to Firebase Storage
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      <label className="mb-5 flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
          className="peer sr-only"
        />
        <span className="relative h-6 w-11 shrink-0 rounded-full bg-chalk transition-colors peer-checked:bg-orange" />
        <span className="text-[13px] font-semibold text-inked">
          Featured on homepage
        </span>
      </label>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting
          ? "Saving..."
          : editing
            ? "Save changes"
            : "Add product"}
      </Button>
    </form>
  );
}

export default ProductForm;