import {NextRequest, NextResponse} from 'next/server';
import {i18nConfig} from '@/i18nConfig';
import {getRouteType} from './shared/utils/routeUtils';
import {AUTH_ROUTES} from './shared/constants/PATHS';

const AUTH_COOKIE_PREFIX = 'x-auth-token';

const getAuthCookieNames = (request: NextRequest) =>
  request.cookies
    .getAll()
    .filter(({name}) => name === AUTH_COOKIE_PREFIX || name.startsWith(`${AUTH_COOKIE_PREFIX}-`))
    .map(({name}) => name);

const clearAuthCookies = (response: NextResponse, cookieNames: string[]) => {
  cookieNames.forEach((name) => {
    response.cookies.set(name, '', {
      path: '/',
      maxAge: 0,
    });
  });

  return response;
};

const isJwtExpiredOrInvalid = (token?: string) => {
  if (!token) return false;

  try {
    const [, payload] = token.split('.');

    if (!payload) return true;

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(normalizedPayload));

    return typeof decodedPayload.exp === 'number'
      ? decodedPayload.exp <= Date.now() / 1000
      : false;
  } catch {
    return true;
  }
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const {locales, defaultLocale} = i18nConfig;
  const newURL = new URL(request.url);
  let {pathname: newPath} = request.nextUrl;

  const authCookieNames = getAuthCookieNames(request);
  const cookieToken = request.cookies.get(AUTH_COOKIE_PREFIX)?.value;

  const prefixedAuthCookie = request.cookies
    .getAll()
    .find(({name}) => name.startsWith('x-auth-token-'))?.value;
  const authToken = cookieToken || prefixedAuthCookie;
  const hasInvalidAuthToken = isJwtExpiredOrInvalid(authToken);

  const {unprotectedRoutes} = getRouteType({pathname: newPath});

  // Redirect to login only if the user is trying to access a private page without a token
  if (!unprotectedRoutes && (!authToken || hasInvalidAuthToken)) {
    const newRequestUrl = new URL(request.nextUrl.origin);
    newRequestUrl.pathname = AUTH_ROUTES.login;
    newRequestUrl.searchParams.set('reason', 'login_required');
    if (newPath.startsWith('/dealers')) {
      newRequestUrl.searchParams.set('from', 'dealer');
    }
    const nextResponse = NextResponse.redirect(newRequestUrl);

    return clearAuthCookies(nextResponse, authCookieNames);
  }
  const cookieLocale = request.cookies.get('NEXTJS_LOCALE')?.value;

  // Ensure locale handling for all requests
  const selectedLocale =
    cookieLocale && locales.includes(cookieLocale) ? cookieLocale : defaultLocale;

  // Check if the URL already has a locale prefix
  // first condition to check all pages other than home which will be for example /en/dashboard
  // second condition to check home page that will not have the last / so will be for example /en
  const localePrefixFoundInURL = locales.find(
    (locale) => newPath.startsWith(`/${locale}/`) || newPath === `/${locale}`
  );

  if (localePrefixFoundInURL) {
    // Remove the locale prefix from the path, set the cookie, and redirect to the new path without the locale prefix
    // After the redirection, the middleware will be called again and the new path will be rewritten
    // with the locale prefix in the else branch of this flow
    // Example: /es/about -> sets `es` in cookies and redirects to -> /about

    newPath = newPath.replace(`/${localePrefixFoundInURL}`, '');
    newURL.pathname = newPath;

    const nextResponse = NextResponse.redirect(newURL);
    nextResponse.cookies.set('NEXTJS_LOCALE', localePrefixFoundInURL, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return hasInvalidAuthToken
      ? clearAuthCookies(nextResponse, authCookieNames)
      : nextResponse;
  }

  // selected locale is known either from the cookie (set before or just set in the if branch of this flow before redirecting) or the default locale
  // /about -> rewrite the url to add local without changing url from user perspective -> /es/about that still looks like /about
  newPath = `/${selectedLocale}${newPath}`;
  newURL.pathname = newPath;

  const nextResponse = NextResponse.rewrite(newURL);

  return hasInvalidAuthToken
    ? clearAuthCookies(nextResponse, authCookieNames)
    : nextResponse;
}

export const config = {
  matcher: ['/:locale((?!api|_next|static|.*\\..*).*)'],
};
