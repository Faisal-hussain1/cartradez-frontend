'use client';

import { JSX, useEffect, useState } from 'react';
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
    isManagerRoute,
    isUserRoute,
    isPublicRoute,
  } = useRouteType();

  const router = useLocaleRouter();
  const currentUser = useSelector(getCurrentUser);
  const isLoggedIn = Boolean(currentUser?._id);

  const [mount, setMount] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

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

      try {
        const res: any = await getRequest({endpoint: '/users/me'});
        const latestUser = res?.data?.body?.user;
        if (latestUser?._id) {
          dispatch(actions.setCurrentUser(latestUser));
        }
      } catch (error) {
        // keep persisted user as fallback
      } finally {
        setIsHydrated(true);
      }
    };

    hydrateUser();
  }, [dispatch]);

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
      return router.push(AUTH_ROUTES.login);
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
