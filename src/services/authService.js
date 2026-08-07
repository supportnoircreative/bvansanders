/**
 * Authentication service. Backend-ready: swap the mock flows for real
 * API calls without touching the consuming components.
 */
export const authService = {
  async login({ email, password }) {
    return { email, name: null, auth: true };
  },

  async register({ name, email, password }) {
    return { name, email, auth: true };
  },

  async logout() {
    return { auth: false };
  },

  async forgotPassword({ email }) {
    return { email, sent: true };
  },

  async getSession() {
    return { auth: false };
  },
};

export default authService;