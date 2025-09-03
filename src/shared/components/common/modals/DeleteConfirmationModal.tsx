import useTranslation from '@/shared/hooks/useTranslation';
import {ConfirmationModal} from './ConfirmationModal';
import {DeleteConfirmationModalProps} from '@/shared/interfaces/dialogs';

export const DeleteConfirmationModal = ({
  title,
  isOpen,
  setIsOpen,
  dismissLabel,
  deleteLabel,
  onCancel,
  onDelete,
  deleteLoading,
}: DeleteConfirmationModalProps) => {
  const {t} = useTranslation();

  return (
    <ConfirmationModal
      title={title}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttons={[
        {
          title: dismissLabel || t('modalButtons.cancelLabel'),
          handleClick: onCancel,
          variant: 'default',
          loading: false,
          styles: 'w-full',
        },
        {
          title: deleteLabel || t('modalButtons.deleteLabel'),
          handleClick: onDelete,
          variant: 'destructive',
          loading: deleteLoading,
          styles: 'w-full',
        },
      ]}
    />
  );
};
