import {AUTH_ROOT, DASHBOARD_ROOT} from '@/shared/constants/PATHS';

export const getRouteType = ({pathname}: {pathname: string}) => {
  const isDashboardRoute = pathname.startsWith(DASHBOARD_ROOT);
  const isAuthRoute = pathname.startsWith(AUTH_ROOT);
  const isPublicRoute = !isDashboardRoute && !isAuthRoute;
  const unprotectedRoutes = isPublicRoute || isAuthRoute;

  return {isDashboardRoute, isAuthRoute, isPublicRoute, unprotectedRoutes};
};
