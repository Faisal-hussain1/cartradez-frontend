import {GeneralModal} from './GeneralModal';
import useTranslation from '@/shared/hooks/useTranslation';
import {ConfirmationModalProps} from '@/shared/interfaces/dialogs';

export const ConfirmationModal = ({
  title,
  isOpen,
  setIsOpen,
  dismissLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  confirmLoading,
  buttons,
  content,
}: ConfirmationModalProps) => {
  const {t} = useTranslation();

  return (
    <GeneralModal
      title={title}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={content}
      titleAlignment='text-center'
      buttons={
        buttons || [
          {
            title: dismissLabel || t('modalButtons.cancelLabel'),
            handleClick: onCancel,
            variant: 'outline',
            loading: false,
            styles: 'w-full hover:bg-white hover:text-primary',
          },
          {
            title: confirmLabel || t('modalButtons.confirmLabel'),
            handleClick: onConfirm,
            variant: 'default',
            loading: confirmLoading,
            styles: 'w-full',
          },
        ]
      }
    />
  );
};
