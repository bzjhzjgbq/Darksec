import { getAccessToken } from "../utils/authStorage";

const defaultBaseUrl = import.meta.env.DEV ? "/api-proxy" : "http://192.168.3.225:8080";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || defaultBaseUrl;

async function parseBody(response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export async function apiRequest(path, options = {}) {
  const token = options.token ?? getAccessToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await parseBody(response);

  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || "请求失败，请稍后再试");
  }

  if (payload && typeof payload === "object" && "code" in payload && payload.code !== "SUCCESS") {
    throw new Error(payload.message || "接口返回异常");
  }

  return payload;
}
