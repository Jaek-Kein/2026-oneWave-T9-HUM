import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { isAuthenticated, setToken, signInBypass, signOut } from "./auth";

type AuthContextValue = {
  isLoggedIn: boolean;
  loginBypass: () => void;
  logout: () => void;
  setAuthFromCallback: (token: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAuthenticated());

  const loginBypass = useCallback(() => {
    signInBypass();
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    signOut();
    setIsLoggedIn(false);
  }, []);

  const setAuthFromCallback = useCallback((token: string) => {
    setToken(token);
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const handleStorage = () => setIsLoggedIn(isAuthenticated());
    const handleUnauthorized = () => setIsLoggedIn(false);

    window.addEventListener("storage", handleStorage);
    window.addEventListener("onewave:unauthorized" as never, handleUnauthorized);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("onewave:unauthorized" as never, handleUnauthorized);
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      loginBypass,
      logout,
      setAuthFromCallback,
    }),
    [isLoggedIn, loginBypass, logout, setAuthFromCallback],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
