import {jwtDecode, JwtPayload} from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'accessToken';
const AUTH_COOKIE_NAMES = ['x-auth-token', 'x-auth-token-cartradez'];
const AUTH_COOKIE_MAX_AGE_SECONDS = 24 * 60 * 60;
const SESSION_EXPIRED_EVENT = 'auth:session-expired';

let sessionExpiredEventDispatched = false;

export const getStoredAuthToken = () => {
  if (typeof window === 'undefined') return null;

  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const isAuthTokenExpired = (token: string) => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);

    if (!decodedToken.exp) return false;

    return decodedToken.exp <= Date.now() / 1000;
  } catch {
    return true;
  }
};

export const persistAuthToken = (token?: string | null) => {
  if (!token || typeof window === 'undefined') return;

  localStorage.setItem(ACCESS_TOKEN_KEY, token);

  AUTH_COOKIE_NAMES.forEach((name) => {
    document.cookie = `${name}=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
  });

  sessionExpiredEventDispatched = false;
};

export const clearStoredAuthSession = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem('usersMeBlockedUntil');

  AUTH_COOKIE_NAMES.forEach((name) => {
    document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
  });
};

export const notifyAuthSessionExpired = () => {
  if (typeof window === 'undefined' || sessionExpiredEventDispatched) return;

  sessionExpiredEventDispatched = true;
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
};

export const AUTH_SESSION_EXPIRED_EVENT = SESSION_EXPIRED_EVENT;
