const TOKEN_KEY = "thinkboard_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function loginWithGoogle() {
  const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5000" : "";
  window.location.href = `${baseUrl}/api/auth/google`;
}
