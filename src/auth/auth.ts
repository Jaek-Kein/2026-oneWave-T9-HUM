const AUTH_KEY = "onewave_auth_bypass";

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function signInBypass() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(AUTH_KEY, "1");
}

export function signOut() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(AUTH_KEY);
}
