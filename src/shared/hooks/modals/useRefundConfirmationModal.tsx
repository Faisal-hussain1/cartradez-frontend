import useTranslation from '@/shared/hooks/useTranslation';
import {useConfirmationModal} from './useConfirmationModal';
import {RefundConfirmationHookProps} from '@/shared/interfaces/hooks';

export const useRefundConfirmationModal = ({
  onConfirm,
  onCancel,
  confirmLoading,
  toBeClosedByParent,
}: RefundConfirmationHookProps) => {
  const {t} = useTranslation();

  return useConfirmationModal({
    onConfirm,
    onCancel,
    confirmLoading,
    toBeClosedByParent,
    title: t('transactionsModal.title'),
    confirmLabel: t('transactionsModal.sendRequest'),
    description: t('transactionsModal.description'),
  });
};
