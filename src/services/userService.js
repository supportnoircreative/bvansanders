import { userRef, getDocument, setDocument, updateDocument } from "@/services/firebase/firestore";
import { toFriendlyError } from "@/services/firebase/errors";

export const USER_ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
};

function normalizeProfile(profile) {
  if (!profile) return null;
  return {
    ...profile,
    role: profile.role || USER_ROLES.CUSTOMER,
  };
}

/**
 * User profile service. Each authenticated user gets a document in
 * `users/{uid}`. The `role` field is the source of truth for admin
 * access — enforced by Firestore security rules, not the frontend.
 */
export const UserService = {
  async createUserProfile(userId, data) {
    try {
      return normalizeProfile(
        await setDocument(userRef(userId), {
          name: data.name || "",
          email: data.email || "",
          role: USER_ROLES.CUSTOMER,
        })
      );
    } catch (error) {
      throw toFriendlyError(error, "We couldn't create your profile.");
    }
  },

  async ensureUserProfile(userId, data = {}) {
    try {
      const existing = await this.getUserProfile(userId);
      if (!existing) return this.createUserProfile(userId, data);
      return existing;
    } catch (error) {
      throw toFriendlyError(error, "We couldn't load your profile.");
    }
  },

  async getUserProfile(userId) {
    try {
      return normalizeProfile(await getDocument(userRef(userId)));
    } catch (error) {
      throw toFriendlyError(error, "We couldn't load your profile.");
    }
  },

  async updateUserProfile(userId, changes) {
    try {
      return normalizeProfile(await updateDocument(userRef(userId), changes));
    } catch (error) {
      throw toFriendlyError(error, "We couldn't update your profile.");
    }
  },

  hasAdminRole(profile) {
    return profile?.role === USER_ROLES.ADMIN;
  },
};

export default UserService;