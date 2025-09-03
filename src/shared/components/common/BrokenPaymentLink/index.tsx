import React from 'react';
import MessageWithImage from '@/shared/components/common/message';
import {useTranslation} from 'react-i18next';

function BrokenPaymentLink() {
  const {t} = useTranslation();

  return (
    <MessageWithImage
      imgSrc='/images/token-expire.png'
      title={t('commonContent.brokenPaymentLink')}
      description={t('commonContent.brokenPaymentLinkDescription')}
    />
  );
}

export default BrokenPaymentLink;
