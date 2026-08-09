import {
  getCurrentUser,
  loginWithEmail,
  loginWithGoogle,
  logout,
  registerWithEmail,
  sendPasswordReset,
  subscribeToAuthState,
} from "@/services/firebase/auth";
import { toFriendlyError } from "@/services/firebase/errors";
import { UserService } from "./UserService";

/**
 * AuthService — the single entry point for all authentication flows.
 * Components never touch `firebase/auth` directly; they go through this
 * service (usually via AuthContext/useAuth).
 */
export const AuthService = {
  async register({ name, email, password }) {
    try {
      const user = await registerWithEmail(email, password);
      await UserService.createUserProfile(user.uid, {
        name: name?.trim() || "",
        email: user.email || email,
      });
      return user;
    } catch (error) {
      throw toFriendlyError(error, "We couldn't create your account — please try again.");
    }
  },

  async login({ email, password }) {
    try {
      return await loginWithEmail(email, password);
    } catch (error) {
      throw toFriendlyError(error, "We couldn't log you in — please try again.");
    }
  },

  async loginWithGoogle() {
    try {
      const user = await loginWithGoogle();
      await UserService.ensureUserProfile(user.uid, {
        name: user.displayName || "",
        email: user.email || "",
      });
      return user;
    } catch (error) {
      throw toFriendlyError(error, "Google sign-in failed — please try again.");
    }
  },

  async logout() {
    try {
      await logout();
    } catch (error) {
      throw toFriendlyError(error, "We couldn't sign you out.");
    }
  },

  async sendPasswordResetEmail(email) {
    try {
      await sendPasswordReset(email);
    } catch (error) {
      throw toFriendlyError(error, "We couldn't send a reset link — please try again.");
    }
  },

  getCurrentUser() {
    return getCurrentUser();
  },

  subscribeToAuthState(callback) {
    return subscribeToAuthState(callback);
  },
};

export default AuthService;