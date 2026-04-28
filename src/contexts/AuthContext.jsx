import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginByPassword, registerAccount as registerAccountRequest } from "../api/auth";
import { getCurrentUserProfile } from "../api/user";
import { currentUserProfile } from "../data/mockUsers";
import { clearAccessToken, getAccessToken, setAccessToken } from "../utils/authStorage";
import { normalizeUserProfile } from "../utils/normalizeUser";

const AuthContext = createContext(null);
const GUEST_TOKEN = "guest-preview-token";

export function AuthProvider({ children }) {
  const [authReady, setAuthReady] = useState(false);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedToken = getAccessToken();

    if (!savedToken) {
      setAccessToken(GUEST_TOKEN);
      setToken(GUEST_TOKEN);
      setCurrentUser(normalizeUserProfile(currentUserProfile));
      setAuthReady(true);
      return;
    }

    if (savedToken === GUEST_TOKEN) {
      setToken(GUEST_TOKEN);
      setCurrentUser(normalizeUserProfile(currentUserProfile));
      setAuthReady(true);
      return;
    }

    setToken(savedToken);
    getCurrentUserProfile()
      .then((response) => {
        setCurrentUser(normalizeUserProfile(response?.data));
      })
      .catch(() => {
        setAccessToken(GUEST_TOKEN);
        setToken(GUEST_TOKEN);
        setCurrentUser(normalizeUserProfile(currentUserProfile));
      })
      .finally(() => {
        setAuthReady(true);
      });
  }, []);

  async function refreshCurrentUser(nextToken = token) {
    if (!nextToken || nextToken === GUEST_TOKEN) {
      const guestUser = normalizeUserProfile(currentUserProfile);
      setCurrentUser(guestUser);
      return guestUser;
    }

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
    setAccessToken(GUEST_TOKEN);
    setToken(GUEST_TOKEN);
    setCurrentUser(normalizeUserProfile(currentUserProfile));
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
