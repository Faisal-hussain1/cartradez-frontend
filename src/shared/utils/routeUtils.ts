import {AUTH_ROOT, DASHBOARD_ROOT} from '@/shared/constants/PATHS';

export const getRouteType = ({pathname}: {pathname: string}) => {
  const isDashboardRoute = pathname.startsWith(DASHBOARD_ROOT);
  const isDealersRoute = pathname.startsWith('/dealers');
  const isAuthRoute = pathname.startsWith(AUTH_ROOT);
  const isPublicRoute = !isDashboardRoute && !isDealersRoute && !isAuthRoute;
  const unprotectedRoutes = isPublicRoute || isAuthRoute;

  return {
    isDashboardRoute,
    isDealersRoute,
    isAuthRoute,
    isPublicRoute,
    unprotectedRoutes,
  };
};
