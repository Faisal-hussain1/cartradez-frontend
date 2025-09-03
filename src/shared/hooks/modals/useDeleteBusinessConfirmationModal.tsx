import useTranslation from '@/shared/hooks/useTranslation';
import {useConfirmationModal} from './useConfirmationModal';
import {DeleteBusinessConfirmationHookProps} from '@/shared/interfaces/business';

export const useDeleteBusinessConfirmationModal = ({
  onConfirm,
  onCancel,
  confirmLoading,
  toBeClosedByParent,
}: DeleteBusinessConfirmationHookProps) => {
  const {t} = useTranslation();

  return useConfirmationModal({
    onConfirm,
    onCancel,
    confirmLoading,
    toBeClosedByParent,
    title: t('deleteBusinessModal.title'),
    confirmLabel: t('deleteBusinessModal.sendRequest'),
    description: t('deleteBusinessModal.description'),
  });
};
