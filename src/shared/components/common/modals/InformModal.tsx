import {GeneralModal} from './GeneralModal';
import useTranslation from '@/shared/hooks/useTranslation';
import {InformModalProps} from '@/shared/interfaces/dialogs';

export const InformModal = ({
  title,
  setIsOpen,
  onConfirm,
  isOpen,
  label,
  content,
  width,
}: InformModalProps) => {
  const {t} = useTranslation();

  return (
    <GeneralModal
      title={title}
      content={content}
      buttons={[
        {
          title: label || t('modal.confirmLabel'),
          handleClick: onConfirm,
          variant: 'default',
        },
      ]}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width={width}
    />
  );
};
