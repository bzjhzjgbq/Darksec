import { apiRequest } from "./client";

export function loginByPassword(payload) {
  return apiRequest("/api/v1/auth/login/password", {
    method: "POST",
    body: payload,
  });
}

export function registerAccount(payload) {
  return apiRequest("/api/v1/auth/register", {
    method: "POST",
    body: payload,
  });
}
