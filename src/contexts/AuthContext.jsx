import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginByPassword, registerAccount as registerAccountRequest } from "../api/auth";
import { getCurrentUserProfile } from "../api/user";
import { clearAccessToken, getAccessToken, setAccessToken } from "../utils/authStorage";
import { normalizeUserProfile } from "../utils/normalizeUser";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authReady, setAuthReady] = useState(false);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedToken = getAccessToken();

    if (!savedToken) {
      setAuthReady(true);
      return;
    }

    setToken(savedToken);
    getCurrentUserProfile()
      .then((response) => {
        setCurrentUser(normalizeUserProfile(response?.data));
      })
      .catch(() => {
        clearAccessToken();
        setToken("");
        setCurrentUser(null);
      })
      .finally(() => {
        setAuthReady(true);
      });
  }, []);

  async function refreshCurrentUser(nextToken = token) {
    const response = await getCurrentUserProfile(nextToken ? { token: nextToken } : undefined);
    const normalizedUser = normalizeUserProfile(response?.data);
    setCurrentUser(normalizedUser);
    return normalizedUser;
  }

  async function login(payload) {
    const response = await loginByPassword(payload);
    const authData = response?.data;
    const nextToken = authData?.accessToken || "";
    const normalizedUser = normalizeUserProfile(authData?.user);

    setAccessToken(nextToken);
    setToken(nextToken);
    setCurrentUser(normalizedUser);

    try {
      await refreshCurrentUser(nextToken);
    } catch {
      setCurrentUser(normalizedUser);
    }

    return normalizedUser;
  }

  async function registerAccount(payload) {
    const response = await registerAccountRequest(payload);
    const authData = response?.data;
    const nextToken = authData?.accessToken || "";
    const normalizedUser = normalizeUserProfile(authData?.user);

    setAccessToken(nextToken);
    setToken(nextToken);
    setCurrentUser(normalizedUser);

    try {
      await refreshCurrentUser(nextToken);
    } catch {
      setCurrentUser(normalizedUser);
    }

    return normalizedUser;
  }

  function logout() {
    clearAccessToken();
    setToken("");
    setCurrentUser(null);
  }

  const value = useMemo(
    () => ({
      authReady,
      isLoggedIn: Boolean(token),
      token,
      currentUser,
      login,
      registerAccount,
      logout,
      refreshCurrentUser,
    }),
    [authReady, token, currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
