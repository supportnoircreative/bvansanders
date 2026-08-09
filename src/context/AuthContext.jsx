"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService, UserService } from "@/services";

const AuthContext = createContext(null);

/**
 * Single, centralized auth listener for the whole app. Components consume
 * auth state through useAuth() — never call onAuthStateChanged themselves.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const unsubscribe = AuthService.subscribeToAuthState(async (firebaseUser) => {
      if (!active) return;
      setUser(firebaseUser);
      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
        return;
      }
      try {
        const userProfile = await UserService.getUserProfile(firebaseUser.uid);
        if (!active) return;
        setProfile(userProfile);
      } catch {
        if (active) setProfile(null);
      } finally {
        if (active) setLoading(false);
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const userProfile = await UserService.getUserProfile(user.uid);
    setProfile(userProfile);
    return userProfile;
  }, [user]);

  const register = useCallback(async (values) => {
    const createdUser = await AuthService.register(values);
    const userProfile = await UserService.getUserProfile(createdUser.uid);
    setProfile(userProfile);
    return createdUser;
  }, []);

  const login = useCallback(async (values) => {
    const loggedInUser = await AuthService.login(values);
    const userProfile = await UserService.getUserProfile(loggedInUser.uid);
    setProfile(userProfile);
    return loggedInUser;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const user = await AuthService.loginWithGoogle();
    const userProfile = await UserService.getUserProfile(user.uid);
    setProfile(userProfile);
    return user;
  }, []);

  const logout = useCallback(async () => {
    await AuthService.logout();
    setProfile(null);
  }, []);

  const resetPassword = useCallback(
    (email) => AuthService.sendPasswordResetEmail(email),
    []
  );

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: Boolean(user) && UserService.hasAdminRole(profile),
      login,
      loginWithGoogle,
      logout,
      register,
      resetPassword,
      refreshProfile,
    }),
    [user, profile, loading, login, loginWithGoogle, logout, register, resetPassword, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;