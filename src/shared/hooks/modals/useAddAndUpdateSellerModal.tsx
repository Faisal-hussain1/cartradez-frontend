import {FormModal} from '@/shared/components/common/modals';
import useTranslation from '../useTranslation';
import {useModal} from './useModal';
import AddSeller from '@/shared/components/pages/dashboard/sellers/AddSeller';

export const useAddAndUpdateSellerModal = () => {
  const {t} = useTranslation();

  const {closeModal, isModalOpen, openModal, setIsModalOpen, toggleModal} =
    useModal();

  const AddAndUpdateModalComponent = isModalOpen && (
    <FormModal
      content={[
        <AddSeller key='add-seller-form' closeFormModal={closeModal} />,
      ]}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title={t('dashboard.addSeller')}
    />
  );

  return {
    openModal,
    closeModal,
    toggleModal,
    isModalOpen,
    setIsModalOpen,
    AddAndUpdateModalComponent,
  };
};
