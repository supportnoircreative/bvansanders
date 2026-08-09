import {
  productsCollection,
  productRef,
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  sortByNewest,
} from "@/services/firebase/firestore";
import { toFriendlyError, logError } from "@/services/firebase/errors";
import { uploadProductImage, deleteProductImage } from "@/services/firebase/storage";

/**
 * ProductService — all product reads/writes for the storefront and the
 * admin panel. Low-level Storage/Firestore logic stays in
 * services/firebase/*; components stay in hooks.
 */
export const ProductService = {
  async createProduct(productData) {
    try {
      const product = await createDocument(productsCollection, {
        ...productData,
        isActive: true,
      });
      return ProductService.getProduct(product.id);
    } catch (error) {
      logError("ProductService.createProduct", error);
      throw toFriendlyError(error, "We couldn't add the product.");
    }
  },

  async getProduct(productId) {
    try {
      return await getDocument(productRef(productId));
    } catch (error) {
      logError("ProductService.getProduct", error);
      throw toFriendlyError(error, "We couldn't load that product.");
    }
  },

  async getProducts() {
    try {
      return await getDocuments(productsCollection, {
        orderByField: "createdAt",
        direction: "desc",
      });
    } catch (error) {
      logError("ProductService.getProducts", error);
      throw toFriendlyError(error, "We couldn't load the catalog.");
    }
  },

  async updateProduct(productId, productData) {
    try {
      return await updateDocument(productRef(productId), productData);
    } catch (error) {
      logError("ProductService.updateProduct", error);
      throw toFriendlyError(error, "We couldn't save the product.");
    }
  },

  async deleteProduct(productId) {
    try {
      const product = await this.getProduct(productId);
      if (product?.image) {
        try {
          await deleteProductImage(product.image);
        } catch (error) {
          logError("ProductService.deleteProduct.image", error);
        }
      }
      await deleteDocument(productRef(productId));
    } catch (error) {
      logError("ProductService.deleteProduct", error);
      throw toFriendlyError(error, "We couldn't delete the product.");
    }
  },

  async getFeaturedProducts() {
    try {
      return await getDocuments(productsCollection, {
        whereField: "featured",
        whereValue: true,
      });
    } catch (error) {
      logError("ProductService.getFeaturedProducts", error);
      throw toFriendlyError(error, "We couldn't load featured pieces.");
    }
  },

  async getProductsByCategory(category) {
    if (!category) return [];
    try {
      const products = await getDocuments(productsCollection, {
        whereField: "kind",
        whereValue: category,
      });
      return sortByNewest(products);
    } catch (error) {
      logError("ProductService.getProductsByCategory", error);
      throw toFriendlyError(error, "We couldn't load that category.");
    }
  },

  async searchProducts(query) {
    try {
      const all = await this.getProducts();
      const needle = (query || "").trim().toLowerCase();
      if (!needle) return all;
      return all.filter((product) =>
        product.title?.toLowerCase().includes(needle)
      );
    } catch (error) {
      logError("ProductService.searchProducts", error);
      throw toFriendlyError(error, "We couldn't search the catalog.");
    }
  },

  uploadProductImage(file) {
    return uploadProductImage(file);
  },

  deleteProductImage(pathOrUrl) {
    return deleteProductImage(pathOrUrl);
  },
};

export default ProductService;