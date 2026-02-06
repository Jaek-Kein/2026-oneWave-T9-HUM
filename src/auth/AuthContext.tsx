import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { isAuthenticated, signInBypass, signOut } from "./auth";

type AuthContextValue = {
  isLoggedIn: boolean;
  loginBypass: () => void;
  logout: () => void;
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

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(isAuthenticated());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      loginBypass,
      logout,
    }),
    [isLoggedIn, loginBypass, logout],
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
