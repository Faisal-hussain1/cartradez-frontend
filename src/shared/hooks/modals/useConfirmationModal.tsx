import {ConfirmationModal} from '@/shared/components/common/modals';
import {UseConfirmationModalProps} from '@/shared/interfaces/dialogs';
import {useModal} from './useModal';

export const useConfirmationModal = ({
  onConfirm = () => {},
  onCancel = () => {},
  confirmLoading = false,
  toBeClosedByParent,
  title,
  confirmLabel,
  description,
}: UseConfirmationModalProps) => {
  const {openModal, closeModal, toggleModal, isModalOpen, setIsModalOpen} =
    useModal();

  const ConfirmationModalComponent = isModalOpen && (
    <ConfirmationModal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title={title}
      confirmLabel={confirmLabel}
      confirmLoading={confirmLoading}
      onCancel={() => {
        onCancel();
        closeModal();
      }}
      onConfirm={() => {
        onConfirm();
        if (!toBeClosedByParent) closeModal();
      }}
      content={[
        <p
          key='modal-description'
          className='text-sm text-secondary py-3 text-center'
        >
          {description}
        </p>,
      ]}
    />
  );

  return {
    openModal,
    closeModal,
    toggleModal,
    isModalOpen,
    setIsModalOpen,
    ConfirmationModalComponent,
  };
};
