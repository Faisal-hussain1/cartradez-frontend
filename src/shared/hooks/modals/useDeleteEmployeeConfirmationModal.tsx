import useTranslation from '@/shared/hooks/useTranslation';
import {useConfirmationModal} from './useConfirmationModal';
import {DeleteEmployeeConfirmationHookProps} from '@/shared/interfaces/employees';

export const useDeleteEmployeeConfirmationModal = ({
  onConfirm,
  onCancel,
  confirmLoading,
  toBeClosedByParent,
}: DeleteEmployeeConfirmationHookProps) => {
  const {t} = useTranslation();

  return useConfirmationModal({
    onConfirm,
    onCancel,
    confirmLoading,
    toBeClosedByParent,
    title: t('deleteEmployeeModal.title'),
    confirmLabel: t('deleteEmployeeModal.sendRequest'),
    description: t('deleteEmployeeModal.description'),
  });
};
