import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  UsersIcon,
} from '@/shared/components/icons';
import {SidebarRoute, SiteMapLink} from '@/shared/interfaces/utils';
import {ROLES} from './users';
import {extractRoutes} from '@/shared/utils/general';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

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
  vehicles: path(VEHICLE_ROOT, '/'),
  addVehicle: path(VEHICLE_ROOT, '/add'),
  vehicleDetails: (vehicleId: string) =>
    path(VEHICLE_ROOT, `/detail/${vehicleId}`),
};

export const MANAGER_ROUTES = {
  login: path(AUTH_ROOT, '/login'),
};

export const USER_ROUTES = {
  vehicles: path(VEHICLE_ROOT, '/'),
  selectRole: path(ROOT_ROUTE, '/selectRole'),
  addVehicle: path(VEHICLE_ROOT, '/add'),
  vehicleDetails: (vehicleId: string) =>
    path(VEHICLE_ROOT, `/detail/${vehicleId}`),
};

export const PUBLIC_ROUTES = {
  vehicles: {
    all: path(VEHICLE_ROOT, '/all'),
    managedByCartradez: path(VEHICLE_ROOT, '/managed-by-cartradez'),

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
  // newVehicles: {
  //   value: 'newVehicles',
  //   label: 'New Vehicles',
  //   url: '/under-development',
  // },
  managedByCartradez: {
    value: 'managedByCartradez',
    label: 'Managed By Cartradez',
    url: PUBLIC_ROUTES.vehicles.managedByCartradez,
  },
  buyerAndSellerGuide: {
    value: 'buyerAndSellerGuide',
    label: 'Buyer & Seller Guide',
    url: '/guidelines',
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

export const LANDING_FOOTER_LINKS = {
  cartradez: [
    {
      value: 'aboutUs',
      label: 'About Us',
      url: '/about',
    },
    {
      value: 'faqs',
      label: 'FAQs',
      url: '/faq',
    },
    {
      value: 'buyAndSellSafety',
      label: 'Buy & Sell Safety',
      url: '/guidelines',
    },
    {
      value: 'contactUs',
      label: 'Contact Us',
      url: '/contact',
    },
  ],
  buyACar: [
    {
      value: 'browseAllCars',
      label: 'Browse All Cars',
      url: '/under-development',
    },
    {
      value: 'featuredCars',
      label: 'Featured Cars',
      url: '/under-development',
    },
    {
      value: 'managedByCartradez',
      label: 'Managed by Cartradez',
      url: PUBLIC_ROUTES.vehicles.managedByCartradez,
    },
    {
      value: 'buyersGuide',
      label: "Buyer's Guide",
      url: '/guidelines',
    },
  ],
  SellACar: [
    {
      value: 'postAnAd',
      label: 'Post an Ad',
      url: '/vehicles/add',
    },
    {
      value: 'pricingPlans',
      label: 'Pricing Plans',
      url: '/under-development',
    },
    {
      value: 'sellersGuide',
      label: "Seller's Guide",
      url: '/guidelines',
    },
    {
      value: 'verificationProcess',
      label: 'Verification Process',
      url: '/under-development',
    },
  ],
  socials: [
    {
      value: 'facebook',
      label: 'Facebook',
      icon: <FacebookIcon size={20} />,
      url: 'https://www.facebook.com/cartradez',
    },
    {
      value: 'twitter',
      label: 'Twitter',
      icon: <TwitterIcon size={20} />,
      url: `${APP_URL}/under-development`,
    },
    {
      value: 'instagram',
      label: 'Instagram',
      icon: <InstagramIcon size={20} />,
      url: `${APP_URL}/under-development`,
    },
    {
      value: 'linkedin',
      label: 'LinkedIn',
      icon: <LinkedinIcon size={20} />,
      url: `${APP_URL}/under-development`,
    },
  ],
};
