import { getToken, clearToken } from "../auth/auth";

const API_BASE =
  (typeof import.meta !== "undefined" && (import.meta as ImportMeta).env?.VITE_API_BASE_URL) ||
  "http://localhost:5174/v1";

const UNAUTHORIZED_EVENT = "onewave:unauthorized";

function isApiError(r: unknown): r is { success: false; error: { code: string; message: string } } {
  return (
    typeof r === "object" &&
    r !== null &&
    "success" in r &&
    (r as { success: unknown }).success === false &&
    "error" in r
  );
}

export function getApiBase(): string {
  return API_BASE.replace(/\/$/, "");
}

export function getAuthGoogleUrl(): string {
  return `${getApiBase()}/auth/google`;
}

export type RequestConfig = RequestInit & {
  body?: unknown;
};

export async function apiRequest<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const { body, ...init } = config;
  const url = path.startsWith("http") ? path : `${getApiBase()}${path.startsWith("/") ? "" : "/"}${path}`;
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...init,
    headers,
    body: body !== undefined ? JSON.stringify(body) : init.body,
  });

  let json: unknown;
  const ct = res.headers.get("content-type");
  if (ct?.includes("application/json")) {
    json = await res.json();
  } else {
    const text = await res.text();
    throw new Error(res.status === 0 ? "Network error" : `HTTP ${res.status}: ${text || res.statusText}`);
  }

  if (res.status === 401) {
    clearToken();
    window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    if (isApiError(json) && json.error) {
      throw new Error(json.error.message || "UNAUTHORIZED");
    }
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    if (isApiError(json) && json.error) {
      throw new Error(json.error.message || json.error.code || "Request failed");
    }
    throw new Error(`HTTP ${res.status}`);
  }

  const success = json as { success: true; data: T };
  return success.data;
}
