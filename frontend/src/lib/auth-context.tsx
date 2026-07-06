import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { auth } from "./api";
import type { User } from "./types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    if (auth.isAuthenticated()) {
      auth.me()
        .then((res) => setUser(res.user))
        .catch(() => auth.clearToken())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await auth.login(email, password);
    auth.saveToken(res.token);
    setUser(res.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await auth.signup(name, email, password);
    auth.saveToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    auth.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}