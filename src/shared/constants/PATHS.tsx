import {UsersIcon} from '@/shared/components/icons';
import {SidebarRoute, SiteMapLink} from '@/shared/interfaces/utils';
import {ROLES} from './users';
import {extractRoutes} from '@/shared/utils/general';

// const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const path = (root: string, path: string): string => `${root}${path}`;

// const pathWithAppUrl = ({root, route}: {root: string; route: string}) =>
//   `${APP_URL}${path(root, route)}`;

export const removeFirstSlash = (path: string): string => {
  const [_, ...rest] = path.split('/');

  return rest.join('/');
};

export const ROOT_ROUTE = '/';

export const AUTH_ROOT = '/auth';

export const DASHBOARD_ROOT = '/dashboard';

export const VEHICLE_ROOT = '/vehicles';

export const AUTH_ROUTES = {
  login: path(AUTH_ROOT, '/login'),
  register: path(AUTH_ROOT, '/register'),
  reset: path(AUTH_ROOT, '/reset'),
  unverifiedLoginAttempt: path(AUTH_ROOT, '/unverified-login-attempt'),
  verify: path(AUTH_ROOT, '/verify'),
  forgotPassword: path(AUTH_ROOT, '/forgot-password'),
  registerVerifyRequest: path(AUTH_ROOT, '/link-sent/verify'),
  resetPasswordRequest: path(AUTH_ROOT, '/link-sent/reset'),
};

export const ADMIN_ROUTES = {
  temp: {
    all: path(DASHBOARD_ROOT, '/temp'),
  },
};

export const MANAGER_ROUTES = {
  login: path(AUTH_ROOT, '/login'),
};

export const USER_ROUTES = {
  vehicles: path(VEHICLE_ROOT, '/'),
  addVehicle: path(VEHICLE_ROOT, '/add'),
  vehicleDetails: (vehicleId: string) =>
    path(VEHICLE_ROOT, `/detail/${vehicleId}`),
};

export const PUBLIC_ROUTES = {
  vehicles: {
    all: path(VEHICLE_ROOT, '/all'),

    // vehicleDetails: (vehicleId: string) => path(VEHICLE_ROOT, `/${vehicleId}`),
  },
};

// extractRoutes was created specifically to recursively extract every string path from those nested route objects

// These are "spread" into separate arrays so we can easily search through them when performing tasks like:
// - Access control (checking if a user can access a given route)
// - Conditional rendering (e.g., hiding or showing sidebar items based on route match)
// - Logging, auditing, or analytics based on route visits

export const ADMIN_ROUTES_LIST = extractRoutes({routeObj: ADMIN_ROUTES});

export const MANGER_ROUTES_LIST = extractRoutes({routeObj: MANAGER_ROUTES});

export const USER_ROUTES_LIST = extractRoutes({routeObj: USER_ROUTES});

export const AUTH_ROUTES_LIST = extractRoutes({routeObj: AUTH_ROUTES});

export const SIDEBAR_ROUTES = (
  t: (key: string) => string
): {[key: string]: SidebarRoute} => ({
  sellers: {
    value: 'sellers',
    label: t('navigationRoutes.sellers'),
    path: ADMIN_ROUTES.temp.all,
    icon: UsersIcon,
    roles: [ROLES.admin.value],
  },

  // settings: {
  //   value: 'settings',
  //   label: t('navigationRoutes.settings'),
  //   path: SELLER_ROUTES.settings.all,
  //   icon: SettingIcon,
  // },
});

export const SIDEBAR_ROUTES_LIST = (t: (key: any) => any): SidebarRoute[] =>
  Object.values(SIDEBAR_ROUTES(t));

export const SITE_MAP_LINKS: {[key: string]: SiteMapLink} = {
  home: {
    url: ROOT_ROUTE,
    priority: 1,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },
  login: {
    url: AUTH_ROUTES.login,
    priority: 0.8,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },
  register: {
    url: AUTH_ROUTES.register,
    priority: 0.8,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },
};

export const LANDING_MENU_BAR_LINKS = {
  home: {
    value: 'home',
    label: 'Home',
    url: '/',
  },
  salesVehicles: {
    value: 'salesVehicles',
    label: 'Vehicles In Sales',
    url: '/under-development',
  },
  newVehicles: {
    value: 'newVehicles',
    label: 'New Vehicles',
    url: '/under-development',
  },
  tools: {
    value: 'tools',
    label: 'Tools',
    url: '/under-development',
  },
  resources: {
    value: 'resources',
    label: 'Resources',
    url: '/under-development',
  },
  services: {
    value: 'services',
    label: 'Tools & Services',
    url: '/under-development',
  },
  about: {
    value: 'about',
    label: 'About Us',
    url: '/about',
  },
  contact: {
    value: 'contact',
    label: 'Contact Us',
    url: '/contact',
  },
};
