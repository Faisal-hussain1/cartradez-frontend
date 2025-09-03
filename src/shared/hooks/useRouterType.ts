import {usePathname} from 'next/navigation';
import {
  ADMIN_ROUTES_LIST,
  MANGER_ROUTES_LIST,
  USER_ROUTES_LIST,
  AUTH_ROUTES_LIST,
} from '@/shared/constants/PATHS';

const useRouteType = () => {
  const pathName = usePathname();

  const isAdminRoute = ADMIN_ROUTES_LIST.includes(pathName);

  const isAuthRoute = AUTH_ROUTES_LIST.includes(pathName);

  const isManagerRoute = MANGER_ROUTES_LIST.includes(pathName);

  const isUserRoute = USER_ROUTES_LIST.includes(pathName);

  const isPublicRoute = !isAdminRoute && !isManagerRoute && !isUserRoute;

  return {
    isAdminRoute,
    isAuthRoute,
    isPublicRoute,
    isManagerRoute,
    isUserRoute,
  };
};

export default useRouteType;
