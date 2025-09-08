'use client';
import {usePathname} from 'next/navigation';
import {useSelector} from 'react-redux';
import GeneralBackdrop from './GeneralBackdrop';
import useTranslation from '@/shared/hooks/useTranslation';
import {ADMIN_CONTACT_PARAMS} from '@/shared/constants/general';
import {useGetLoginUserData} from '@/shared/hooks/useGetLoginUserData';
import {getCheckbookBackDropStatus} from '@/shared/redux/slices/checkbookBackdrop';
import {useCheckbookPaymentAccess} from '@/shared/hooks/useCheckbookPaymentAccess';

export default function CheckbookBackdrop() {
  const pathname = usePathname();
  const {t} = useTranslation();
  const backDropOpened = useSelector(getCheckbookBackDropStatus);
  const {closeCheckBackdrop} = useCheckbookPaymentAccess();

  const {isLoading, isFirstTimeDisabled, isCheckbookEnabled} =
    useGetLoginUserData();

  if (isLoading) return null;

  if (!isFirstTimeDisabled && !backDropOpened) return null;

  const sellerContentDescription = isCheckbookEnabled
    ? t('features.checkbook.noWallet.descriptionForSellers')
    : t(
        'features.checkbook.disabled.descriptionForSeller',
        ADMIN_CONTACT_PARAMS
      );

  const contentDescriptionForOthers = isCheckbookEnabled
    ? t('features.checkbook.noWallet.descriptionForOthers')
    : t('features.checkbook.disabled.descriptionForOthers');

  const backdropButtons = backDropOpened
    ? [
        {
          title: t('modal.confirmLabel'),
          handleClick: closeCheckBackdrop,
          variant: 'default' as const,
          styles: 'w-24',
        },
      ]
    : [];

  return (
    <GeneralBackdrop
      title={
        isCheckbookEnabled
          ? t('features.checkbook.noWallet.title')
          : t('features.checkbook.disabled.title')
      }
      content={content}
      buttons={backdropButtons}
    />
  );
}
