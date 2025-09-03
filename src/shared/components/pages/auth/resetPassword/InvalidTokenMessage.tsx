import MessageWithImage from '@/shared/components/common/message';
import useTranslation from '@/shared/hooks/useTranslation';

const InvalidTokenMessage = () => {
  const {t} = useTranslation();

  return (
    <MessageWithImage
      imgSrc='/images/token-expire.png'
      title={t('auth.resetExpire')}
      description={t('auth.resetExpireMessage')}
    />
  );
};

export default InvalidTokenMessage;
