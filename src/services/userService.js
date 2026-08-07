/**
 * User profile service. Backend-ready stub.
 */
export const userService = {
  async getProfile() {
    return null;
  },

  async updateProfile(profile) {
    return profile;
  },

  async getWishlist() {
    return [];
  },

  async addToWishlist(productId) {
    return { productId };
  },

  async removeFromWishlist(productId) {
    return { productId, removed: true };
  },
};

export default userService;