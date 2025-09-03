import React from 'react';
import MessageWithImage from '@/shared/components/common/message';
import {useTranslation} from 'react-i18next';

function SellerAlreadyVerified() {
  const {t} = useTranslation();

  return (
    <MessageWithImage
      imgSrc='/images/already-verified.png'
      title={t('commonContent.alreadyVerified')}
      description={t('commonContent.sellerAlreadyVerifiedDescription')}
    />
  );
}

export default SellerAlreadyVerified;
