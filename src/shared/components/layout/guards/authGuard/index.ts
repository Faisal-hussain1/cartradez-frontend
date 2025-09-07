'use client';

import {ReactNode, useEffect} from 'react';
import {useSelector} from 'react-redux';
import useRouteType from '@/shared/hooks/useRouterType';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {NodeChildrenProps} from '@/shared/interfaces/common';
import {getRedirectUrl, getRoleFlags} from '@/shared/utils/auth';

const AuthGuard = ({children}: NodeChildrenProps): ReactNode => {
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

  useEffect(() => {
    const role = currentUser?.currentActiveOrganization.role;

    const url = getRedirectUrl({role: role as string});

    const {isAdmin, isManager, isUser} = getRoleFlags({
      role: role as string,
    });

    const isAuthorizeRoutes = isAdminRoute || isManagerRoute || isUserRoute;

    // if there are public routes then do nothing
    if (isPublicRoute && !isAuthRoute) {
      console.log('1');

      return;
    }

    // if not logged in and authorize routes then return to login
    if (!isLoggedIn && isAuthorizeRoutes) {
      console.log('2');

      return router.push(AUTH_ROUTES.login);
    }

    // if logged in and auth routes then return to authorized pages
    if (isLoggedIn && isAuthRoute) {
      console.log('3');

      return router.push(url);
    }

    // if different roles try to access other roles pages then return to its own pages
    if (
      (isAdmin && !isAdminRoute) ||
      (isManager && !isManagerRoute) ||
      (isUser && !isUserRoute)
    ) {
      console.log('4');

      return router.push(url);
    }
  }, [
    isLoggedIn,
    isAuthRoute,
    isAdminRoute,
    isManagerRoute,
    isUserRoute,
    isPublicRoute,
    router,
    currentUser,
  ]);

  return children;
};

export default AuthGuard;
