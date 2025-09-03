import React from 'react';
import MessageWithImage from '@/shared/components/common/message';
import {useTranslation} from 'react-i18next';

function SellerNotFounded() {
  const {t} = useTranslation();

  return (
    <MessageWithImage
      imgSrc='/images/not-found.png'
      title={t('commonContent.sellerNotFound')}
    />
  );
}

export default SellerNotFounded;
