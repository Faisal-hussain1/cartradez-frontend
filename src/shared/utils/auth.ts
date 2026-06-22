import {
  ADMIN_ROUTES,
  MANAGER_ROUTES,
  ROOT_ROUTE,
  USER_ROUTES,
} from '@/shared/constants/PATHS';
import {ROLES} from '@/shared/constants/users';
import {RoleType} from '@/shared/types/auth';

export const getRoleFlags = ({role}: RoleType) => {
  const isAdmin = role === ROLES.admin.value;
  const isManager = role === ROLES.manager.value;
  const isDealer = role === ROLES.dealer.value;
  const isUser = role === ROLES.user.value;

  return {isAdmin, isManager, isDealer, isUser};
};

export const getRedirectUrl = ({role}: RoleType): string => {
  const {isAdmin, isManager, isDealer, isUser} = getRoleFlags({role});

  if (isAdmin) return ADMIN_ROUTES.dashboard;
  if (isManager) return MANAGER_ROUTES.login;
  if (isUser || isDealer) return USER_ROUTES.listings;

  return ROOT_ROUTE;
};

const AUTH_COOKIE_PREFIX = 'x-auth-token';
const AUTH_COOKIE_NAMES = ['x-auth-token', 'x-auth-token-cartradez'];

const expireCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const clearAuthSession = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('accessToken');
  localStorage.removeItem('usersMeBlockedUntil');

  const authCookieNames = new Set([
    ...AUTH_COOKIE_NAMES,
    ...document.cookie
      .split(';')
      .map((cookie) => cookie.trim().split('=')[0])
      .filter((name) => name.startsWith(`${AUTH_COOKIE_PREFIX}-`)),
  ]);

  authCookieNames.forEach(expireCookie);
};
