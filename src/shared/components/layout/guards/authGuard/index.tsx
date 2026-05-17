'use client';

import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRouteType from '@/shared/hooks/useRouterType';
import { actions, getCurrentUser } from '@/shared/redux/slices/users';
import { AUTH_ROUTES } from '@/shared/constants/PATHS';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import { NodeChildrenProps } from '@/shared/interfaces/common';
import { getRedirectUrl, getRoleFlags } from '@/shared/utils/auth';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import {getRequest} from '@/shared/utils/requests';

const AuthGuard = ({ children }: NodeChildrenProps): JSX.Element => {
  const dispatch = useDispatch();
  const {
    isAuthRoute,
    isAdminRoute,
    isDealersRoute,
    isManagerRoute,
    isUserRoute,
    isPublicRoute,
  } = useRouteType();

  const router = useLocaleRouter();
  const currentUser = useSelector(getCurrentUser);
  const isLoggedIn = Boolean(currentUser?._id);

  const [mount, setMount] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const syncInFlightRef = useRef(false);
  const lastSyncedAtRef = useRef(0);
  const SYNC_MIN_GAP_MS = 60000;
  const RATE_LIMIT_COOLDOWN_MS = 120000;

  const syncCurrentUser = useCallback(
    async ({force = false}: {force?: boolean} = {}) => {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('accessToken');
      if (!token) return;
      if (syncInFlightRef.current) return;

      const blockedUntilRaw = localStorage.getItem('usersMeBlockedUntil');
      const blockedUntil = blockedUntilRaw ? Number(blockedUntilRaw) : 0;
      if (!force && blockedUntil && Date.now() < blockedUntil) return;

      const now = Date.now();
      if (!force && now - lastSyncedAtRef.current < SYNC_MIN_GAP_MS) return;

      syncInFlightRef.current = true;
      try {
        const res: any = await getRequest({endpoint: '/users/me'});
        const latestUser =
          res?.data?.body?.user ||
          res?.data?.body ||
          res?.data?.data?.user ||
          res?.data?.data ||
          res?.data?.user;

        if (latestUser?._id) {
          dispatch(actions.setCurrentUser(latestUser));
          lastSyncedAtRef.current = Date.now();
          localStorage.removeItem('usersMeBlockedUntil');
        }
      } catch (error: any) {
        const errType = error?.error?.type || error?.type;

        if (errType === 'TEMPORARILY_BLOCKED_REQUEST_LIMIT_EXCEEDED.') {
          localStorage.setItem(
            'usersMeBlockedUntil',
            String(Date.now() + RATE_LIMIT_COOLDOWN_MS)
          );
        }

        // keep persisted user as fallback
      } finally {
        syncInFlightRef.current = false;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const hydrateUser = async () => {
      if (typeof window === 'undefined') {
        setIsHydrated(true);
        return;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsHydrated(true);
        return;
      }

      await syncCurrentUser({force: true});
      setIsHydrated(true);
    };

    hydrateUser();
  }, [syncCurrentUser]);

  useEffect(() => {
    if (!isHydrated || !isLoggedIn) return;

    const onFocus = () => {
      syncCurrentUser();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncCurrentUser();
      }
    };

    const onOnline = () => {
      syncCurrentUser({force: true});
    };

    window.addEventListener('focus', onFocus);
    window.addEventListener('online', onOnline);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [isHydrated, isLoggedIn, syncCurrentUser]);

  useEffect(() => {
    if (!isHydrated) return;

    const role = currentUser?.systemRole;
    const url = getRedirectUrl({ role: role as string });

    const { isAdmin, isManager, isUser } = getRoleFlags({
      role: role as string,
    });

    const isAuthorizeRoutes = isAdminRoute || isManagerRoute || isUserRoute;

    if (isPublicRoute && !isAuthRoute) {
      return setMount(true);
    }

    if (!isLoggedIn && isAuthorizeRoutes) {
      setMount(true);
      const loginPath = isDealersRoute
        ? `${AUTH_ROUTES.login}?reason=login_required&from=dealer`
        : AUTH_ROUTES.login;
      return router.push(loginPath);
    }

    if (isLoggedIn && isAuthRoute) {
      return router.push(url);
    }

    if (
      (isAdmin && !isAdminRoute) ||
      (isManager && !isManagerRoute) ||
      (isUser && !isUserRoute)
    ) {
      return router.push(url);
    }

    setMount(true);
  }, [
    isLoggedIn,
    isAuthRoute,
    isAdminRoute,
    isDealersRoute,
    isManagerRoute,
    isUserRoute,
    isPublicRoute,
    isHydrated,
    router,
    currentUser,
  ]);

  if (!mount) {
    return <GlobalLoader />;
  }

  return <>{children}</>;
};

export default AuthGuard;
