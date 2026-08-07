import { adminService } from "./adminService";

function mock(resolveValue, ms = 120) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(resolveValue), ms)
  );
}

/**
 * Catalog access. All reads go through the unified mock store
 * (adminService), so admin edits/additions/deletions are reflected on the
 * frontend immediately. Until a backend is connected these resolve from
 * local fixtures + overrides and simulate latency so components can be
 * swapped to real endpoints without changing signatures.
 */
export const productService = {
  async getAll() {
    return mock(adminService.getEffectiveProducts());
  },

  async getOriginals() {
    return mock(
      adminService.getEffectiveProducts().filter((product) => product.kind === "original")
    );
  },

  async getPrints() {
    return mock(
      adminService.getEffectiveProducts().filter((product) => product.kind === "print")
    );
  },

  async getByKind(kind) {
    return mock(
      adminService.getEffectiveProducts().filter((product) => product.kind === kind)
    );
  },

  async getFeatured() {
    return mock(adminService.getEffectiveFeatured());
  },

  async getById(id) {
    const found = adminService
      .getEffectiveProducts()
      .find((product) => product.id === id);
    return mock(found ?? null);
  },

  async search(query) {
    const needle = query.trim().toLowerCase();
    const results = needle
      ? adminService
          .getEffectiveProducts()
          .filter((product) => product.title.toLowerCase().includes(needle))
      : adminService.getEffectiveProducts();
    return mock(results);
  },

  async filter({ sold, kind } = {}) {
    const results = adminService.getEffectiveProducts().filter((product) => {
      if (sold !== undefined && product.sold !== sold) return false;
      if (kind && product.kind !== kind) return false;
      return true;
    });
    return mock(results);
  },

  async getAvailable() {
    return this.filter({ sold: false });
  },
};

export default productService;