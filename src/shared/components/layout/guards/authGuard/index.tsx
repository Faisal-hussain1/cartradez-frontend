'use client';

import {ReactNode, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import useRouteType from '@/shared/hooks/useRouterType';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {NodeChildrenProps} from '@/shared/interfaces/common';
import {getRedirectUrl, getRoleFlags} from '@/shared/utils/auth';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';

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

  const [mount, setMount] = useState(false);

  useEffect(() => {
    const role = currentUser?.currentActiveOrganization.role;

    const url = getRedirectUrl({role: role as string});

    const {isAdmin, isManager, isUser} = getRoleFlags({
      role: role as string,
    });

    const isAuthorizeRoutes = isAdminRoute || isManagerRoute || isUserRoute;

    // if there are public routes then do nothing
    if (isPublicRoute && !isAuthRoute) return setMount(true);

    // if not logged in and authorize routes then return to login
    if (!isLoggedIn && isAuthorizeRoutes) return router.push(AUTH_ROUTES.login);
    else if (isLoggedIn && isAuthRoute) return router.push(url);
    else if (
      (isAdmin && !isAdminRoute) ||
      (isManager && !isManagerRoute) ||
      (isUser && !isUserRoute)
    )
      return router.push(url);
    else setMount(true);
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

  if (!mount) {
    return <GlobalLoader />;
  }

  return children;
};

export default AuthGuard;
