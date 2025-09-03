import {CopyLinkParams} from '@/shared/types/utils';
import {asyncTryCatch} from './tryCatchUtils';

import {ONBOARDING_LINK_ROUTES, PAYMENT_ROUTES} from '@/shared/constants/PATHS';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const copyToClipboard = async ({link}: CopyLinkParams) => {
  const {success, error} = await asyncTryCatch(
    async () => await navigator.clipboard.writeText(link)
  );

  return {success, error};
};

export const generateSellerOnboardingLink = ({
  sellerId,
}: {
  sellerId: string;
}) => {
  return `${APP_URL}${ONBOARDING_LINK_ROUTES.refreshOnboardingLink({sellerId})}`;
};

export const generateBusinessPaymentLink = ({
  username,
  businessSlug,
}: {
  username: string;
  businessSlug: string;
}) => {
  return `${APP_URL}${PAYMENT_ROUTES.payment.createPayment({
    username,
    businessSlug,
  })}`;
};
