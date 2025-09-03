import {useState} from 'react';
import {useModal} from './useModal';
import {FormModal} from '@/shared/components/common/modals';
import useTranslation from '../useTranslation';
import AddNewPaymentForm from '@/shared/components/pages/seller/checkbook/payments/AddNewPaymentForm';
import {NewPaymentPayload} from '@/shared/interfaces/checkbook';

export const useAddNewPaymentModal = () => {
  const {t} = useTranslation();

  const [defaultValues, setDefaultValues] = useState<
    Partial<NewPaymentPayload>
  >({});

  const {
    closeModal,
    isModalOpen,
    openModal: rawOpenModal,
    setIsModalOpen,
    toggleModal,
  } = useModal();

  const openModalWithValues = (values: Partial<NewPaymentPayload> = {}) => {
    setDefaultValues(values);
    rawOpenModal();
  };

  const openModal = () => {
    setDefaultValues({});
    rawOpenModal();
  };

  const NewPaymentModalComponent = isModalOpen && (
    <FormModal
      content={[
        <AddNewPaymentForm
          key='add-new-payment-form'
          closeFormModal={closeModal}
          defaultValues={defaultValues}
        />,
      ]}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title={t('checkBookPayments.newPayment')}
    />
  );

  return {
    openModal,
    openModalWithValues,
    closeModal,
    toggleModal,
    isModalOpen,
    setIsModalOpen,
    NewPaymentModalComponent,
  };
};
