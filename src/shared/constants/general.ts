import {ADMIN_ROUTES} from '@/shared/constants/PATHS';
import {FILTERS_CONFIG} from './reactQueryConstants';
import translationUtilsValues from '@/shared/utils/translationsUtils';

export const BRANDING = async () => {
  const {t} = await translationUtilsValues();

  return {
    websiteName: t('mainPageTitle.appName'),
    websiteDescription: t('mainPageTitle.description'),
    logoPath: '/images/logo.svg',
    faviconPath: '/images/favicon.png',
  };
};

export const LIST_TYPES = {
  sellers: {
    value: 'sellers',
    search: {
      keys: ['name', 'email'],
    },
    sort: {
      options: {
        name: {
          label: 'Name',
          value: 'firstName',
        },
        email: {
          label: 'Email',
          value: 'email',
        },
      },
      directions: {
        asc: 'asc',
        desc: 'desc',
      },
    },
    page: {
      pageNo: FILTERS_CONFIG.pageNo,
      pageLimit: FILTERS_CONFIG.pageLimit,
    },
    path: ADMIN_ROUTES.temp.all,
  },
};

export const PRICE_PER_KEY = 1;

export const LOGO_VARIATIONS = {
  white: {
    value: 'white',
  },
  black: {
    value: 'black',
  },
};

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const PAGINATION_TYPES = {
  pageBased: {
    value: 'pageBased',
  },
  cursorBased: {
    value: 'cursorBased',
  },
  idBased: {
    value: 'idBased',
  },
};

export const CST_TIMEZONE = 'America/Chicago';

export const EMAIL_TEMPLATES_FIELD_NAMES = {
  subject: 'subject',
  description: 'description',
};

export const EMAIL_TEMPLATES_TYPES = {
  seller: {
    value: 'seller',
  },
  business: {
    value: 'business',
  },
};

export const NEW_ITEM_SLUG = 'add';

export const ADMIN_EMAIL = 'support@terrixpay.io';

export const ADMIN_PHONE_NUMBER = '+1234567890';

export const ADMIN_CONTACT_PARAMS = {
  adminEmail: ADMIN_EMAIL,
  adminPhoneNumber: ADMIN_PHONE_NUMBER,
};
