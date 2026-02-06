const AUTH_TOKEN_KEY = "onewave_jwt";
const AUTH_BYPASS_KEY = "onewave_auth_bypass";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.localStorage.removeItem(AUTH_BYPASS_KEY);
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_BYPASS_KEY);
}

/** JWT가 있거나(백엔드 연동) bypass 플래그가 있으면 로그인 상태 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!getToken() || window.localStorage.getItem(AUTH_BYPASS_KEY) === "1";
}

/** 개발용: 백엔드 없이 로그인 처리 */
export function signInBypass(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_BYPASS_KEY, "1");
}

export function signOut(): void {
  clearToken();
}
