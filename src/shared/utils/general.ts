import {THEME} from '@/shared/constants/theme';
import {IdType} from '@/shared/types/common';
import {GetTextColorBasedOnBgParams, HexCodeParams} from '@/shared/types/utils';
import {truncateWordsProps} from '../interfaces/common';

export const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

export const getTextColorBasedOnBg = ({
  desiredTextColor = THEME.color.white,
  backgroundColor = THEME.color.primary,
  fallbackColor = THEME.color.black,
}: GetTextColorBasedOnBgParams) => {
  const isDesiredTextBrightColor = checkIsBrightColor({
    hexColor: desiredTextColor,
  });

  const isBackgroundBrightColor = checkIsBrightColor({
    hexColor: backgroundColor,
  });

  let color = desiredTextColor;

  if (isDesiredTextBrightColor && isBackgroundBrightColor)
    color = fallbackColor;

  return color;
};

export const checkIsBrightColor = ({hexColor}: HexCodeParams) => {
  // Remove # if present
  hexColor = hexColor.replace('#', '');

  // Parse r, g, b values
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black for light backgrounds, white for dark backgrounds
  return brightness > 150;
};

export const getFormattedId = ({id}: IdType) => {
  // Skip the first 3 characters like pi_, cu_, tr_
  const cleanedId = id.replace(/^(pi_|cus_|txn_|sub_|ch_|inv_)/, '');

  return cleanedId;
};

/*
Example usage of extractRoutes function:

const ROUTES = {
  group1: {
    page1: '/home',
    page2: '/about',
  },
  group2: {
    subGroup: {
      page3: '/contact',
    },
  },
  page4: '/login',
};

const flat = extractRoutes({ routeObj: ROUTES });
Output: ['/home', '/about', '/contact', '/login']
*/

export function extractRoutes({
  routeObj,
}: {
  routeObj: Record<string, any>;
}): string[] {
  // * Converts deeply nested route structures (e.g., SELLER_ROUTES, ADMIN_ROUTES) into a flat list of string paths.
  const result: string[] = [];

  // Recursively traverse the object to extract all string paths
  function recurse({value}: {value: any}) {
    if (typeof value === 'string') {
      result.push(value); // If it's a string, it's a route path — add it to result
    } else if (typeof value === 'object' && value !== null) {
      for (const key in value) {
        recurse({value: value[key]}); // Recurse into nested objects
      }
    }
  }

  recurse({value: routeObj}); // Begin recursion from the root

  return result; // Return the list of all extracted routes
}

export function truncateWords({text, limit = 30}: truncateWordsProps) {
  const words = text.trim().split(/\s+/);

  if (words.length <= limit) {
    return text;
  }

  return words.slice(0, limit).join(' ') + '...';
}
