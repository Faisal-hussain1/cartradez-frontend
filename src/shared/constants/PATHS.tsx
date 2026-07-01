import {
  FacebookIcon,
  InstagramIcon,
  UsersIcon,
} from '@/shared/components/icons';
import {SidebarRoute, SiteMapLink} from '@/shared/interfaces/utils';
import {ROLES} from './users';
import {extractRoutes} from '@/shared/utils/general';
import {Trash2} from 'lucide-react';

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
  dashboard: '/dash',
  listings: '/listings',
  deletedVehicles: '/deleted-vehicles',
  dealers: '/dealers',
  managedByCartradez: '/managed-by-cartradez',
  roles: '/roles',
  users: '/users',
  vehicles: path(VEHICLE_ROOT, '/'),
  addVehicle: path(VEHICLE_ROOT, '/add'),
  vehicleDetails: (vehicleId: string) =>
    path(VEHICLE_ROOT, `/detail/${vehicleId}`),
};

export const MANAGER_ROUTES = {
  login: path(AUTH_ROOT, '/login'),
};

export const USER_ROUTES = {
  dashboard: ADMIN_ROUTES.dashboard,
  vehicles: path(VEHICLE_ROOT, '/'),
  listings: '/listings',
  selectRole: path(ROOT_ROUTE, '/selectRole'),
  addVehicle: path(VEHICLE_ROOT, '/add'),
  editListing: (vehicleId: string) => `/dashboard/listings/${vehicleId}/edit`,
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
    path: ADMIN_ROUTES.dashboard,
    icon: UsersIcon,
    roles: [ROLES.admin.value],
  },
  deletedVehicles: {
    value: 'deletedVehicles',
    label: t('navigationRoutes.deletedVehicles'),
    path: ADMIN_ROUTES.deletedVehicles,
    icon: Trash2,
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
    url: '/',
    priority: 1,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },

  vehicles: {
    url: '/vehicles/all',
    priority: 0.9,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },

  managedByCartradez: {
    url: '/vehicles/managed-by-cartradez',
    priority: 0.9,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },

  about: {
    url: '/about',
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: new Date(),
  },

  contact: {
    url: '/contact',
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: new Date(),
  },

  faq: {
    url: '/faq',
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: new Date(),
  },

  buyerSellerGuide: {
    url: '/guidelines',
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: new Date(),
  },

  privacyPolicy: {
    url: '/privacy',
    priority: 0.3,
    changeFrequency: 'yearly',
    lastModified: new Date(),
  },

  termsAndConditions: {
    url: '/terms',
    priority: 0.3,
    changeFrequency: 'yearly',
    lastModified: new Date(),
  },

  refundPolicy: {
    url: '/refund',
    priority: 0.3,
    changeFrequency: 'yearly',
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
    // {
    //   value: 'browseAllCars',
    //   label: 'Browse All Cars',
    //   url: '/under-development',
    // },
    // {
    //   value: 'featuredCars',
    //   label: 'Featured Cars',
    //   url: '/under-development',
    // },
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
    // {
    //   value: 'pricingPlans',
    //   label: 'Pricing Plans',
    //   url: '/under-development',
    // },
    {
      value: 'sellersGuide',
      label: "Seller's Guide",
      url: '/guidelines',
    },
    // {
    //   value: 'verificationProcess',
    //   label: 'Verification Process',
    //   url: '/under-development',
    // },
  ],
  socials: [
    {
      value: 'facebook',
      label: 'Facebook',
      icon: <FacebookIcon size={20} />,
      url: 'https://www.facebook.com/cartradez',
    },
    // {
    //   value: 'twitter',
    //   label: 'Twitter',
    //   icon: <TwitterIcon size={20} />,
    //   url: `${APP_URL}/under-development`,
    // },
    {
      value: 'instagram',
      label: 'Instagram',
      icon: <InstagramIcon size={20} />,
      url: `https://www.instagram.com/cartradezofficial?igsh=b2V1dml1cHgyOWN2`,
    },
  ],
};
