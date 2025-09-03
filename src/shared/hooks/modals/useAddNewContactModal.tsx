import {useState} from 'react';
import {useModal} from './useModal';
import {FormModal} from '@/shared/components/common/modals';
import useTranslation from '../useTranslation';
import {NewContactPayload} from '@/shared/interfaces/checkbook';
import AddNewContactForm from '@/shared/components/pages/seller/checkbook/contacts/AddNewContactForm';

export const useAddNewContactModal = () => {
  const {t} = useTranslation();

  const [defaultValues, setDefaultValues] = useState<
    Partial<NewContactPayload>
  >({});

  const {
    closeModal,
    isModalOpen,
    openModal: rawOpenModal,
    setIsModalOpen,
    toggleModal,
  } = useModal();

  const openModalWithValues = (values: Partial<NewContactPayload> = {}) => {
    setDefaultValues(values);
    rawOpenModal();
  };

  const openModal = () => {
    setDefaultValues({});
    rawOpenModal();
  };

  const NewContactModalComponent = isModalOpen && (
    <FormModal
      content={[
        <AddNewContactForm
          key='add-new-contact-form'
          closeFormModal={closeModal}
          defaultValues={defaultValues}
        />,
      ]}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title={t('checkbook.contacts.newContact')}
    />
  );

  return {
    openModal,
    openModalWithValues,
    closeModal,
    toggleModal,
    isModalOpen,
    setIsModalOpen,
    NewContactModalComponent,
  };
};
