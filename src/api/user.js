import { apiRequest } from "./client";

export function getCurrentUserProfile(options) {
  return apiRequest("/api/v1/users/me", options);
}
